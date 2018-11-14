
var currentTurn = "red",
    turnDiv = document.querySelector('.turn'),
    gameSize = init(),
    map = [[]],
    availableCol = [],
    step = 1;

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
            div.style.boxShadow = 'inset 0 0 10px #aaaaaa';
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
    arrows.style.gridRowGap = "5px";
    arrows.style.gridTemplateColumns = arrowsSpace;
    boardGame.style.gridRowGap = "5px";
    boardGame.style.gridColumnGap = "5px";
    boardGame.style.gridTemplateColumns = rowsWidth;
    boardGame.style.gridTemplateRows = rowsHeight;
    turnDiv.innerHTML = "نوبت قرمز"
}

function clearBoard () {
    for(var i = 0; i < this.gameSize[0]; i++){
        for(var j = 0; j < this.gameSize[1]; j++){
            map[i][j] = 0;
            document.querySelector(`.cell-${i}-${j}`).style.backgroundColor = "";
        }
    }
    for (let i = 0; i < gameSize[1]; i++){
        availableCol[i] = i;
    }

}

function checkWinner(){
    var rows = this.gameSize[0];
    var cols = this.gameSize[1];
    var gameMap = this.map;
    for (let i = rows - 1; i > -1 ; i--){
        for (let j = 0; j < cols - 3; j++){
            if (gameMap[i][j] != 0 && gameMap[i][j] == gameMap[i][j + 1] && gameMap[i][j + 1] == gameMap[i][j + 2] && gameMap[i][j + 2] == gameMap[i][j + 3]){
                document.querySelector(`.cell-${i}-${j}`).style.backgroundColor = '#ffc000'
                document.querySelector(`.cell-${i}-${j + 1}`).style.backgroundColor = '#ffc000'
                document.querySelector(`.cell-${i}-${j + 2}`).style.backgroundColor = '#ffc000'
                document.querySelector(`.cell-${i}-${j + 3}`).style.backgroundColor = '#ffc000';
                setTimeout(() => {
                    alert(`user ${changeTurn(currentTurn)} win the game!`);
                    clearBoard()
                }, 1000)
                break;
            }
        }
    }
    
    for (let i = rows - 4; i > -1; i--){
        for (let j = 0; j < cols; j++){
            if (gameMap[i][j] != 0 && gameMap[i + 1][j] == gameMap[i][j] && gameMap[i + 1][j] == gameMap[i + 2][j] && gameMap[i + 2][j] == gameMap[i + 3][j]){
                document.querySelector(`.cell-${i}-${j}`).style.backgroundColor = '#ffc000';
                document.querySelector(`.cell-${i + 1}-${j}`).style.backgroundColor = '#ffc000';
                document.querySelector(`.cell-${i + 2}-${j}`).style.backgroundColor = '#ffc000';
                document.querySelector(`.cell-${i + 3}-${j}`).style.backgroundColor = '#ffc000';
                setTimeout(() => {
                    alert(`user ${changeTurn(currentTurn)} win the game!`);
                    clearBoard();
                }, 1000)
                break;
            }
        }
    }

    for (let i = rows - 4; i > -1; i--) {
        for (let j = cols - 4; j > -1; j--) {
            if (gameMap[i][j] != 0 && gameMap[i][j]  == gameMap[i + 1][j + 1] && gameMap[i + 1][j + 1] == gameMap[i + 2][j + 2] && gameMap[i + 2][j + 2] == gameMap[i + 3][j + 3]){ 
                document.querySelector(`.cell-${i}-${j}`).style.backgroundColor = '#ffc000';
                document.querySelector(`.cell-${i + 1}-${j + 1}`).style.backgroundColor = '#ffc000';
                document.querySelector(`.cell-${i + 2}-${j + 2}`).style.backgroundColor = '#ffc000';
                document.querySelector(`.cell-${i + 3}-${j + 3}`).style.backgroundColor = '#ffc000';
                setTimeout(() => {
                    alert(`user ${changeTurn(currentTurn)} win the game!`);
                    clearBoard();
                }, 1000)
                break;
            }   
        }
    }

    for (let i = rows - 1; i > 2; i--) {
        for (let j = cols - 4; j > -1; j--) {
            if (gameMap[i][j] != 0 && gameMap[i][j]  == gameMap[i - 1][j + 1] && gameMap[i - 1][j + 1] == gameMap[i - 2][j + 2] && gameMap[i - 2][j + 2] == gameMap[i - 3][j + 3]){
                document.querySelector(`.cell-${i}-${j}`).style.backgroundColor = '#ffc000';
                document.querySelector(`.cell-${i - 1}-${j + 1}`).style.backgroundColor = '#ffc000';
                document.querySelector(`.cell-${i - 2}-${j + 2}`).style.backgroundColor = '#ffc000';
                document.querySelector(`.cell-${i - 3}-${j + 3}`).style.backgroundColor = '#ffc000';
                setTimeout(() => {
                    alert(`user ${changeTurn(currentTurn)} win the game!`);
                    clearBoard();
                }, 1000)
                break;
            }   
        }
    }
}

function selected(j) {
    return function () {
        var flag = false;
        // bead in the map :) 
        if (map[0][j] != 0) {
            
            return alert('این ستون پر شده است!'); 
        }
        for (var i = gameSize[0] - 1; i > -1 ; i--){
            if (map[i][j] == 0){
                if (i == 0){
                    flag = true;
                    availableCol.splice(availableCol.indexOf(j), 1);
                }
                if (currentTurn == "red"){

                    map[i][j] = 1;
                    changeColor(i, j);
                    break;
                }
                else {
                    map[i][j] = -1;
                    changeColor(i, j)
                    break;
                }
            }
        }
        
        var isNotFinished = false;
        for (let i = 0; i < gameSize[0]; i++){
            for(let j = 0; j < gameSize[1]; j++){
                if (map[i][j] == 0){
                    isNotFinished = true
                }
            }
        }
        if (!isNotFinished) {
            setTimeout(() => {
                alert('بازی مساوی تمام شد!')
                clearBoard()
            }, 10)
                return changeColor(i, j)  ;
        }
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
    var newDiv = document.createElement('div');
    div.style.backgroundColor = currentTurn;
    
    var style = document.querySelector('style');
    var keyframe = `\
        @keyframes animation-${i}-${j} {\
            from {\
                transform: translateY(0)\
            },\
            to {\
                transform: translateY(500px)\
            }\
        }\
    \
    `
    // style.innerHTML += keyframe;
    // newDiv.style.width =  div.offsetWidth +'px';
    // newDiv.style.height = div.offsetHeight+'px';
    // newDiv.style.animationName = `animation-${i}-${j}`;
    // newDiv.style.animationDuration = '2s';
    // newDiv.style.animationFillMode = 'forwards';
    // newDiv.style.zIndex = 200;

    var board = document.querySelector('.board');
    // board.appendChild(newDiv);
    return checkWinner(map, gameSize[0], gameSize[1]);
}

layoutBuilder(gameSize[0], gameSize[1], document.querySelector('.board'), document.querySelector('.arrows'), "", "", "")