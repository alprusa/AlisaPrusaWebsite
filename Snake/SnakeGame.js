// Making the room
var canvas=document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = document.getElementById("canvas").width;
var height = document.getElementById("canvas").height;
	
//For movement
var cw = 10;
var right = 39;
var left = 37;
var up = 38;
var down = 40;
var move, score = 0, time = 0, restart = false, safeScore = 0, prevScore = 10, noScore = 3;
var food_x, food_y, fix = false;
var highScore, scoreTwo, userName = "Vader", holdName = "Timmy";

var snake_array;
var wallArray = [];

//create walls
wallArray.wall1 = ({x: 12, y: 38, h: 27, w: 169});
wallArray.wall2 = ({x: 60, y: 203, h: 201, w: 37});
wallArray.wal3 = ({x: 398, y: 195, h: 16, w: 133});

var snakecollide = false;
var foodcollide = false;

// To run game
function game(){
	move = 39;
	create_snake();
	create_food();
	//score = 0;
	if(typeof game_loop != "undefined") clearInterval(game_loop);
	game_loop = setInterval(movement, 60);
}

game();

// To create snake from original snake game
function create_snake(){
	var length = 8;
	snake_array = [];
	for(var i = length-1; i >= 0; i--){
		snake_array.push({x: i, y:0, w:10, h:10});
	}
}
	
// the random food locator
function create_food(){
	food_x = Math.round(Math.random()*(width-cw)/cw);
	food_y = Math.round(Math.random()*(height-cw)/cw);
	return food_x, food_y;
}

// random chance for good or bad food
var rand = Math.round((Math.random() * 10) + 1);
var change = 1;

// Manipulate the snake
function movement(){
	ctx.fillStyle = "#CCFF99";
	ctx.fillRect(0, 0, width, height);
	
	var type;
	
	if(rand <= 5)
	   type = "rotten";
	else{
	   type = "food";
	}
	
	// change rotten food
	if(type === "rotten"  && time >= 70){
	  	rand = 10;
	  	type = "food";
	}
	
	var moveX = snake_array[0].x;
	var moveY = snake_array[0].y;
	
	//Stop snake from going to infinity
	if(fix === true){
		moveX = 1;
		moveY = 1;
		fix = false;
	}
	
	// movements
	if(move == right){
		moveX++;
	}
	else if(move == left){ 
		moveX--; 
	}
	else if(move == up){ 
		moveY--;
	}
	else if(move == down){ 
		moveY++;
	}
	
	time += 1;
	
	// activate restart
	if(moveX == -1 || moveX == width/cw || moveY == -1 || moveY == height/cw){
	    time = 1;
	    restart = true;
	}
	
	//stop food from going behind walls
	snakecollide = wallCollision(food_x, food_y);
	
	if(snakecollide === true){
		create_food();
	}
	
	// leader board
	if(restart === true){
		leaderBoard();
	}
	
	// restart when snake loops into its self
	if(check_collision(moveX, moveY, snake_array) || score < -5){
		rand = Math.round((Math.random() * 10) + 1);
		change = 1;
		safeScore = score;
		game();
		return;
	}
	
	// if hit food
	if(moveX == food_x && moveY == food_y){
		var tail = {x: moveX, y: moveY};
		score = scoreChange(score,rand);
		create_food();
		rand = Math.round((Math.random() * 10) + 1);
		time = 0;
		if(type === "rotten"){
		   if(change > 0.5 && change <= 2)
		     change -= 0.5;
	    }
		else{
		   if(change <= 2 && change > 0.5)
		     change += 0.5;
		}
	}else{
		var tail = snake_array.pop();
		tail.x = moveX; tail.y = moveY;
	}
		
	snake_array.unshift(tail);
	
	// To color snake
	for(var i = 0; i < snake_array.length; i++){
		var container = snake_array[i];
		colorSnake(container.x, container.y, container.w, container.h);
	}
	
	snakecollide = wallCollision(moveX, moveY);
	
	//restart
	if(snakecollide === true){
		score--;
		rand = Math.round((Math.random() * 10) + 1);
		change = 1;
		game();
		return;
	}
	
	// Crazy food challenge
	if(score > 200){
	  colorFood(food_x, food_y, type);
	  create_food();
	  colorFood(food_x, food_y, type);
	}
	
	colorFood(food_x, food_y, type);
	
	//score
	var score_text = "Score: " + score;
	ctx.fillStyle = "black";
	ctx.fillText(score_text, 5, height-5);
	
	walls();
}

// Collision to interior walls
function wallCollision(x,y){
	return (x < 19 && x > 0 && y > 2 && y < 7) || 
		(x < 44 && x > 38 && y > 17 && y < 22) ||
		(x < 11 && x > 4 && y > 18 && y < 41);
}

// Show scores frome previous round
var once = false;
function leaderBoard(){
	if(userName === "Vader" && (score > noScore || score > prevScore)){
	   userName = prompt("Input Name");
	   if(userName === ""){
	   	 userName = "Creative Name";
	   }
    }
	var LeaderB = "Leader Board:";
	if(score > prevScore){
	  var highScore = "1. " + userName + ": " + score;
	  var scoreTwo = "2. " + holdName + ": " + prevScore;
	  once = true;
	}
    else if(score > noScore){
      var highScore = "1. " + holdName + ": " + prevScore;
	  var scoreTwo = "2. " + userName + ": " + score;
	  once = true;
    }
    else if(once === false){
      var highScore = "1. " + holdName + ": " + prevScore;
	  var scoreTwo = "2. " + userName + ": " + noScore;
    }
    else{
      var highScore = "1. " + holdName + ": " + prevScore;
	  var scoreTwo = "2. " + userName + ": " + noScore;
    }
	
	// place score board
	ctx.fillStyle = "black";
	ctx.fillText(LeaderB, 250, 210);
	ctx.fillStyle = "black";
	ctx.fillText(highScore, 250, 230);
	ctx.fillStyle = "black";
	ctx.fillText(scoreTwo, 250, 250);
	cw = 0;
	
	//restart
	if(time >= 100){
	  rand = Math.round((Math.random() * 10) + 1);
	  change = 1;
	  if(score > prevScore){
	  	noScore = prevScore;
		prevScore = score;
		holdName = userName;
	  }
	  else if(score > 0){
	  	noScore = score;
	  }
	  score = 0;
	  time = 0;
	  cw = 10;
	  fix = true;
	  restart = false;
	  game();
	  return;
   }
}

// Level walls for player to avoid
function walls(){
	for(var i in wallArray){
	   ctx.fillStyle = "white";
	   ctx.fillRect(wallArray[i].x, wallArray[i].y, wallArray[i].w, wallArray[i].h);
	}
}

// Building the foods
function colorFood(x, y, type){
	if(type === "food"){
		ctx.fillStyle = "#FFCC00";
	}
	else if(type === "rotten"){
		ctx.fillStyle = "#003D00";
	}
	ctx.fillRect(x*cw, y*cw, cw, cw);
}

// building the snake
function colorSnake(x,y, w, h){
	ctx.fillStyle = "#800000";
	ctx.fillRect(x*cw, y*cw, change*w, change*h);
}

// To find collisions from original snake game
function check_collision(x, y, array){
	for(var i = 0; i < array.length; i++){
		if(array[i].x == x && array[i].y == y)
			return true;
	}
	return false;
}
	
//Score change
function scoreChange(score,rand){
	if(rand >= 5){
	  return score + 1;
    }
    else{
      return score - 1;
    }
}
	
//To determine what key is pressed
function keyPressed(event){
	// crome finder from stackoverflow
	var firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
	move = event.keyCode? event.keyCode : event.charCode;
	if(!firefox){
	   left = 97;
	   right = 100;
	   up = 119;
	   down = 115;
    }
	return move;
}
