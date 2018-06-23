const cellX = new Set();
const cellO = new Set();
const cellXRedo = new Set();
const cellORedo = new Set();
let game = [];
let gameUndo = [];
let del;
let gameRedo = [];

const winTable = document.querySelector('.won-title');
const cellsContainer = document.querySelector('.field');
const clearCell = cellsContainer.querySelectorAll('.cell');
const wonMsg = document.querySelector('.won-message');
const undo = document.querySelector('.undo-btn');
const redo = document.querySelector('.redo-btn');
function isWin(someCell) {
  if (
    (someCell.has('c-0') && someCell.has('c-3') && someCell.has('c-6')) ||
    (someCell.has('c-0') && someCell.has('c-4') && someCell.has('c-8')) ||
    (someCell.has('c-1') && someCell.has('c-4') && someCell.has('c-7')) ||
    (someCell.has('c-2') && someCell.has('c-5') && someCell.has('c-8')) ||
    (someCell.has('c-0') && someCell.has('c-1') && someCell.has('c-2')) ||
    (someCell.has('c-3') && someCell.has('c-4') && someCell.has('c-5')) ||
    (someCell.has('c-6') && someCell.has('c-7') && someCell.has('c-8')) ||
    (someCell.has('c-2') && someCell.has('c-4') && someCell.has('c-6'))
  ) {
    winTable.classList.remove('hidden');
    return true;
  }
  return false;
}
cellsContainer.addEventListener('click', (e) => {
  if (e.target.id !== '' && !isWin(cellX) && !isWin(cellO)) {
    game.push(e.target.id);
    // gameUndo = game;
    // console.log(gameUndo);
  }

  if (game.length % 2 === 1 && e.target.className !== 'row' && !isWin(cellX) && !isWin(cellO)) {
    e.target.classList.add('ch');
    cellX.add(e.target.id);
    cellXRedo.add(e.target.id);
    isWin(cellX);
    wonMsg.textContent = 'Crosses Won!';
    if (!isWin(cellX) && game.length === 9) {
      winTable.classList.remove('hidden');
      wonMsg.textContent = "It's a draw!";
    }
  }
  if (game.length % 2 === 0 && e.target.className !== 'row' && !isWin(cellO) && !isWin(cellX)) {
    e.target.classList.add('r');
    cellO.add(e.target.id);
    cellORedo.add(e.target.id);
    isWin(cellO);
    wonMsg.textContent = 'Toes Won!';
    if (!isWin(cellO) && game.length === 9) {
      winTable.classList.remove('hidden');
      wonMsg.textContent = "It's a draw!";
    }
  }
  if (game.length !== 0) {
    undo.disabled = false;
  }
  if (gameRedo !== 0) {
    redo.disabled = false;
  }
});
undo.addEventListener('click', () => {
  winTable.classList.add('hidden');
  if (game.length !== 0) {
    undo.disabled = false;

    // console.log(gameUndo);
    for (let i = 0; i < 9; i += 1) {
      if (clearCell[i].id === game[game.length - 1]) {
        del = clearCell[i];
      }
    }
    // console.log(del);
    del.classList.remove('ch');
    del.classList.remove('r');
    cellX.delete(game[game.length - 1]);
    cellO.delete(game[game.length - 1]);
    game.pop();
    if (!gameUndo.includes(del.id)) {
      gameUndo.push(del.id);
    }


    // gameUndo.pop();
    // console.log(gameUndo);

    if (game.length === 0) {
      undo.disabled = true;
    }
  }
});

// redo.addEventListener('click', () => {
//   game.push(gameUndo[gameUndo.length - 1]);
//   cellX.add(gameUndo[gameUndo.length - 1]);
//   clearCell.forEach((value, index) => {
//     if (gameUndo.includes())
//   });
//   gameUndo.length -= 1;
// });

const restartButton = document.querySelector('.restart-btn');
restartButton.addEventListener('click', () => {
  // console.log(clearCell[0]);
  clearCell.forEach((value, index) => {
    clearCell[index].classList.remove('ch');
    clearCell[index].classList.remove('r');
  });
  winTable.classList.add('hidden');
  game = [];
  gameRedo = [];
  gameUndo = [];
  cellO.clear();
  cellX.clear();
  undo.disabled = true;
  redo.disabled = true;
});
