const cells = document.querySelectorAll('.cell');
const vsPlayerButton = document.querySelector('.pvp');
const vsBotButton = document.querySelector('.pvb');
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
const matrix = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]

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
  const invencibleDifficulty = document.querySelector('.invencible');

  const minimax = (depth, isMaximizing, alpha, beta) => {
    if (depth >= 9 || isWinner() == 0) {
      return matrix;
    }

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (matrix[i][j] === '') {
            matrix[i][j] = 'O';
            const eval = minimax(depth + 1, false, alpha, beta);
            matrix[i][j] = '';
            maxEval = Math.max(maxEval, eval);
            alpha = Math.max(alpha, eval);
            if (beta <= alpha) {
              break ;
            }
          }
        }
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (matrix[i][j] === '') {
            matrix[i][j] = 'O';
            const eval = minimax(depth + 1, false, alpha, beta);
            matrix[i][j] = '';
            maxEval = Math.max(maxEval, eval);
            alpha = Math.max(alpha, eval);
            if (beta <= alpha) {
              break ;
            }
          }
        }
      }
      return minEval;
    }
  }

  const getBestMove = (matrix) => {
    let bestMove = { row: -1, col: -1 };
    let bestEval = -Infinity;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (matrix[i][j] === '') {
          matrix[i][j] = 'O';
          const eval = minimax(0, false, -Infinity, Infinity);
          matrix[i][j] = '';
          if (eval > bestEval) {
            bestEval = eval;
            bestMove.row = i;
            bestMove.col = j;
          }
        }
      }
    }
    return bestMove;
  }

  const indexToBlock = () => {
    let index = 0;

    for (const win of winningCombinations) {
      const [a, b, c] = win;
      const cell1 = document.querySelector(`.cell[data-index='${a}']`);
      const cell2 = document.querySelector(`.cell[data-index='${b}']`);
      const cell3 = document.querySelector(`.cell[data-index='${c}']`);
      
      if (
        (cell1.textContent === '' && cell2.textContent === 'X' && cell3.textContent === 'X') ||
        (cell2.textContent === '' && cell1.textContent === 'X' && cell3.textContent === 'X') ||
        (cell3.textContent === '' && cell1.textContent === 'X' && cell2.textContent === 'X')
      ) {
        index = [a, b, c].find((i) => document.querySelector(`.cell[data-index='${i}']`).textContent === '');
        break;
      }
    }
    return index;
  }

  const indexToWin = () => {
    let index = 0;

    for (const win of winningCombinations) {
      const [a, b, c] = win;
      const cell1 = document.querySelector(`.cell[data-index='${a}']`);
      const cell2 = document.querySelector(`.cell[data-index='${b}']`);
      const cell3 = document.querySelector(`.cell[data-index='${c}']`);
      
      if (
        (cell1.textContent === '' && cell2.textContent === 'O' && cell3.textContent === 'O') ||
        (cell2.textContent === '' && cell1.textContent === 'O' && cell3.textContent === 'O') ||
        (cell3.textContent === '' && cell1.textContent === 'O' && cell2.textContent === 'O')
      ) {
        index = [a, b, c].find((i) => document.querySelector(`.cell[data-index='${i}']`).textContent === '');
        break;
      }
    }
    return index;
  }

  easyDifficulty.addEventListener('click', () => {
    botEasy();
  });
  mediumDifficulty.addEventListener('click', () => {
    botMedium();
  });
  /* invencibleDifficulty.addEventListener('click', () => {
    botHard();
  })
 */
  const botEasy = () => {
    cells.forEach((cell) => {
      const index = Array.from(cells).indexOf(cell);
      const rowIndex = Math.floor(index / 3);
      const colIndex = index % 3;
      cell.addEventListener('click', () => {
        if (cell.textContent === '' && !isWinner()) {
          cell.textContent = 'X';
          cell.style.pointerEvents = 'none';
          matrix[rowIndex][colIndex] = 'X';
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
          
          const randomCellIndex = Array.from(cells).indexOf(randomCell);
          const randomCellRowIndex = Math.floor(randomCellIndex / 3);
          const randomCellColIndex = randomCellIndex % 3;
          
          matrix[randomCellRowIndex][randomCellColIndex] = 'O';
          if (isWinner() == 'X' || isWinner() == 'O' || isWinner() == 'tie') {
            displayWinner(isWinner());
            return ;
          }
        }
      })
    })
  }

  const botMedium = () => {
    cells.forEach((cell) => {
      const index = Array.from(cells).indexOf(cell);
      const rowIndex = Math.floor(index / 3);
      const colIndex = index % 3;
      cell.addEventListener('click', () => {
        if (cell.textContent === '' && !isWinner()) {
          cell.textContent = 'X';
          cell.style.pointerEvents = 'none';
          matrix[rowIndex][colIndex] = 'X';
          if (isWinner() == 'X' || isWinner() == 'O' || isWinner() == 'tie') {
            displayWinner(isWinner());
            return;
          }
        }
        const emptyCells = Array.from(cells).filter((cell) => cell.textContent === '');
        if (emptyCells.length > 0) {
          let index = indexToWin();

          if (!index) {
            index = indexToBlock();
          }
          if (!index) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            index = emptyCells[randomIndex].getAttribute('data-index');
          }
          const cellToFill = document.querySelector(`.cell[data-index='${index}']`);
          cellToFill.textContent = 'O';
          cellToFill.style.pointerEvents = 'none';
          
          const randomCellIndex = Array.from(cells).indexOf(randomCell);
          const randomCellRowIndex = Math.floor(randomCellIndex / 3);
          const randomCellColIndex = randomCellIndex % 3;
          
          matrix[randomCellRowIndex][randomCellColIndex] = 'O';
          if (isWinner() == 'X' || isWinner() == 'O' || isWinner() == 'tie') {
            displayWinner(isWinner());
          }
        }
      })
    })
  }
  
  /* Añadir matriz de row index y col index para poder hacer algoritmo más cómodo */
  const botHard = () => {
    cells.forEach((cell) => {
      const index = Array.from(cells).indexOf(cell);
      const rowIndex = Math.floor(index / 3);
      const colIndex = index % 3;
      cell.addEventListener('click', () => {
        if (cell.textContent === '' && !isWinner()) {
          cell.textContent = 'X';
          cell.style.pointerEvents = 'none';
          matrix[rowIndex][colIndex] = 'X';
          if (isWinner() == 'X' || isWinner() == 'O' || isWinner() == 'tie') {
            displayWinner(isWinner());
            return;
          }
        }
        const emptyCells = Array.from(cells).filter((cell) => cell.textContent === '');
        if (emptyCells.length > 0) {
          let index = indexToWin();

          if (!index) {
            index = indexToBlock();
          }
          if (!index) {
            matrix = getBestMove();
          }
          const cellToFill = document.querySelector(`.cell[data-index='${index}']`);
          cellToFill.textContent = 'O';
          cellToFill.style.pointerEvents = 'none';
          matrix[rowIndex][colIndex] = 'O';
          if (isWinner() == 'X' || isWinner() == 'O' || isWinner() == 'tie') {
            displayWinner(isWinner());
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
