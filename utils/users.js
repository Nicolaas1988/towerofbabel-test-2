const users = [];
const playerTurns = { rooms: {} };
// Join user to chat
function userJoin(id, username, room) {
  let initLetters = [];

  if (!playerTurns.rooms[room]) {
    playerTurns.rooms[room] = { pTurn: id, id: [id], counter: 0 };
  } else playerTurns.rooms[room].id.push(id);

  for (i = 0; i < 24; i++) {
    let letter = randomLetter();
    initLetters.push(letter);
  }
  const user = {
    id,
    username,
    room,
    letters: {
      l1: initLetters[0],
      l2: initLetters[1],
      l3: initLetters[2],
      l4: initLetters[3],
      l5: initLetters[4],
      l6: initLetters[5],
      l7: initLetters[6],
      l8: initLetters[7],
      l9: initLetters[8],
      l10: initLetters[9],
      l11: initLetters[10],
      l12: initLetters[11],
      l13: initLetters[12],
      l14: initLetters[13],
      l15: initLetters[14],
      l16: initLetters[15],
      l17: initLetters[16],
      l18: initLetters[17],
      l19: initLetters[18],
      l20: initLetters[19],
      l21: initLetters[20],
      l22: initLetters[21],
      l23: initLetters[22],
      l24: initLetters[23],
    },
    section: `

    <div class="card" id="card-id-${id}">
  
      <div class = "player">
     
        <div class ="player__header"> 
        
          <p class="player__header-user"> ${username} </p> 
        

        </div>

        <div class="letterbox" id="player-${id}-letterbox">
        <p class="letter" id="player-${id}-l1"> ${initLetters[0]} </p> 
        <p class="letter" id="player-${id}-l2"> ${initLetters[1]} </p> 
        <p class="letter" id="player-${id}-l3"> ${initLetters[2]} </p> 
        <p class="letter" id="player-${id}-l4"> ${initLetters[3]} </p> 
        <p class="letter" id="player-${id}-l5"> ${initLetters[4]} </p>
        <p class="letter" id="player-${id}-l6"> ${initLetters[5]} </p>
        <p class="letter" id="player-${id}-l7"> ${initLetters[6]} </p>
        <p class="letter" id="player-${id}-l8"> ${initLetters[7]}</p> 
        <p class="letter" id="player-${id}-l9"> ${initLetters[8]} </p> 
        <p class="letter" id="player-${id}-l10"> ${initLetters[9]}</p> 
        <p class="letter" id="player-${id}-l11"> ${initLetters[10]}</p> 
        <p class="letter" id="player-${id}-l12"> ${initLetters[11]} </p>
        <p class="letter" id="player-${id}-l13"> ${initLetters[12]}</p> 
        <p class="letter" id="player-${id}-l14"> ${initLetters[13]}</p> 
        <p class="letter" id="player-${id}-l15"> ${initLetters[14]}</p> 
        <p class="letter" id="player-${id}-l16"> ${initLetters[15]}</p> 
        <p class="letter" id="player-${id}-l17"> ${initLetters[16]}</p> 
        <p class="letter" id="player-${id}-l18"> ${initLetters[17]}</p> 
        <p class="letter" id="player-${id}-l19"> ${initLetters[18]}</p> 
        <p class="letter" id="player-${id}-l20"> ${initLetters[19]}</p> 
        <p class="letter" id="player-${id}-l21"> ${initLetters[20]}</p> 
        <p class="letter" id="player-${id}-l22"> ${initLetters[21]}</p> 
        <p class="letter" id="player-${id}-l23"> ${initLetters[22]}</p> 
        <p class="letter" id="player-${id}-l24"> ${initLetters[23]}</p> 

        
        
        </div>

        <div class = "words has-deactive-option  id="player-${id}-words"">

          <input class= "word" id= "player-${id}-word-1"> <div class= "word-value" id="player-${id}-word-1-v"> 19 </div> <div class="partofspeech" id= "player-${id}-word-1-pos"> n,adj,adv </div>

          

          <input class= "word" id= "player-${id}-word-2"> <div class= "word-value" id="player-${id}-word-2-v"> 19 </div> <div class="partofspeech" id= "player-${id}-word-2-pos"> n,adj,adv </div>

          <input class= "word" id= "player-${id}-word-3"> <div class= "word-value" id="player-${id}-word-3-v"> 19 </div> <div class="partofspeech" id= "player-${id}-word-3-pos"> n,adj,adv </div>

          <input class= "word" id= "player-${id}-word-4"> <div class= "word-value" id="player-${id}-word-4-v"> 19 </div> <div class="partofspeech" id= "player-${id}-word-4-pos"> n,adj,adv </div>

          <input class= "word" id= "player-${id}-word-5"> <div class= "word-value" id="player-${id}-word-5-v"> 19 </div> <div class="partofspeech" id= "player-${id}-word-5-pos"> n,adj,adv </div>

          <input class= "word" id= "player-${id}-word-6"> <div class= "word-value" id="player-${id}-word-6-v"> 19 </div> <div class="partofspeech" id= "player-${id}-word-6-pos"> n,adj,adv </div>

          <input class= "word" id= "player-${id}-word-7"> <div class= "word-value" id="player-${id}-word-7-v"> 19 </div> <div class="partofspeech" id= "player-${id}-word-7-pos"> n,adj,adv </div>

          <input class= "word" id= "player-${id}-word-8"> <div class= "word-value" id="player-${id}-word-8-v"> 19 </div> <div class="partofspeech" id= "player-${id}-word-8-pos"> n,adj,adv </div>

          <input class= "word" id= "player-${id}-word-9"> <div class= "word-value" id="player-${id}-word-9-v"> 19 </div> <div class="partofspeech" id= "player-${id}-word-9-pos"> n,adj,adv </div>

          <input class= "word" id= "player-${id}-word-10"> <div class= "word-value" id="player-${id}-word-10-v"> 19 </div> <div class="partofspeech" id= "player-${id}-word-10-pos"> n,adj,adv </div>

          
        </div>

        <div class ="player-info" id="player-${id}-info">  
        
        <div> Battle Status </div>
        <div> Words Worth </div>
        <div> Parts of Speech </div>

        
        </div>
      </div>
    </div>`,
  };

  users.push(user);

  return user;
}

function randomLetter() {
  let alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  let letter = String(alphabet[Math.floor(Math.random() * 26)]);

  return letter;
}

// Get current user
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

// function isPlayerTurn(id) {
//   // if (currentInUserArray.id === id) {
//   //   return true;
//   // } else {
//   //   return false;
//   if (id === undefined) return false;
//   // }
//   if (id === users[turnTracking].id) {
//     return true;
//   } else {
//     return false;
//   }
// }

// User leaves chat
function userLeave(id) {
  const indexOfUser = users.findIndex((user) => user.id === id);

  if (indexOfUser !== -1) {
    return users.splice(indexOfUser, 1)[0];
  }
}

function deletePlayerTurn(room, id) {
  const indexOfIdInPlayerTurn = playerTurns.rooms[room].id.findIndex(
    (i) => i === id
  );

  if (indexOfIdInPlayerTurn !== -1) {
    // playerTurns.rooms[room].counter--;
    playerTurns.rooms[room].id.splice(indexOfIdInPlayerTurn, 1)[0];
  }

  if (playerTurns.rooms[room].pTurn === id) {
    playerTurns.rooms[room].pTurn ===
      playerTurns.rooms[room].id[indexOfIdInPlayerTurn];
  }

  // playerTurns.rooms[room] = { pTurn: id, id: [id], counter: 0 };

  return playerTurns;
}

// Get room users
function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

function getPlayerTurn(id, room) {
  if (id === playerTurns.rooms[room].pTurn) {
    return true;
  } else {
    return false;
  }
  // playerTurns.rooms[room] = { pTurn: id, id: [id] };
}

function checkChar(char, playerId, letters) {
  if (char === "Backspace") {
    return true;
  }
  if (char === "Delete") return false;
  if (Object.values(letters).includes(`${char}`)) {
    //
    let index = Object.keys(letters).find((key) => letters[key] === char);
    letters[index] = "_";
    return [playerId, index];

    // return true;
  } else {
    return false;
  }
}

function nextPlayer(room, id) {
  if (playerTurns.rooms[room].counter < playerTurns.rooms[room].id.length - 1) {
    playerTurns.rooms[room].counter++;
  } else {
    playerTurns.rooms[room].counter = 0;
  }

  let count = playerTurns.rooms[room].counter;
  playerTurns.rooms[room].pTurn = playerTurns.rooms[room].id[count];

  // playerTurns.rooms[room] = { pTurn: id, id: [id] };
}

// function updateLetterbasket(letters, char) {
//   keys = Object.keys(letters);

//   // keys.forEach((key, index) => {
//   //   console.log(`${key}: ${courses[key]}`);
//   // });
// }

module.exports = {
  userJoin,
  checkChar,
  deletePlayerTurn,
  getPlayerTurn,
  getCurrentUser,
  getPlayerTurn,
  userLeave,
  getRoomUsers,
  nextPlayer,
};
