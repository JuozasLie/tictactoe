const playerStatus = document.querySelector('#player');
const turnStatus = document.querySelector('#turn-number')
const winnerStatus = document.querySelector('#game-result');

let gameActive = true;
let currentPlayer = "X";
let turnNumber = 1;

let displayCurrentPlayer = () => playerStatus.innerHTML = currentPlayer;
let displayTurnNumber = () => turnStatus.innerHTML = turnNumber;
let displayWinner = () => {
    winnerStatus.innerHTML = "The winner is ${currentPlayer}!";
    toggleModal();
}
let displayDraw = () => {
    winnerStatus.innerHTML = "The game ended in a draw!"
    toggleModal();
}
displayTurnNumber();

//modal
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");
function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
//end modal

function changeActivePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    displayCurrentPlayer();
}
function incrementTurnNumber(){
    turnNumber++;
    displayTurnNumber();
}