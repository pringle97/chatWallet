const socket = io();
const box = document.querySelector('.chatbox')
const chat = document.querySelector('.chat-form')
const Input = document.querySelector('.chat-input')
const roomName = document.getElementById('roomName')

// get username and room from URL
const {username, room} = Qs.parse(location.search, {
  ignoreQueryPrefix: true
})
let userRoom = {
  username,
  room
}
//Join chatroom
socket.emit('joinRoom', { username, room})

// let user = localStorage.getItem('username')
// console.log(user)


chat.addEventListener('submit', event => {
  event.preventDefault()

  //message text
  let usermsg = { 
    message: Input.value,
    username,
    room
  }

  socket.emit('chatMessage', (usermsg))
  console.log({username,room})
  
  //clear input

  event.target.elements.usermsg.value = '';
  event.target.elements.usermsg.focus()
})

socket.on('message', message => {
  console.log(message)
  outputMessage(message);
  //scroll down
  box.scrollTop = box.scrollHeight
})


//output message to dom

function outputMessage(message) {
  const div = document.createElement('div')
  div.classList.add('message');
  div.innerHTML =`<div style="background-color:darkblue; color:whitesmoke; border: 2px solid black;"><p class="meta" >${message.username} @ ${message.time}</p>
      <p class="text">${message.text}</p></div><br>`;
      document.querySelector('.chatbox').appendChild(div)
}

