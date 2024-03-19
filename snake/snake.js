const GameBoard = document.getElementById('gameBoard');
const ScoreNo = document.getElementById('scoreval');
const context = GameBoard.getContext('2d');

const width = GameBoard.width;
const height = GameBoard.height;
const unit = 25;

let foodx;
let foody;
let xvelo = 25;
let yvelo = 0;
let score = 0;
let alive = true;
let start = false;


let snake = [
   {x:unit*3,y:0},
   {x:unit*2,y:0},
   {x:unit,y:0},
   {x:0,y:0}
]; 

window.addEventListener('keydown',keyPress);
startGame();

function startGame(){
  context.fillStyle = 'black';
  //color filling in rectangle(xStart,yStart,xwidth,ywidth)
  context.fillRect(0,0,width,height);
  createFood();
  displayFood();
  drawSnake();
  // drawSnake();
  // moveSnake();
  //nextTick();
}
function clearBoard(){
  context.fillStyle='black';
  context.fillRect(0,0,width,height);
}

function createFood(){
     foodx = Math.floor(Math.random()*width/unit)*unit;
     foody = Math.floor(Math.random()*height/unit)*unit;
}

function displayFood(){
    context.fillStyle = 'red';
    context.fillRect(foodx,foody,unit,unit)
}

function drawSnake(){
  context.fillStyle = 'darkgreen';
  context.strokeStyle = 'black';
  snake.forEach((snakePart)=>{
    context.fillRect(snakePart.x,snakePart.y,unit,unit);
    context.strokeRect(snakePart.x,snakePart.y,unit,unit);
  })
}

function moveSnake(){
    const head = {x:snake[0].x+xvelo,
                  y:snake[0].y+yvelo}
    snake.unshift(head)
    if(snake[0].x==foodx && snake[0].y==foody){
      score+=1;
      ScoreNo.textContent = score;
        createFood();
    }
    else{
       snake.pop()     
    }             
}

function nextTick(){
  if(alive){
     setTimeout(()=>{
        clearBoard();
        displayFood();
        moveSnake();
        drawSnake();
        gameOver();
        nextTick();
  },150);
  }else{
    clearBoard();
    context.font="bold 50px serif";
    context.fillStyle = "White";
    context.textAlign = "center";
    context.fillText("GAME OVER !!",width/2,height/2);
  }
}

function keyPress(event){
  if(!start){
    start = true;
    nextTick();
  }
     const Left = 37;
     const Up = 38;
     const Right = 39;
     const Down = 40;
     
     switch(true){
        case(event.keyCode==Left && xvelo!=unit ):
             xvelo=-unit;
             yvelo=0;
             break;

        case(event.keyCode==Right && xvelo != -unit):
              xvelo=unit;
              yvelo=0;
              break;

        case(event.keyCode==Up && yvelo!= unit):
              xvelo=0;
              yvelo=-unit;      
              break;

        case(event.keyCode==Down && yvelo != -unit):
              xvelo=0;
              yvelo=unit; 
              break;
     }

}

function gameOver(){
    switch(true){
      case(snake[0].x<0):
      case(snake[0].x>=width):
      case(snake[0].y<0):
      case(snake[0].y>=height):      
          alive=false;
          break;
    }
}