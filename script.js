/*
  
  spaceCraft
  developed by: E_GRAY0E
  special dedication to M|E|G!
 
*/

const craftScreen = document.getElementById("screen");
const keypad = document.getElementById("keypad");
const uprCs = document.getElementById("^");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const shipW = 50; 
const shipH = 50; 
let playerName = '';
let score = 0;
const scoreboard = document.createElement("h1");
  scoreboard.setAttribute("id", "scoreboard");
  scoreboard.textContent = `spaceCraft Driver: ${playerName} Score: ${score}`;

let numOfEntr = 0;
let shift = false;
let startG = false;
let reset = 0;
let ship = new Image();
ship.src = "ships/ship2.png";
ship.onload = drawShip;

let asteroid = new Image();
asteroid.src = "asteroids/asteroid.png";


let x = 200;
let y = 200;
let ya = 0;
let ranx = Math.floor(Math.random()*canvas.width + 100);
let collisionQ = false;

const getLetter = e => {
  const letter = e.target.id;
  let currentScreen = craftScreen.textContent;
  if(letter != "screen" && letter != "keypad" && letter != "<" && letter != "^"){ 
     shift == false ? craftScreen.textContent = currentScreen + letter :
    craftScreen.textContent = currentScreen + letter.toUpperCase(); 
  }else if(letter == "<"){
    let rmvLast = currentScreen.toString().slice(0, -1);
    craftScreen.textContent = rmvLast;
  }else if(letter == "^" && shift == false){
    uprCs.style.backgroundColor = "purple";
    shift = true;
  }else if(letter == "^" && shift == true){
    uprCs.style.backgroundColor = "darkblue";
    shift = false;
    }
};

function moveUp(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    y -= 1
    if(y > -50){
      ctx.drawImage(ship, x, y, shipW, shipH);
      drawAsteroids();
      detectCollision();
      collisionQ == false ?
      requestAnimationFrame(moveUp) : cancelAnimationFrame(moveUp);
     }else{
     y = -50; 
      ctx.drawImage(ship, x, y, shipW, shipH);
      requestAnimationFrame(moveDown);
      drawAsteroids();
      detectCollision();
      collisionQ == false ?
      requestAnimationFrame(moveUp) : cancelAnimationFrame(moveUp);
  
   };
};

function moveLeft(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    x -= 1
  if(x > -50){
      ctx.drawImage(ship, x, y, shipW, shipH);
      drawAsteroids();
      detectCollision();
      collisionQ == false ?
      requestAnimationFrame(moveLeft) : cancelAnimationFrame(moveLeft);
  
    }else{
     x = -50;
     ctx.drawImage(ship, x, y, shipW, shipH);
      drawAsteroids();
     requestAnimationFrame(moveRight);
     detectCollision();
      collisionQ == false ?
      requestAnimationFrame(moveLeft) : cancelAnimationFrame(moveLeft);
  };
};

function moveDown(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    y += 1
  if(y < canvas.height){
      ctx.drawImage(ship, x, y, shipW, shipH);
      drawAsteroids();
      detectCollision();
      collisionQ == false ? 
      requestAnimationFrame(moveDown): cancelAnimationFrame(moveDown);
 }else{
    y = canvas.height;
      ctx.drawImage(ship, x, y, shipW, shipH);
      drawAsteroids();
      detectCollision();
      collisionQ == false ? 
      requestAnimationFrame(moveDown): cancelAnimationFrame(moveDown);
     };
};

function moveRight(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    x += 1
  if(x < canvas.width){
      ctx.drawImage(ship, x, y, shipW, shipH);
      drawAsteroids();
      detectCollision();
      collisionQ == false ? 
      requestAnimationFrame(moveRight) : cancelAnimationFrame(moveRight);
    }else{
    x = canvas.width;
      ctx.drawImage(ship, x, y, shipW, shipH);
      drawAsteroids();
      detectCollision();
      collisionQ == false ? 
      requestAnimationFrame(moveRight) : cancelAnimationFrame(moveRight);
 };
};

function drawShip(){
    
    const topBtn = document.getElementById("top-btn");
    const leftBtn = document.getElementById("left-btn");
    const downBtn = document.getElementById("down-btn");
    const rightBtn = document.getElementById("right-btn");
    
    ctx.drawImage(ship, x, y, shipW, shipH);
    ctx.drawImage(asteroid, ranx, ya, 100, 80);
    
    topBtn.addEventListener( "click",
    () => { 
      moveUp() 
   } 
 );

    leftBtn.addEventListener( "click",
    () => { 
      moveLeft() 
   } 
 );

    downBtn.addEventListener( "click",
    () => { 
      moveDown() 
   } 
 );

    rightBtn.addEventListener( "click",
    () => { 
      moveRight() 
   } 
 );
};

function drawAsteroids(){
  ya += 1;
  if(ya < canvas.height){
    ctx.drawImage(asteroid, ranx, ya, 100, 80);
   }else{
   ya = 0;
   ranx = Math.floor( Math.random() * canvas.width + 100)
  };
};

function detectCollision(){

if(startG == true){
 let shipXRight = x + 50;
 let asteroidXRight = ranx + 100;
 let shipYBottom = y + 50;
 let asteroidYBottom = ya + 80; 
 let overlapX = (x <= asteroidXRight && x >= ranx) || (shipXRight <= asteroidXRight && shipXRight >= ranx);
 let overlapY = (y <= asteroidYBottom && y >= ya) || (shipYBottom <= asteroidYBottom && shipYBottom >= ya); 
 let collision = overlapX && overlapY;
  
  if(collision){
     window.cancelAnimationFrame(moveUp);
     window.cancelAnimationFrame(moveLeft);
     window.cancelAnimationFrame(moveDown);
     window.cancelAnimationFrame(moveRight);
     window.cancelAnimationFrame(drawAsteroids);
     collisionQ = true;
     reset +=1 ;
     ctx.clearRect(0,0,canvas.width, canvas.height);
     ctx.font = "2em monospace";
     ctx.fillStyle = "lightgreen"; 
     ctx.fillText('Collision Detected!', canvas.width/2, canvas.height/2);
     const restart = document.createElement("button");
     restart.setAttribute("id", "restart");
     const restartTxt = document.createTextNode("Restart");
     if(reset == 1){
     restart.appendChild(restartTxt)
     restart.onclick = startGame
     display.appendChild(restart)
     score = 0
     x = 200
     y = 200
     ya = 0 }else{ detectCollision();};
     
    }else if(ya == canvas.height - 80) {
     collisionQ = false;
      score += 100;
  scoreboard.textContent = `spaceCraft Driver: ${playerName} Score: ${score}`;
  console.log(score);
    };
  };
};
 
function startGame(){
  startG = true;
  playerName = craftScreen.textContent;
    let display = document.getElementById("display");
  while(display.firstChild){
    display.removeChild(display.firstChild)};
    collisionQ = false;
    reset = 0;
    score = 0;
  scoreboard.textContent = `spaceCraft Driver: ${playerName} Score: ${score}`;
    
/*
  let img1 = document.getElementById("img1");  
  let img2 = document.getElementById("img2");  
  let img3 = document.getElementById("img3");  
  let img4 = document.getElementById("img4");  
  let startt = document.getElementById("start");    
  let abort = document.getElementById("abort");  
  
  display.removeChild(img1);  
  display.removeChild(img2);  
  display.removeChild(img3);  
  display.removeChild(img4);  
  display.removeChild(keypad);
  display.removeChild(startt);
  display.removeChild(abort);  
*/
  //playerName + score
  scoreboard.style.display = "initial";
  display.appendChild(scoreboard);
  //canvas set-up
  document.createElement("canvas");
  canvas.setAttribute("id", "canvas");
  canvas.setAttribute("width", "1000");
  canvas.setAttribute("height", "500");
  display.appendChild(canvas);
  display.style.display = "flex";
  display.style.flexDirection = "column";
  display.style.justifyContent = "center";
  display.style.alignItems = "center";
  canvas.style.backgroundColor = "black";
  canvas.style.display = "flex";
  //btn set-up
  let divOne = document.createElement("div");
  divOne.setAttribute("id", "contain-top");
  let divTwo = document.createElement("div");
  divTwo.setAttribute("id", "contain-bottom");
  let divThree = document.createElement("div");
  divThree.setAttribute("id", "top-btn");
  let divFour = document.createElement("div");
  divFour.setAttribute("id", "left-btn");
  let divFive = document.createElement("div");
  divFive.setAttribute("id", "down-btn");
  let divSix = document.createElement("div");
  divSix.setAttribute("id", "right-btn");
  let divSeven = document.createElement("div");
  divSeven.setAttribute("id", "changeship");
  let divEight = document.createElement("div");
  divEight.setAttribute("id", "wormhole"); 

  let divThreeTxt = document.createTextNode("^^");
  divThree.appendChild(divThreeTxt);
  let divFourTxt = document.createTextNode("<<");
  divFour.appendChild(divFourTxt);
  let divFiveTxt = document.createTextNode("VV");
  divFive.appendChild(divFiveTxt);
  let divSixTxt = document.createTextNode(">>");
  divSix.appendChild(divSixTxt);
  let divSevenTxt = document.createTextNode("X");
  divSeven.appendChild(divSevenTxt);
  let divEightTxt = document.createTextNode("Y");
  divEight.appendChild(divEightTxt);

  divOne.style.display = "flex";
  divOne.style.justifyContent = "center";
  divTwo.style.display = "flex";
  divTwo.style.justifyContent = "center";

  divThree.style.display = "flex";
  divThree.style.justifyContent = "center";
  divFour.style.display = "flex";
  divFour.style.justifyContent = "center";
  divFive.style.display = "flex";
  divFive.style.justifyContent = "center";
  divSix.style.display = "flex";
  divSix.style.justifyContent = "center";
  
  divSeven.style.display = "flex";
  divSeven.style.justifyContent = "center";
  divSeven.onclick = changeship;
  divEight.style.display = "flex";
  divEight.style.justifyContent = "center";
  divEight.onclick = wormhole;

  display.appendChild(divOne);
  display.appendChild(divTwo);
  divOne.appendChild(divThree);
  divTwo.appendChild(divFour);
  divTwo.appendChild(divFive);
  divTwo.appendChild(divSix);

  display.appendChild(divSeven);
  display.appendChild(divEight);

  drawShip();
  drawAsteroids();
};


function start(){
  //avoid numerous false starts:
  numOfEntr += 1

  if(numOfEntr == 1){
  
  
    setTimeout(()=>{craftScreen.textContent = ""}, 500);
    setTimeout(()=>{craftScreen.textContent = "Initiating Start-Up..."}, 1500);
    setTimeout(()=>{craftScreen.textContent = "10..."}, 3000); 
    setTimeout(()=>{craftScreen.textContent = "9..."}, 4000); 
    setTimeout(()=>{craftScreen.textContent = "8..."}, 5000); 
    setTimeout(()=>{craftScreen.textContent = "7..."}, 6000); 
    setTimeout(()=>{craftScreen.textContent = "6..."}, 7000); 
    setTimeout(()=>{craftScreen.textContent = "5..."}, 8000); 
    setTimeout(()=>{craftScreen.textContent = "4..."}, 9000); 
    setTimeout(()=>{craftScreen.textContent = "3..."}, 10000); 
    setTimeout(()=>{craftScreen.textContent = "2..."}, 11000); 
    setTimeout(()=>{craftScreen.textContent = "1..."}, 12000); 
    setTimeout(()=>{craftScreen.textContent = "Enter your name, and press enter"}, 13000); 
    setTimeout(()=>{craftScreen.textContent = ""}, 15000);
    document.addEventListener('keypress', function(e){
    if(e.key === "Enter"){ 
      playerName = craftScreen.textContent; 
      startGame();
    }
   });
  };
};

function abort(){
 startGame() ;
};






keypad.addEventListener('click', getLetter);

function changeship(){
 shipno = Math.floor(Math.random()*7);
 ship.src = `ships/ship${shipno}.png`;
 ctx.drawImage(ship, x, y, shipW, shipH);
};

function wormhole(){
 x = Math.floor(Math.random()*canvas.width);
 ctx.drawImage(ship, x, y, shipW, shipH);
};

