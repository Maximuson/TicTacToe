let cellX = new Set();
let cellO = new Set();
let game = new Array();
const cellsContainer = document.querySelector('.field');
let isX = 0;
cellsContainer.addEventListener('click', (e) => {
  //game = e.target.id;
  if (e.target.id !== '') {
    game.push(e.target.id);
    console.log(game);
  }
  if (!isWin(cellX) && !isWin(cellO)) {
    isX = game.length % 2;

    if (e.target.className !== 'row' && isX === 0) {
      e.target.classList.add('r');
      cellO.add(e.target.id);
      isWin(cellO);
    }
    if (e.target.className !== 'row' && isX === 1) {
      e.target.classList.add('ch');
      cellX.add(e.target.id);
      isWin(cellX);
    }
  }
});
function isWin(someCell) {
  if (
    (someCell.has('c-0') && someCell.has('c-3') && someCell.has('c-6')) ||
    (someCell.has('c-0') && someCell.has('c-4') && someCell.has('c-8')) ||
    (someCell.has('c-1') && someCell.has('c-4') && someCell.has('c-7')) ||
    (someCell.has('c-2') && someCell.has('c-5') && someCell.has('c-8')) ||
    (someCell.has('c-0') && someCell.has('c-1') && someCell.has('c-2')) ||
    (someCell.has('c-3') && someCell.has('c-4') && someCell.has('c-5')) ||
    (someCell.has('c-6') && someCell.has('c-7') && someCell.has('c-8'))
  ) {
    let winTable = document.querySelector('.won-title');
    winTable.classList.remove('hidden');
    return true;
  }
  return false;
}
