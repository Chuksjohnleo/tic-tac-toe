const cell0 = document.getElementById('cell0');
const cell1 = document.getElementById('cell1');
const cell2 = document.getElementById('cell2');
const cell3 = document.getElementById('cell3');
const cell4 = document.getElementById('cell4');
const cell5 = document.getElementById('cell5');
const cell6 = document.getElementById('cell6');
const cell7 = document.getElementById('cell7');
const cell8 = document.getElementById('cell8');
const cells = document.querySelectorAll('.cell');
const player = document.getElementById('player');
const modes = document.getElementsByName('mode');
const navDiv = document.getElementById('nav-div');
const navDiv1 = document.getElementById('nav-div1');

const playingSound = document.getElementById('playing');
const playingSound2 = document.getElementById('playing2');
const playingSound3 = document.getElementById('playing3');
const playingSound4 = document.getElementById('playing4');

modes.forEach(mode=>{
  mode.addEventListener('click',()=>{
    playingSound.play();
    localStorage.setItem('mode',mode.value);
  })
});

   
const board = [  
               [cell0, cell1, cell2],
               [cell3, cell4, cell5],
               [cell6, cell7, cell8]
              ];


const body =  document.querySelector('body');


const human = "X";
const computer = "O";

let thePlayer = 1;
let gameStatus = false;

cells.forEach(cell=>{
   cell.addEventListener('click',()=>{
    let filled = 0;
    if(!modes[0].checked && !modes[1].checked)return alert('Select mode');
    cells.forEach(c=>{
      if(c.textContent.length > 0)filled++;
     });
    if(!checkWin(human) && !checkWin(computer) && filled >= 8)gameStatus = true;
    if(gameStatus) return alert('Game Over,click restart button or refresh to restart');
    playingSound.pause();
    playingSound2.play();
    setTimeout(()=>playingSound2.pause(),450)
    navDiv.style.display = 'none';
    if(modes[0].checked){thePlayer++;navDiv1.innerHTML = 'Multiplayer';}
    if(modes[1].checked)navDiv1.innerHTML = 'Playing with Computer';
    if(cell.textContent.length > 0)return;
    if(checkWin(computer) || checkWin(human)){
     const confirmer = confirm('Game is already over. Click  OK to restart?');
     if(confirmer)return location.reload();
     else return;
    }
  if(localStorage.getItem('mode') === 'multiplayer'){
    if(thePlayer%2 === 0){
      cell.textContent = 'X';
      player.textContent = "It's your friends turn";
  }else {
    cell.textContent = 'O'; 
    player.textContent = "It's your turn";
  }
}else cell.textContent = 'X';
    humanMove();
  });
});


// check if a player has won the game
function checkWin(currentPlayer) {
  // check rows
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0].textContent === currentPlayer &&
      board[i][1].textContent === currentPlayer &&
      board[i][2].textContent === currentPlayer
    ) {
     
      return true;
    }
    
  }

  // check columns
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i].textContent === currentPlayer &&
      board[1][i].textContent === currentPlayer &&
      board[2][i].textContent === currentPlayer
    ) {
    
      return true;
    }
  }

  // check diagonals
  if (
    board[0][0].textContent === currentPlayer &&
    board[1][1].textContent === currentPlayer &&
    board[2][2].textContent === currentPlayer 
  ) {
     return true;
  }
  if (
    board[0][2].textContent ===  currentPlayer &&
    board[1][1].textContent ===  currentPlayer &&
    board[2][0].textContent ===  currentPlayer 
  ) {
   
    return true;
  }

  return false;
}

// check if the board is full
function checkDraw() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j].textContent === "") {
        return false;
      }
    }
  }
  player.textContent = "Draw!";
  document.querySelector('body').style.background = 'white';
  return true;
}

// the computer makes a move
function computerMove() {
playingSound4.play();
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j].textContent === "") {
        board[i][j].textContent = computer;
        if (checkWin(computer)) {
          player.textContent = "Computer won!";
      
         body.style.background = 'white';
          return true;
        }
        board[i][j].textContent = "";
      }
    }
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j].textContent === "") {
        board[i][j].textContent = human;
        if (checkWin(human)) {
          board[i][j].textContent = computer;
          player.textContent = "Computer blocked your win, It's your turn";
        
          return false;
        }
        board[i][j].textContent = "";
      }
    }
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j].textContent === "") {
        board[i][j].textContent = computer;
        player.textContent = "It's your turn";
      
        return false;
      }
    }
  }
}

function friendMove(){
  thePlayer = 'secondPlayer';
}

// the human makes a move
function humanMove() {
    if (checkWin(human)) {
   
      player.textContent = "You won!";
      playingSound3.play();
      body.style.background = 'white';
      return true;
    }
    if (checkDraw()) {
   
      playingSound3.play();
      return true;
    }
    if(modes[1].checked) player.textContent = "It's computers turn";
    modes.forEach(mode=>{
       if(mode.checked && mode.value === 'computer'){
       setTimeout(()=>computerMove(),600);
       }else{
      if (checkWin('O')) {
    
      player.textContent = "friend won!";
      return true;
    }
       }
    });

    return false;
    
   }