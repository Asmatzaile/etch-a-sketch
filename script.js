const board = document.querySelector('#board');

const boardDim = getComputedStyle(board).width;
const boardGap = (+ getComputedStyle(board).gap.slice(0, -2) || 0); // the 0 is for when there's no gap defined


let squares;
function drawGrid(gridDiv) {
const squareDim = (100 / gridDiv);
const gapOffset= boardGap*(gridDiv-1)/gridDiv;
board.replaceChildren();
for (let i = 0; i < gridDiv ** 2; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.cssText = `height: calc(${squareDim}% - ${gapOffset}px); width: calc(${squareDim}% - ${gapOffset}px);`;
    square.addEventListener('mouseover', colorSquare);
    square.addEventListener('mousedown', colorSquare);
    board.appendChild(square);
}
squares = document.querySelectorAll('.square');
}

updateGridSize(16);

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

let autoclear;
let selectedColor = 'black';

function colorSquare(event) {
    if (event.type === "mouseover" && !mouseDown) return;
    // the previous line is a filter; when the event type is
    // mousedown it is bypassed; and when it is mouseover it is only
    // bypassed when the mouse is down 
    clearTimeout(this.timeoutCode); // this and e.target are the same and IDK why
    this.style.transition = "0.08s";
    this.style.backgroundColor = getColor(); // to only change this attribute
    if (!autoclear) return;
    this.timeoutCode = setTimeout(clearSquare, 2000, this);
}

function getColor() {
    switch(selectedColor){
        case 'black':
            return 'black';
        case 'rainbow':
            return (`rgb(${random(255)}, ${random(255)}, ${random(255)})`)
    }
}

function random(num) {
    return Math.floor(Math.random()*num);
}

function clearSquare(square) {
    square.style.transition = '2s';
    square.style.backgroundColor = 'white';
}

const buttons = document.querySelectorAll('button');
const colorButtons = document.querySelectorAll('.color');

buttons.forEach((button) => {
    button.isSelected = false;
    button.addEventListener(('mousedown'), (e) => {
    triggerButton((e.currentTarget));   // target instead of currentTarget triggers child
    });
});

triggerButton(document.querySelector('#black'));
triggerButton(document.querySelector('#autoclear'));


function triggerButton(button) {
        switch(button.id){
            case 'clear-board':
                squares.forEach(clearSquare);
                break;
            case 'autoclear':
                toggle(button);
                autoclear = button.isSelected;
                if (!autoclear) return;
                if (autoclear) {
                squares.forEach(clearSquare);
                break;
            }
        }
        if(button.className === 'color') {
            colorButtons.forEach((button) => {
                unselect(button);
            });
            toggle(button);
            selectedColor = button.id;
        }

}

function toggle(button) {
    button.isSelected = !button.isSelected;
    button.classList.toggle('selected');
}

function unselect(button) {
    button.isSelected = false;
    button.classList.remove('selected');
}

const slider = document.querySelector('#myRange');
slider.addEventListener('input', (e) => {
    const newSize = Math.floor((e.target.value / 100) ** 2 * 63 + 1);
    updateGridSize(newSize);
});

function updateGridSize(newSize) {
    gridDiv = newSize;
    drawGrid(newSize);
    const sizeText = document.querySelector('#size-panel p');
    sizeText.textContent = `${newSize}x${newSize}`
}