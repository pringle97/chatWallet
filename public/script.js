const socket = io();
const box = document.querySelector('.chatbox')
const chat = document.querySelector('.chat-form')
const Input = document.querySelector('.chat-input')


// get username and room from URL
const {username, room} = Qs.parse(location.search, {
  ignoreQueryPrefix: true
})


//Join chatroom
socket.emit('joinRoom', { username, room})

// let user = localStorage.getItem('username')
// console.log(user)


chat.addEventListener('submit', event => {
  event.preventDefault()

  //message text
  const usermsg = Input.value
  socket.emit('chatMessage', (usermsg, {username,room}))
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
  div.innerHTML =`<p class="meta">${message.username} @ ${message.time}</p>
      <p class="text">${message.text}</p>`;
      document.querySelector('.chatbox').appendChild(div)
}