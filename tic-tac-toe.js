let dataCells = 9;
const dataCellsArray = new Array(dataCells);
firstMove = true;
drawConditionMet = false;

 class WinCondition {
    constructor(statement) {
        this.statement = statement
    }
    winConditionMet = false;
    symbol;

    evaluateCell(dataCell) {
        let id = dataCell.getAttribute("id");
        id = parseInt(id);
        if (id == 4) {
            this.compareNeighbors(id, 1); //horizontal
            this.compareNeighbors(id, 3); //vertical
            this.compareNeighbors(id, 2); //diagnol
            this.compareNeighbors(id, 4); //diagnol
        }
        if (id == 3 || id == 5) {
            this.compareNeighbors(id, 3); //vertical
        }
        if (id == 1 || id == 7) {
            this.compareNeighbors(id, 1); //horizontal
        }
    }

    compareNeighbors(id, difference) {
        if (dataCellsArray[id-difference].innerHTML == this.symbol && dataCellsArray[id+difference].innerHTML == this.symbol && dataCellsArray[id].innerHTML == this.symbol) {
            this.winConditionMet = true;
            return true;
        }
    }
    checkWinCondition() {
        IterateDataCells(this.evaluateCell.bind(this));
        if (this.winConditionMet == true) {
            endGame(this.statement);
        }
    }
 }


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
    cell.innerHTML = player.symbol;
    removeEventListeners(cell);
    player.checkWinCondition();
    if (player.winConditionMet == false) {
        checkDrawCondition();
    }
    if (player.winConditionMet == false && drawConditionMet == false) {
    playEasyAIMove();
    AI.checkWinCondition();
    }
}

function endGame(gameResult) {
    IterateDataCells(removeEventListeners);
    statusBox = document.getElementById("statusBox");
    statusBox.innerHTML = gameResult;
}

function playEasyAIMove() {
    const cellsLeft = new Array();
    // function fills cellsLeft array with cells left on board that have yet been filled
    function fillCellsLeftArray(cell) {
        if (cell.innerHTML !== "X" && cell.innerHTML !== "O") {
            cellsLeft.push(cell);
        }
    }
    IterateDataCells(fillCellsLeftArray);
    const AIsCell = cellsLeft[Math.floor(Math.random()*cellsLeft.length)];
    AIsCell.innerHTML = AI.symbol;
    removeEventListeners(AIsCell);
}

function checkDrawCondition() {
    const emptyCells = new Array();
    // function checks if the bored has been filled
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

function assignSymbols() {
    const selectSymbol = document.getElementById("selectSymbol");
    if (document.getElementById("X").checked == true) {
        player.symbol = "X";
        AI.symbol = "O";
    }
    else {
        player.symbol = "O";
        AI.symbol = "X";
    }
    selectSymbol.innerHTML = "";
    firstMove = false;
}

player = new WinCondition("You Win!");
AI = new WinCondition("You Lose!");

IterateDataCells(addEventListeners);