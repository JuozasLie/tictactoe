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

//DOM elements we will use
const playerStatus = document.querySelector('#player');
const turnStatus = document.querySelector('#turn-number')
const winnerStatus = document.querySelector('#game-result');
document.querySelectorAll('.cell').forEach(cell =>
    cell.addEventListener('click', handleCellClick));
document.querySelector('#reset-button').addEventListener('click', restartGame);

//Winning combinations
const winningConditions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

//Starting variables
let gameActive = true;
let currentPlayer = "X";
let turnNumber = 1;
let gameState = ["","","","","","","","","",""];

//DOM manipulation
let displayCurrentPlayer = () => playerStatus.innerHTML = currentPlayer;
let displayTurnNumber = () => turnStatus.innerHTML = turnNumber;
let displayWinner = () => {
    winnerStatus.innerHTML = `The winner is ${currentPlayer}!`;
    toggleModal();
}
let displayDraw = () => {
    winnerStatus.innerHTML = "The game ended in a draw!"
    toggleModal();
}
let fillCell = (cell) => {
    let img = document.createElement('img');
    img.src = `/assets/images/${currentPlayer}.png`
    cell.appendChild(img);
}
displayTurnNumber();

//game logic
function changeActivePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    displayCurrentPlayer();
};
function incrementTurnNumber(){
    turnNumber++;
    displayTurnNumber();
};
function handleCellClick(clickEvent){
    if(gameActive){
        const clickedCell = clickEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute("data-cell-index"));
        if(gameState[clickedCellIndex] !== "" || !gameActive){
            return;
        }
        handleCellPlayed(clickedCell, clickedCellIndex);
    }
}
function handleCellPlayed(clickedCell, clickedCellIndex){
    gameState[clickedCellIndex] = currentPlayer;
    fillCell(clickedCell);
    handleVictoryValidation();
}
function handleVictoryValidation(){
    let roundWon = false;
    for(let i = 0; i <= 7; i++){
        let victoryCondition = winningConditions[i];
        let firstCell  = gameState[victoryCondition[0]];
        let secondCell = gameState[victoryCondition[1]];
        let thirdCell  = gameState[victoryCondition[2]];
        if(firstCell === "" || secondCell === "" || thirdCell === ""){
            continue;
        }
        if(firstCell === secondCell && secondCell === thirdCell){
            roundWon = true;
            break;
        } 
    }
    if(roundWon){
        displayWinner();
        gameActive = false;
        return;
    }
    let roundDraw = !gameState.includes('');
    if(roundDraw){
        displayDraw();
        gameActive = false;
        return;
    }
    changeActivePlayer();
    incrementTurnNumber();
}
function restartGame(){
    document.querySelectorAll('.cell').forEach(cell =>
        cell.innerHTML = "");
    gameActive = true;
    currentPlayer = "X";
    turnNumber = 1;
    gameState = ["","","","","","","","","",""];
    displayTurnNumber();
    displayCurrentPlayer();
};