const gameCell = document.querySelectorAll(".cell");
const player1 = document.querySelectorAll(".player1");
const player2 = document.querySelector(".player2");
const resetbtn = document.querySelector(".resetbtn");
const alertBox = document.querySelector(".alertBox");

// creates variables
let currentPlayer = "X";
let nextpPlayer = "O";
let playerTurn = currentPlayer;

player1.textContent = `Player 1 : ${currentPlayer}`;
player2.textContent = `Player 2 : ${nextpPlayer}`;

// start funcion play game
const startGame = () => {
  gameCell.forEach((cell) => {
    cell.addEventListener("click", hendleClick);
  });
};

const hendleClick = (e) => {
  {
    if (e.target.textContent === "") {
      e.target.textContent = playerTurn;
      if (checkWin()) {
        // console.log(`${playerTurn} is a winnner`);
        showAlert(`${playerTurn} is a winnner`);
        disableCell();
      } else if (checkTie()) {
        // console.log("its a tie");
        showAlert(`its a tie`);

        disableCell();
      } else {
        changePlayerTurn();
        showAlert(`Turn for player : ${playerTurn}`);
      }
      // checkWin();
    }
  }
};

// disable game grid
const disableCell = () => {
  gameCell.forEach((cell) => {
    cell.removeEventListener("click", hendleClick);
    cell.classList.add("disabled");
  });
};
// change player turn  function
const changePlayerTurn = () => {
  // basic logic
  //   if (playerTurn === currentPlayer) {
  //     playerTurn = nextpPlayer;
  //   } else {
  //     playerTurn = currentPlayer;
  //   }
  //using  turnury operator
  playerTurn = playerTurn === currentPlayer ? nextpPlayer : currentPlayer;
};
// who win check function
const checkWin = () => {
  // 3 row and 3 colum and 3 diagonal .. that type of wins in tic tac toe game
  const wininingConditionCheck = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < wininingConditionCheck.length; i++) {
    const [pos1, pos2, pos3] = wininingConditionCheck[i];
    if (
      gameCell[pos1].textContent !== "" &&
      gameCell[pos1].textContent === gameCell[pos2].textContent &&
      gameCell[pos2].textContent === gameCell[pos3].textContent
    ) {
      return true;
    }
    // console.log(`${pos1}${pos2}${pos3}`);
    // console.log(`${pos2}`);
  }
  return false;
};
// check tie
const checkTie = () => {
  let emptyCellsCount = 0;
  gameCell.forEach((cell) => {
    if (cell.textContent === "") {
      emptyCellsCount++;
    }
  });
  return emptyCellsCount === 0 && !checkWin();
};
const restartBtn = () => {
  gameCell.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("disabled");

    startGame();
  });
};
// resetbtn.addEventListener("click", restartBtn);

// show alert
const showAlert = (msg) => {
  alertBox.style.display = "block";
  alertBox.textContent = msg;
  setTimeout(() => {
    alertBox.style.display = "none";
  }, 3000);
};
resetbtn.addEventListener("click", restartBtn);
startGame();
