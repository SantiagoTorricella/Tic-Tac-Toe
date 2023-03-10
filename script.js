// Nodes References //
const square = document.querySelectorAll(".square");
const winningText = document.querySelector("[data-winning-message]");
const gameBoardNode = document.getElementById("gameBoard");
const winningScreen = document.getElementById("winningScreen");
const humanPlay = document.getElementById("humanPlay");
const aiPlay = document.getElementById("aiPlay");
const initScreen = document.getElementById("initPage");

// Variables //
let turn = 1;
let i = 0;
let currentMark;
let winningMatches = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let board = Array.from(square);

// Factory Functions and Modules //

const playerFactory = (name, mark) => {
  return { name, mark };
};

// Creating Objects //

const player1 = playerFactory("player1", "X");
const player2 = playerFactory("player2", "O");

// Listeners //

humanPlay.addEventListener("click", () => {
  gameBoardNode.classList.remove("hidden");
  initScreen.classList.add("hidden");
  playerTurn();
});

aiPlay.addEventListener("click", () => {
  gameBoardNode.classList.remove("hidden");
  initScreen.classList.add("hidden");
  playWithAi();
});

// Creating Functions //

function playerTurn() {
  square.forEach((boxSquare) => {
    boxSquare.addEventListener(
      "click",
      () => {
        if (turn === 1) {
          boxSquare.innerText = player1.mark;
          currentMark = player1.mark;
          boxSquare.classList.add("X");
          if (checkWin(currentMark)) {
            endGame(false);
          } else if (isDraw()) {
            endGame(true);
          }
          return (turn = 2);
        }
        if (turn === 2) {
          boxSquare.innerText = player2.mark;
          currentMark = player2.mark;
          boxSquare.classList.add("O");
          if (checkWin(currentMark)) {
            endGame(false);
          } else if (isDraw()) {
            endGame(true);
          }
          return (turn = 1);
        }
      },

      { once: true }
    );
  });
}

function playWithAi() {
  if (turn === 1) {
    playerMove();
    turn = 2;
  }

  if (turn === 2) {
    console.log("hola");
    aiMove();
    turn = 1;
  }
}

function playerMove() {
  square.forEach((boxSquare) => {
    boxSquare.addEventListener("click", () => {
      boxSquare.innerText = player1.mark;
      currentMark = player1.mark;
      boxSquare.classList.add("X");
      if (checkWin(currentMark)) {
        endGame(false);
      } else if (isDraw()) {
        endGame(true);
      }
    });
  });
}

function aiMove() {
  let bestScore = -Infinity;
  let bestMove;
  square.forEach((boxSquare) => {
    // if the spot is available
    if (boxSquare.innerText == "") {
      let score = minimax(square);
      if (score > bestScore) {
        bestScore = score;
        bestMove = boxSquare;
        console.log(bestScore);
      }
    }
  });
  console.log(bestMove);
  bestMove.innerText = "O";
  return (turn = 1);
}

function minimax(board) {
  return 1;
}

function isDraw() {
  return [...square].every((cell) => {
    return cell.classList.contains("X") || cell.classList.contains("O");
  });
}

function endGame(draw) {
  if (draw) {
    winningText.innerText = "Draw!";
    winningScreen.classList.remove("hidden");
  } else {
    winningText.innerText = `${currentMark}` + "'s is the winner";
    winningScreen.classList.remove("hidden");
  }
}

function checkWin(currentMark) {
  return winningMatches.some((combination) => {
    return combination.every((index) => {
      return square[index].classList.contains(currentMark);
    });
  });
}
