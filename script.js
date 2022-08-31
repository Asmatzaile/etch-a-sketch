const board = document.querySelector("#board");

const boardDim = getComputedStyle(board).width;
const boardGap = (+ getComputedStyle(board).gap.slice(0, -2) || 0); // the 0 is for when there's no gap defined
const gridDiv = 16;
const squareDim = (100 / gridDiv);
const gapOffset= boardGap*(gridDiv-1)/gridDiv;

for (let i = 0; i < gridDiv ** 2; i++) {
    const square = document.createElement('div');
    square.style.cssText = `height: calc(${squareDim}% - ${gapOffset}px); width: calc(${squareDim}% - ${gapOffset}px);`;
    square.addEventListener('mouseover', colorSquare);
    square.addEventListener('mousedown', colorSquare);
    board.appendChild(square);
}

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function colorSquare(e) {
    if (e.type === "mouseover" && !mouseDown) return;
    // the previous line is a filter; when the event type is
    // mousedown it is bypassed; and when it is mouseover it is only
    // bypassed when the mouse is down 
    clearTimeout(this.timeoutCode); // this and e.target are the same
    let color = "black";
    this.style.transition = "0.08s";
    this.style.backgroundColor = color; // to only change this attribute
    this.timeoutCode = setTimeout(clearSquare, 2000, e);
}

function clearSquare(e) {
    e.target.style.transition = "2s";
    e.target.style.backgroundColor = "white";
}