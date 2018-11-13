
var currentTurn = "red";
var turnDiv = document.querySelector('.turn');
var gameSize = init();
var map = [[]];
var availableCol = [];
timer();

function init() {
    let promptMessage = 'تعداد سطرها و ستون‌های جدول را به ترتیب وارد کرده و با فاصله از هم جدا کنید\nمثلا مقدار پیش‌فرض دارای 4 سطر و 5 ستون است';
    let promptDefault = '4 5';
    let prompt = this.prompt(promptMessage, promptDefault);
    if (prompt) {
        prompt = prompt.split(" ")
        prompt[0] = Number(prompt[0]);
        prompt[1] = Number(prompt[1]);
        return prompt;
    }
    return init()
}

function layoutBuilder(rows, cols, boardGame, arrows, arrowsSpace, rowsWidth, rowsHeight) {
    // arrows
    for (let i = 0; i < cols; i++) {
        let div = document.createElement('div');
        div.className = 'arrow';
        arrowsSpace += "1fr "
        arrows.appendChild(div);
    }

    for (let i = 0; i < rows; i++) {
        map[i] = []

        for (let j = 0; j < cols; j++) {
            let div = document.createElement('div');
            div.className = `block cell-${i}-${j}`;
            div.addEventListener("click", selected(j));
            boardGame.appendChild(div);
            map[i][j] = 0;
        }
    }
    // Layout
    for (let i = 0; i < rows; i++) {
        rowsHeight += `1fr `;
    }
    for (let j = 0; j < cols; j++) {
        rowsWidth += `1fr `;
        availableCol.push(j);
    }
    console.log(availableCol)

    arrows.style.gridRowGap = "5px";
    arrows.style.gridTemplateColumns = arrowsSpace;
    boardGame.style.gridRowGap = "5px";
    boardGame.style.gridColumnGap = "5px";
    boardGame.style.gridTemplateColumns = rowsWidth;
    boardGame.style.gridTemplateRows = rowsHeight;
    turnDiv.innerHTML = "نوبت قرمز"
}

function checkWinner(map, rows, cols){
    // console.log(map);
    // for (let i = rows - 1; i > -1 ; i--){
    //     for (let j = 0; j < cols - 3; j++){
    //         if (this.map[i][j] == this.map[i][j + 1] && this.map[i][j + 1] == this.map[i][j + 2] && this.map[i][j + 2] == this.map[i][j + 3]){
    //             alert(`user ${currentTurn} win the game!`)
    //         }
    //     }
    // }
    // for (let i = cols - 1; i > -1; i--){
    //     for (let j = 0; j < rows - 3; j++){
    //         if (map[i + 1][j] == map [i][j] && map[i + 1][j] == map[i + 2][j] && map[i + 2][j] == map[i + 3][j]){
    //             console.log(`user ${currentTurn} win the game!`)
    //         }
    //     }
    // }
    
}

function selected(j) {
    return function () {
        console.log(`You clicked on column ${j}`);
        // bead in the map :) 
        for (var i = gameSize[0] - 1; i > -1 ; i--){
            if (map[i][j] == 0){
                console.log(currentTurn)
                if (i == 0){
                    availableCol.splice(availableCol.indexOf(j), 1);
                }
                if (currentTurn == "red"){
                    map[i][j] = 1;
                    changeColor(i, j)
                    break;
                }
                else {
                    map[i][j] = -1;
                    changeColor(i, j)
                    break;
                }
            }
        }
        console.log(availableCol)
        // Check for the winner
        // change turn
        return changeTurn(currentTurn);
    }
}

function randomSelection(colNo) {
    randomNumber = availableCol[Math.floor(Math.random() * colNo)];
    return changeTurn(currentTurn) & selected(randomNumber)();
}

function changeTurn(turn) {
    clearInterval(this.timerID);
    this.secondCounter = 10;
    timer()
    if (turn == "red") {
        turnDiv.innerHTML = `نوبت آبی`
        this.currentTurn = "blue"
        return "blue";
    }
    turnDiv.innerHTML = 'نوبت قرمز'
    this.currentTurn = "red"
    return "red";
}

function timer() {
    this.secondCounter = 10;
    timeCounter = document.querySelector('.timer')
    this.timerID = setInterval(function () {
        this.secondCounter -= 1;
        timeCounter.innerHTML = `${secondCounter}`;
        if (this.secondCounter == 0) {
            // change turn
            currentTurn = changeTurn(currentTurn);
            // random selection
            return randomSelection(availableCol.length)
        }
    }, 1000)
}


function changeColor(i, j){
    var div = document.querySelector(`.cell-${i}-${j}`);
    console.log(div);
    div.style.backgroundColor = currentTurn;
    
    var style = document.querySelector('style');
    var keyframe = `\
        @keyframes animation-${i}-${j} {\
            0% {\
                top: 0%;\
                left: calc((${j} * 100)/${gameSize[1]})%
            }\
            100% {\
                top: calc((${i} * 100)/${gameSize[0]})%\
                left: calc((${j} * 100)/${gameSize[1]})%\
            }\
        }\
    \
    `
    style.innerHTML += keyframe;
    div.style.width =  div.offsetWidth +'px';
    div.style.height = div.offsetHeight+'px';
    div.style.animationName = `animation-${i}-${j}`;
    div.style.animationDuration = '2s';
    div.style.position = 'absolute';
    div.style.animationFillMode = 'forwards';
    return checkWinner(map, gameSize[0], gameSize[1]);
}

layoutBuilder(gameSize[0], gameSize[1], document.querySelector('.board'), document.querySelector('.arrows'), "", "", "")
