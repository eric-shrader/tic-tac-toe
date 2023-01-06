let playerSymbol;
let AISymbol;
let dataCells = 9;
const dataCellsArray = new Array(dataCells);
let winConditionMet = false;
let drawConditionMet = false;
let loseConditionMet = false;
firstMove = true;

function IterateDataCells(funct) {
    for (let i = 0; i < dataCells; i++) {
        dataCellsArray[i] = document.getElementById(i);
        funct(dataCellsArray[i]);
    }
}

function addEventListeners(dataCell) {
    dataCell.addEventListener("click", playMove);
}

function removeEventListeners(dataCell) {
    dataCell.removeEventListener("click", playMove);
}

function playMove(evt) {
    if (firstMove == true) {
    assignSymbols();
    }
    const cell = evt.currentTarget;
    cell.innerHTML = playerSymbol;
    removeEventListeners(cell);
    checkWinCondition();
    if (winConditionMet == false) {
        checkDrawCondition();
    }
    if (winConditionMet == false && drawConditionMet == false) {
    playAIMove();
    checkLoseCondition();
    }
}

function checkWinCondition() {
    IterateDataCells(evaluateCell, winConditionMet, playerSymbol);
    if (winConditionMet == true) {
        console.log("You Win!");
        endGame("You Win!");
    }
}

function evaluateCell(dataCell) {
    let id = dataCell.getAttribute("id");
    id = parseInt(id);
    if (id == 4) {
        CompareNeighbors(id, 1); //horizontal
        CompareNeighbors(id, 3); //vertical
        CompareNeighbors(id, 2); //diagnol
        CompareNeighbors(id, 4); //diagnol
    }
    if (id == 3 || id == 5) {
        CompareNeighbors(id, 3); //vertical
    }
    if (id == 1 || id == 7) {
        CompareNeighbors(id, 1); //horizontal
    }
}

function CompareNeighbors(id, difference) {
    if (dataCellsArray[id-difference].innerHTML == playerSymbol && dataCellsArray[id+difference].innerHTML == playerSymbol && dataCellsArray[id].innerHTML == playerSymbol) {
        winConditionMet = true;
        return true;
    }
}

function endGame(gameResult) {
    IterateDataCells(removeEventListeners);
    statusBox = document.getElementById("statusBox");
    statusBox.innerHTML = gameResult;
}

function playAIMove() {
    const cellsLeft = new Array();
    function fillCellsLeftArray(cell) {
        if (cell.innerHTML !== "X" && cell.innerHTML !== "O") {
            cellsLeft.push(cell);
        }
    }
    IterateDataCells(fillCellsLeftArray);
    AIsCell = cellsLeft[Math.floor(Math.random()*cellsLeft.length)];
    AIsCell.innerHTML = AISymbol;
    removeEventListeners(AIsCell);
}

function checkDrawCondition() {
    const emptyCells = new Array();
    function checkIfCellsOurFilled(cell) {
        if (cell.innerHTML !== "X" && cell.innerHTML !== "O") {
            emptyCells.push(cell);
        }
    }
    IterateDataCells(checkIfCellsOurFilled);
    if (emptyCells.length == 0) {
        drawConditionMet = true;
        endGame("Its a Draw!");
    }
}

function checkLoseCondition() {
    IterateDataCells(evaluateCellForLosing);
    if (loseConditionMet == true) {
        endGame("You Lose!");
    }
}

function evaluateCellForLosing(dataCell) {
    let id = dataCell.getAttribute("id");
    id = parseInt(id);
    if (id == 4) {
        CompareNeighborsForLosing(id, 1); //horizontal
        CompareNeighborsForLosing(id, 3); //vertical
        CompareNeighborsForLosing(id, 2); //diagnol
        CompareNeighborsForLosing(id, 4); //diagnol
    }
    if (id == 3 || id == 5) {
        CompareNeighborsForLosing(id, 3); //vertical
    }
    if (id == 1 || id == 7) {
        CompareNeighborsForLosing(id, 1); //horizontal
    }
}

function CompareNeighborsForLosing(id, difference) {
    if (dataCellsArray[id-difference].innerHTML == AISymbol && dataCellsArray[id+difference].innerHTML == AISymbol && dataCellsArray[id].innerHTML == AISymbol) {
        loseConditionMet = true;
        return true;
    }
}

function assignSymbols() {
    const selectSymbol = document.getElementById("selectSymbol");
    if (document.getElementById("X").checked == true) {
        playerSymbol = "X";
        AISymbol = "O";
    }
    else {
        playerSymbol = "O";
        AISymbol = "X";
    }
    selectSymbol.innerHTML = "";
    firstMove = false;
}

IterateDataCells(addEventListeners);