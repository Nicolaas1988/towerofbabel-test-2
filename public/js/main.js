const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");
const playerDOM = document.querySelector(".player-dom");
const reapLettersBtn = document.getElementById("reap-letters");
const nextBtn = document.getElementById("next-player");
let oldWord;

let playerAmount = 0;

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// const socket = io();
const socket = io();

// Join chatroom
socket.emit("joinRoom", { username, room });

// Get room and users
socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
  socket.emit("isPlayerTurnReq");
});

// USE THIS FOR DISCTIONARY API

// async function loadNames() {
//   const response = await fetch(
//     "https://api.dictionaryapi.dev/api/v2/entries/en/run"
//   );
//   const data = await response.json();

//   for (j = 0; j <= data.length - 1; j++) {
//     let words = data[j].meanings;

//     for (i = 0; i <= words.length - 1; i++) {
//       console.log(words[i].partOfSpeech);
//       console.log(
//         words[i].definitions.forEach((def) =>
//           console.log(
//             `definition: ${def.definition}` + `\nexample: ${def.example} `
//           )
//         )
//       );
//     }

//     console.log(data);
//   }
// }
// loadNames();

// Message from server
socket.on("message", (message) => {
  console.log(message);
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // Emit message to server
  socket.emit("chatMessage", msg);

  // Clear input
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  const p = document.createElement("p");
  p.classList.add("meta");
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement("p");
  para.classList.add("text");
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector(".chat-messages").appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = "";
  playerDOM.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.innerText = user.username;
    userList.appendChild(li);

    const div = document.createElement("div");
    div.innerHTML = user.section;
    playerDOM.appendChild(div);
  });
}

///cut from here

socket.on("deletedPlayerTurn", (msg) => {
  console.log(msg);
});

//Next Player button
nextBtn.addEventListener("click", function () {
  socket.emit("nextPlayerReq");
});

//Prompt the user before leave chat room
document.getElementById("leave-btn").addEventListener("click", () => {
  const leaveRoom = confirm("Are you sure you want to leave the chatroom?");
  if (leaveRoom) {
    window.location = "../index.html";
  } else {
  }
});

//Next player
nextBtn.addEventListener("click", function () {
  socket.emit("nextPlayer");
});

document.addEventListener("mousemove", function () {
  socket.emit("isPlayerTurnReq");
});

document.addEventListener("click", function () {
  socket.emit("isPlayerTurnReq");
});

document.addEventListener("focus", function () {
  socket.emit("isPlayerTurnReq");
});

//Letter input on words

let currentWord;

document.addEventListener("keydown", function (f) {
  if (f.key === "Delete") {
    f.preventDefault();
    console.log("Word input is delete");
  }

  oldWord = document.getElementById(`${f.srcElement.id}`).value;
});

document.addEventListener("keyup", function (e) {
  currentWord = document.getElementById(`${e.srcElement.id}`);
  console.log(currentWord.value);
  console.log(e.key);

  socket.emit("wordInput", e.key);

  // let letterboxLetter = document.getElementsByClassName("letter");
  // console.log(letterboxLetter[0]);

  //Update all player DOM with above

  socket.emit("updatedWordsAcrossDOM", e.srcElement.id, currentWord.value);
});

socket.on("charChecked", (checked) => {
  if (checked === false) {
    currentWord.value = oldWord;
  }

  /////
  if (checked !== false) {
    document.getElementById(`player-${checked[0]}-${checked[1]}`).textContent =
      "_";
  }
  ////

  //UPDATE HERE: if charChecked === (!false) take return value of charChecked...
});

socket.on("updateWords", (place, word) => {
  document.getElementById(`${place}`).value = word;
});

//Check if it is player's turn on click events

socket.on("isPlayerTurnRes", (res, id) => {
  let elementsToDeactivate = document.getElementsByClassName(
    "has-deactive-option"
  );
  let elementsToActivate = document.getElementById(`player-${id}-words`);

  if (res === false) {
    for (i = 0; i <= elementsToDeactivate.length - 1; i++) {
      elementsToDeactivate[i].classList.add("deactivate");
    }
  } else {
    for (i = 0; i <= elementsToDeactivate.length - 1; i++) {
      elementsToDeactivate[i].classList.add("deactivate");
    }

    elementsToActivate.classList.remove("deactivate");
  }
});
