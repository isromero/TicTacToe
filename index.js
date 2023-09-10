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
        let dataIndex = cell.getAttribute('data-index');
        if (cell.textContent === '' && !isWinner(dataIndex)) {
          cell.textContent = 'X';
          cell.style.pointerEvents = 'none';
          if (isWinner(dataIndex) == 'X' || isWinner(dataIndex) == 'O' || isWinner(dataIndex) == 'tie') {
            displayWinner(isWinner(dataIndex));
          }
        } else {
          displayWinner(isWinner(dataIndex));
        }
        const emptyCells = Array.from(cells).filter((cell) => cell.textContent === '');
        if (emptyCells.length > 0) {
          const randomIndex = Math.floor(Math.random() * emptyCells.length);
          const randomCell = emptyCells[randomIndex];
          const dataIndexBot = randomCell.getAttribute('data-index');
          randomCell.textContent = 'O';
          randomCell.style.pointerEvents = 'none';

          if (isWinner(dataIndexBot) == 'X' || isWinner(dataIndexBot) == 'O' || isWinner(dataIndexBot) == 'tie') {
            displayWinner(isWinner(dataIndexBot));
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
      let dataIndex = cell.getAttribute('data-index');
      if (cell.textContent === '' && !isWinner(dataIndex)) {
        cell.textContent = currentPlayer;
        cell.style.pointerEvents = 'none';
        if (isWinner(dataIndex) == 'X' || isWinner(dataIndex) == 'O' || isWinner(dataIndex) == 'tie') {
          displayWinner(isWinner(dataIndex));
        } else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
      } else {
        displayWinner(isWinner(dataIndex));
      }
    })
  })
}

const isWinner = (dataIndex) => {
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
  let index = parseInt(dataIndex);

  for (const win of winningCombinations) {
    const [a, b, c] = win;
    const cell1 = document.querySelector(`.cell[data-index='${a}']`);
    const cell2 = document.querySelector(`.cell[data-index='${b}']`);
    const cell3 = document.querySelector(`.cell[data-index='${c}']`);

    if (
      win.includes(index) &&
      cell1.textContent !== '' &&
      cell1.textContent === cell2.textContent &&
      cell2.textContent === cell3.textContent
    ) {
      return cell1.textContent;
    } else {
      const allCellsFilled = cellElements.every((cell) => cell.textContent !== '');
      if (allCellsFilled) {
        return 'tie'
      } else {
        return 0;
      }
    }
  }
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
