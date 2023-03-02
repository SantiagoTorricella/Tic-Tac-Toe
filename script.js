// Nodes References //
const square = document.querySelectorAll(".square");
const winningText = document.querySelector("[data-winning-message]");
// Variables //
let turn = 1;
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

// Factory Functions and Modules //

const gameBoard = (() => {
  let gameboard = Array.from(square);
  return { gameboard };
})();

const playerFactory = (name, mark) => {
  return { name, mark };
};

const gameFlow = () => {
  return;
};

// Creating Objects //

const player1 = playerFactory("player1", "X");
const player2 = playerFactory("player2", "O");

// Creating Functions //

playerTurn();

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

function isDraw() {
  return [...square].every((cell) => {
    return cell.classList.contains("X") || cell.classList.contains("O");
  });
}

function endGame(draw) {
  if (draw) {
    winningText.innerText = "Draw!";
  } else {
    winningText.innerText = `${currentMark}` + "'s is the winner";
  }
}

function checkWin(currentMark) {
  return winningMatches.some((combination) => {
    return combination.every((index) => {
      return square[index].classList.contains(currentMark);
    });
  });
}
