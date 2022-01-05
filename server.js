require('dotenv').config()

const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io')
const session = require('express-session')
const app = express();
const server = http.createServer(app)
const formatMessage = require('./utils/messages')


sessionStore = new session.MemoryStore();
var io = socketio(server)
app.set('socketio', io)
let passportSocketIo = require('passport.socketio')

// io.use(passportSocketIo.authorize({
//   cookieParser: require('cookieParser'),
//   key: 'express.sid',
//   secret: process.env.SECRET,
//   store: sessionStore
// }))



const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')
// defining passport path
const passport = require('passport')
// defining the required models for functionality
const { User, Post } = require('./models')

app.use(session({
  secret: process.env.SECRET, maxAge: 60 * 60 * 1000, resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 60 * 30 * 1000 }
}));


//STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
//express uses passport and initializes / calls into session
app.use(passport.initialize())
app.use(passport.session())



// user authenticator
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
}
  , async function ({ id }, cb) {
    try {
      const user = await User.findOne({ where: { id }, include: [Post] })
      cb(null, user)
      socket.emit('username', user.User.username)
    } catch (err) {
      cb(err, null)
    }
  }))

app.use(require('./routes'))
// socket user data maps socket id with usernames in memory instead of using database
const socketUserData = {}
// username to an array of rooms
const userRoomsData = {}

const botName = 'Chat Bot'
//run on login or connect
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const currentUser = { username, room }
    socketUserData[socket.id] = currentUser.username
    // if (userRoomsData[username] == null) {
    //   userRoomsData[username] = {}
    // }
    // userRoomsData[username][room] = true
    socket.join(currentUser.room)


    //welcome current user
    console.log(`${currentUser.username} new connection ${socket.id}, ${Object.keys(userRoomsData[username])}`)
    socket.emit('message', formatMessage(botName, 'Welcome to Chat Wallet!'))

    // broadcast when user Joins chat
    socket.broadcast.to(currentUser.room).emit('message', formatMessage(botName, `${currentUser.username} Has joined the Chat`))


  })
  socket.on("disconnecting", (reason) => {
    const username = socketUserData[socket.id]
    console.log(`disconnecting ${username}`)
    socketUserData[socket.id] = null
    for (const room of socket.rooms) {
      console.log(`room is ${room}`)
      if (room !== socket.id) {
        socket.to(room).emit('message', formatMessage(botName, `${username} has left the chat`));
      }
    }
  });


  //listen for chat message
  socket.on('chatMessage', (usermsg) => {
    // const currentUser = {username, room}
    // console.log(currentUser.username, currentUser.room)
    console.log(usermsg)
    // console.log(currentUser)
    io.to(usermsg.room).emit('message', formatMessage(`${usermsg.username}`, usermsg.message))
  })


  // //user disconnects
  // socket.on('disconnect', socket => {
  //   console.log(socket.id)
  //   console.log('hello')
  //   io.emit('message', formatMessage(botName, `User Has left the chat`))
  // })
})



const PORT = 3000 || process.env.PORT
server.listen(PORT, () => console.log(`Server running on ${PORT}`))