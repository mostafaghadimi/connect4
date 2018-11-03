function init() {
    let promptMessage = 'تعداد سطرها و ستون‌های جدول را به ترتیب وارد کرده و با فاصله از هم جدا کنید\nمثلا مقدار پیش‌فرض دارای 7 جدول و 6 ستون است';
    let promptDefault = '1 1';
    let prompt = this.prompt(promptMessage, promptDefault);
    if (prompt) {
        prompt = prompt.split(" ")
        prompt[0] = Number(prompt[0]);
        prompt[1] = Number(prompt[1]);
        return prompt;
    }
    return init()
}

function selected(j) {
    return function () {
        console.log(`You clicked on column ${j}`);
    }
}

var gameSize = init(),
    rows = gameSize[0],
    cols = gameSize[1],
    boardGame = document.querySelector('.board'),
    arrows = document.querySelector('.arrows'),
    arrowsSpace = "";
    rowsWidth = "",
    rowsHeight = "";

// arrows
for (let i = 0; i < rows; i++) {
    let div = document.createElement('div');
    div.className = 'arrow';
    arrowsSpace += "1fr "
    arrows.appendChild(div);
}


for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        let div = document.createElement('div');
        div.className = `block cell-${i}-${j}`;
        div.addEventListener("click", selected(j));
        boardGame.appendChild(div);
    }
}

// Layout

for (let i = 0; i < rows; i++) {
    rowsHeight += `1fr `;
}
for (let j = 0; j < cols; j++) {
    rowsWidth += `1fr `;
}

arrows.style.gridRowGap = "5px";
arrows.style.gridTemplateColumns = arrowsSpace;
boardGame.style.gridRowGap = "5px";
boardGame.style.gridColumnGap = "5px";
boardGame.style.gridTemplateColumns = rowsWidth;
boardGame.style.gridTemplateRows = rowsHeight;


// function timer() {
//     var timeleft = 10;
//     var turnTimer = setInterval(function () {
//         document.getElementById("progressBar").value = 10 - --timeleft;
//         if (timeleft <= 0)
//             clearInterval(turnTimer);
//     }, 1000);
// }

// timer();