/*
var planet = prompt("What planet do you want to check your weight on?");
document.getElementById("planets").innerHTML =  planet;
*/
// https://www.quirksmode.org/js/events_advanced.html
// https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Move_the_ball
let alive = true;


const canvas = document.getElementById("MyCanvas");
const ctx = canvas.getContext("2d");
//NEEDED TO LET KEYBOARD GRAB INPUT
canvas.setAttribute("tabindex", 0);
ctx.clearRect(0, 0, canvas.width, canvas.height);

var x = 0;
var y = 0;
var dx = 0;
var dy = 0;
let eaten = false;
let grown = 0;



function xFood() {
    return (Math.floor(Math.random() * canvas.width));
}
function yFood() {
    return (Math.floor(Math.random() * canvas.height));
}
console.log(xFood(), yFood());

function snake() {
    ctx.beginPath();
    ctx.fillRect(x, y, 10, 10)
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}
setInterval(snake, 5);

function food() {
    
    ctx.beginPath();
    ctx.fillRect(xFood(), yFood(), 15, 15);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
    eaten = false;
}

function printSnake() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake();

    if (x > canvas.width - 10) {
       alive = false;
    }
    if (x < 0){
       alive = false;
    }
    if (y > canvas.height - 10) {
        alive = false;
    }
    if (y < 0){
       alive = false;
    }
}

canvas.addEventListener("keydown", (e) => {
    if (e.isComposing || e.key === 229) {
        return;
    } console.log(e.key);

    if (e.key === "ArrowLeft"){
        printSnake();
        dx = -10;
        dy = 0;
        x = x-dx;
    }
    if (e.key === "ArrowRight"){
        printSnake();
        dx = 10;
        dy = 0;
        x = x+dx;
    }
    if (e.key === "ArrowUp"){
        printSnake();
        dy = -10;
        dx = 0;
        y = y-dy;
    }
    if (e.key === "ArrowDown"){
        printSnake();
        dy = 10;
        dx = 0;
        y=y+dy;
    }
});

food();
function tick() {
    console.log(x, y);
    if (alive == true){
    printSnake();
    x=x+dx;
    y=y+dy;
    if (((x+10 == xFood) && (y+10 == yFood)) || (x == xFood) && (y+10 == yFood) ){
        eaten = true;
        grown = grown + 1;
        food();
    }
} else{
    alive = true;
    x = 0;
    y = 0;
    dx = 0;
    dy = 0;
    alert ("GG");
}

}
setInterval(tick, 30);
