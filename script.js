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

let shift = false;
let playerName = '';
let ship = new Image();
ship.src = "ships/ship2.png";
ship.onload = drawShip;

let x = 200;
let y = 200;



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
   
  setTimeout(()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    }, 25);
  y -= 1
  if(y > -50){
  setTimeout(()=>{
    ctx.drawImage(ship, x, y, shipW, shipH);
    moveUp();
    },25);
  }else{
   setTimeout(()=>{
   y = -50; 
    ctx.drawImage(ship, x, y, shipW, shipH);
    moveDown();
    }, 25);
  };
};

function moveLeft(){

   setTimeout(()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    }, 25);
  x -= 1
  if(x > -50){
    setTimeout(()=>{
    ctx.drawImage(ship, x, y, shipW, shipH);
    moveLeft();
    }, 25);
  }else{
    setTimeout(()=>{
    x = -50;
    ctx.drawImage(ship, x, y, shipW, shipH);
    moveRight();
    }, 25);
  };
 };

function moveDown(){
   setTimeout(()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    }, 25);
  y += 1
  if(y < canvas.height){
    setTimeout(()=>{
    ctx.drawImage(ship, x, y, shipW, shipH);
    moveDown();
    }, 25);
  }else{
    setTimeout(()=>{
    y = canvas.height;
    ctx.drawImage(ship, x, y, shipW, shipH);
    moveUp();
    }, 25);
  };
 };

function moveRight(){
   setTimeout(()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    }, 25);
  x += 1
  if(x < canvas.width){
    setTimeout(()=>{
    ctx.drawImage(ship, x, y, shipW, shipH);
    moveRight();
    }, 25);
  }else{
    setTimeout(()=>{
    x = canvas.width;
    ctx.drawImage(ship, x, y, shipW, shipH);
    moveLeft();
    }, 25);
  };
 };








function drawShip(){
    
    const topBtn = document.getElementById("top-btn");
    const leftBtn = document.getElementById("left-btn");
    const downBtn = document.getElementById("down-btn");
    const rightBtn = document.getElementById("right-btn");
    
    ctx.drawImage(ship, x, y, shipW, shipH);

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

function startGame(){
  playerName = craftScreen.textContent;
  console.log(playerName);
  let display = document.getElementById("display");
  while(display.firstChild){
    display.removeChild(display.firstChild)};
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
  divSeven.setAttribute("id", "blaster");
  let divEight = document.createElement("div");
  divEight.setAttribute("id", "shield"); 

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

  divEight.style.display = "flex";
  divEight.style.justifyContent = "center";

  display.appendChild(divOne);
  display.appendChild(divTwo);
  divOne.appendChild(divThree);
  divTwo.appendChild(divFour);
  divTwo.appendChild(divFive);
  divTwo.appendChild(divSix);

  display.appendChild(divSeven);
  display.appendChild(divEight);

  drawShip();

};


function start(){
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
  startGame();
  }
 });
};

function abort(){
 startGame() ;
};






keypad.addEventListener('click', getLetter);



