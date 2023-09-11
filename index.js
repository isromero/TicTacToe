const cells = document.querySelectorAll('.cell');
const vsPlayerButton = document.querySelector('.pvp');
const vsBotButton = document.querySelector('.pvb');

vsPlayerButton.addEventListener('click', () => {
  vsPlayerButton.style.pointerEvents = 'none';
  PlayerVsPlayer();
})

vsBotButton.addEventListener('click', () => {
  PlayerVsBot();
})

const PlayerVsBot = () => {
  const easyDifficulty = document.querySelector('.easy');
  const mediumDifficulty = document.querySelector('.medium');
  const hardDifficulty = document.querySelector('.hard');

  easyDifficulty.addEventListener('click', () => {
    botEasy();
  });
  /* mediumDifficulty.addEventListener('click', () => {
    botMedium();
  });
  hardDifficulty.addEventListener('click', () => {
    botHard();
  }) */

  const botEasy = () => {
    cells.forEach((cell) => {
      cell.addEventListener('click', () => {
        if (cell.textContent === '' && !isWinner()) {
          cell.textContent = 'X';
          cell.style.pointerEvents = 'none';
          if (isWinner() == 'X' || isWinner() == 'O' || isWinner() == 'tie') {
            displayWinner(isWinner());
            return ;
          }
        }
        const emptyCells = Array.from(cells).filter((cell) => cell.textContent === '');
        if (emptyCells.length > 0) {
          const randomIndex = Math.floor(Math.random() * emptyCells.length);
          const randomCell = emptyCells[randomIndex];
          randomCell.textContent = 'O';
          randomCell.style.pointerEvents = 'none';
          if (isWinner() == 'X' || isWinner() == 'O' || isWinner() == 'tie') {
            displayWinner(isWinner());
            return ;
          }
        }
      })
    })
  }
}

const PlayerVsPlayer = () => {
  let currentPlayer = 'X';

  cells.forEach((cell) => {
    cell.addEventListener('click', () => {
      if (cell.textContent === '' && !isWinner()) {
        cell.textContent = currentPlayer;
        cell.style.pointerEvents = 'none';
        if (isWinner() == 'X' || isWinner() == 'O' || isWinner() == 'tie') {
          displayWinner(isWinner());
        } else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
      } else {
        displayWinner(isWinner());
      }
    })
  })
}

const isWinner = () => {
  const cellElements = [...cells];
  const winningCombinations = [
    /* Rows */
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    /* Columns */
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    /* Diagonals */
    [1, 5, 9],
    [3, 5, 7],
  ];

  let result = 0;

  for (const win of winningCombinations) {
    const [a, b, c] = win;
    const cell1 = document.querySelector(`.cell[data-index='${a}']`);
    const cell2 = document.querySelector(`.cell[data-index='${b}']`);
    const cell3 = document.querySelector(`.cell[data-index='${c}']`);

    if (
      cell1.textContent !== '' &&
      cell1.textContent === cell2.textContent &&
      cell2.textContent === cell3.textContent
    ) {
      result = cell1.textContent;
      break;
    }
  }
  const allCellsFilled = cellElements.every((cell) => cell.textContent !== '');
  if (result === 0 && allCellsFilled) {
    result = 'tie';
  }
  return result;
}


const displayWinner = (winner) => {
  const displayWinner = document.createElement('div');
  const displayWinnerText = document.createElement('h2');

  displayWinner.appendChild(displayWinnerText);

  displayWinner.classList.add('display-winner');
  displayWinnerText.classList.add('display-winner-text');
  if (winner != 'tie') {
    displayWinnerText.textContent = `${winner} WINS`;
  } else {
    displayWinnerText.textContent = "It's a tie!"
  }
  const game = document.querySelector('.game');
  game.appendChild(displayWinner);
}

const restartGame = () => {
  cells.forEach((cell) => {
    cell.textContent = '';
  })
}
