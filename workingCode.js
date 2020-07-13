let order = [];
let playerOrder = [];
let flash = 0;
let turn = 1;
let strict;
let win;
let on;
let compTurn;
let intervalId;
let good;

const turnCounter = document.querySelector("#turn");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const startButton = document.querySelector("#start");
const onButton = document.querySelector("#on");
const audio1 = document.querySelector("#clip1");
const audio2 = document.querySelector("#clip2");
const audio3 = document.querySelector("#clip3");
const audio4 = document.querySelector("#clip4");

strictButton.addEventListener('change', (event) => {
    if(strictButton.checked)
        strict = true;
    else 
        strict =false;
});

onButton.addEventListener('change', (event) => {
    if(onButton.checked) {
        on = true;
        win = false;
        turn = 1;
        turnCounter.innerHTML = "-";        
    }
    else {
        on = false;
        turnCounter.innerHTML = "";
        clearInterval(intervalId);
        clearColor();        
    }
});

startButton.addEventListener('click', (event) => {    
    if(on) {
        if(strict || win)
            turn = 1;        
        clearColor();
        play();        
    }
});

function clearColor() {
    topLeft.style.backgroundColor = "darkgreen";
    topRight.style.backgroundColor = "darkred";
    bottomLeft.style.backgroundColor = "goldenrod";
    bottomRight.style.backgroundColor = "darkblue";
}

function flashColor() {
    topLeft.style.backgroundColor = "lightgreen";
    topRight.style.backgroundColor = "tomato";
    bottomLeft.style.backgroundColor = "yellow";
    bottomRight.style.backgroundColor = "lightskyblue";
}

function play() {
    win = false;
    order = [];
    playerOrder = [];    
    flash = 0;
    compTurn = true;       
    setTimeout(() => {        
    }, 500);
    for(let i = 0; i < 20 ; i++) {
        order.push(Math.floor(Math.random() * 4) + 1);
    }    
    intervalId = setInterval(gameTurn, 800); 
}

function gameTurn() {    
    turnCounter.innerHTML = turn;    
    if(flash == turn) {
        compTurn = false;        
        clearInterval(intervalId);        
    }
    else {
        if(order[flash] == 1) one();
        if(order[flash] == 2) two();
        if(order[flash] == 3) three();
        if(order[flash] == 4) four();
        flash++;
    }    
}

function one() {        
    audio1.play();
    topLeft.style.backgroundColor = "lightgreen";
    setTimeout(() => {
        clearColor();
    }, 200);
}

function two() {        
    audio2.play();
    topRight.style.backgroundColor = "tomato";
    setTimeout(() => {
        clearColor();
    }, 200);
}

function three() {    
    audio3.play();
    bottomLeft.style.backgroundColor = "lightgreen";
    setTimeout(() => {
        clearColor();
    }, 200);
}

function four() {    
    audio4.play();
    bottomRight.style.backgroundColor = "lightskyblue";
    setTimeout(() => {
        clearColor();
    }, 200);
}

topLeft.addEventListener('click', (event) => {
    if(compTurn == false) {
        playerOrder.push(1);
        one();
        check();
    }
});

topRight.addEventListener('click', (event) => {
    if(compTurn == false) {
        playerOrder.push(2);
        two();
        check();
    }
});

bottomLeft.addEventListener('click', (event) => {
    if(compTurn == false) {
        playerOrder.push(3);
        three();
        check();
    }
});

bottomRight.addEventListener('click', (event) => {
    if(compTurn == false) {
        playerOrder.push(4);
        four();
        check();
    }
});

function check() {
    if(playerOrder[playerOrder.length - 1] != order[playerOrder.length - 1]) {
        turnCounter.innerHTML = "NO!";
        clearInterval(intervalId);                
    }
    else if(playerOrder[playerOrder.length - 1] == order[playerOrder.length - 1] && turn == 5 && playerOrder.length == turn) {
        winGame();
    }
    else if(playerOrder[playerOrder.length - 1] == order[playerOrder.length - 1] && playerOrder.length == turn) {
        compTurn = true;        
        turn++;
        flash = 0; 
        play();
    }    
}

function winGame() {
    win = true;
    setTimeout(() => {
        flashColor();
        turnCounter.innerHTML = "WIN!";    
        compTurn = true;
    }, 400);    
    
}