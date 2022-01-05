require('dotenv').config() 

const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io')

const app = express();
const server = http.createServer(app)
const io = socketio(server)

const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')
// defining passport path
const passport = require('passport')
// defining the required models for functionality
const { User, Post } = require('./models')


//STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
//express uses passport and initializes / calls into session
app.use(passport.initialize())
app.use(passport.session())
app.use(require('express-session'))

// user authenticator
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET }
, async function ({ id }, cb) {
  try {
    const user = await User.findOne({ where: { id }, include: [Post] })
      cb (null, user) 
    } catch(err) {
        cb(err,null)
      }
  }))

app.use(require('./routes'))
//run on login or connect
io.on('connection', socket => {
  console.log('new connection')
})

async function init() {
  await require('./db').sync() 
  app.listen(3000)
}

init();

const PORT = 3000 || process.env.PORT
server.listen(PORT, () => console.log(`Server running on ${PORT}`))