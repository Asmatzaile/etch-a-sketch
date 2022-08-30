const board = document.querySelector("#board");

const boardDim = getComputedStyle(board).width;
const boardGap = (+ getComputedStyle(board).gap.slice(0, -2) || 0); // the 0 is for when there's no gap defined
console.log(boardGap);
const gridDiv = 16;
const squareDim = (100 / gridDiv);
const gapOffset= boardGap*(gridDiv-1)/gridDiv;

for (let i = 0; i < gridDiv ** 2; i++) {
    const square = document.createElement('div');
    square.classList.add("square");
    square.style.cssText = `height: calc(${squareDim}% - ${gapOffset}px); width: calc(${squareDim}% - ${gapOffset}px);`;
    board.appendChild(square);
}

