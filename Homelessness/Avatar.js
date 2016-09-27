//This file is for the Avatar movements and creation

//variables for detecting player interactions
var platformFallL = true, platformFallR = true, platformFall = true, avatar, movedL = false, wallL = true, wallR = true, idle = false;

//Set up avatar
function Avatar(){
	avatar = new Sprite();
    avatar.width = 70;
    avatar.height = 70;
    avatar.x = 9;
    avatar.y = 98;
    avatar.id = "avatar";
    avatar.index = 0;
    world.addChild(avatar);
    avatar.image = Textures.load("img/rightWalk.png");
    avatar.url = "img/rightWalk.png";
	avatar.frameWidth = 405;
	avatar.frameHeight = 804;
	avatar.frameCount = 24;
	avatar.frameRate = 30;
	avatar.moveRate = 30;
	avatar.addAnimations(["walk"], [25]);
}

function leftAnim(){
	avatar.image = Textures.load("img/leftWalk.png");
    avatar.url = "img/leftWalk.png";
}

function righAnim(){
	avatar.image = Textures.load("img/rightWalk.png");
    avatar.url = "img/rightWalk.png";
}

//movement
function Movement(){
    if(gInput.right === false && !gInput.left)
        idle = true;
    else
        idle = false;
	
	//walking left
	if(gInput.left&& move === true && walk === true && wallL === true){
		leftAnim();
		avatar.animation = "walk";
		soundEfx["Footstep1"].play();
        avatar.frameRate = avatar.moveRate;
        
		if(!avatarWallCollision(backWall)){
	        avatar.x -= 7;
	        movedL = true;
       }
       else
       	   ShiftAreaBack();
	}
	//walking right
	else if(gInput.right && move === true && walk === true && wallR === true){
		righAnim();
		avatar.animation = "walk";
        avatar.frameRate = -avatar.moveRate;
		soundEfx["Footstep1"].play();
		
		if(!avatarWallCollision(endWall)){
	        avatar.x += 7;
			movedL = false;
        }
       	else
        	ShiftAreaForward();	
	}
	else if(movedL === true && idle === true){
		avatar.image = Textures.load("img/idleL.png");
    	avatar.url = "img/idleL.png";
		soundEfx["Footstep1"].pause();
	}
	else if(idle === true){
		avatar.image = Textures.load("img/idleR.png");
    	avatar.url = "img/idleR.png";
		soundEfx["Footstep1"].pause();
	}
}

//detect collions for player to objects
function avatarCollision(objColType){
    var valueCollided = objColType;
    
    if(gameObjects[objColType] !== undefined && gameObjects[objColType].length !== 0){
        for(var i in gameObjects[objColType]){
            if(gameObjects[objColType][i] !== undefined && !gameObjects[objColType][i].offScreen) {
                if(avatar.x + 20 < gameObjects[objColType][i].x + gameObjects[objColType][i].width && avatar.x + avatar.width - 20 > gameObjects[objColType][i].x && 
                        avatar.y < gameObjects[objColType][i].y + gameObjects[objColType][i].height && avatar.y + avatar.height  > gameObjects[objColType][i].y) {
                    gameObjects[objColType][i].collided = true;
                    valueCollided = gameObjects[objColType][i];
                    break;
                }
                else { gameObjects[objColType][i].collided = false; }
            }
        }
    }
    
	return valueCollided;
}

//detect collions for objects to end of area
function avatarWallCollision(wall){
	return avatar.x < wall.x + wall.width && 
		avatar.x + avatar.width > wall.x && 
		avatar.y < wall.y + wall.height &&
		avatar.y + avatar.height > wall.y;
}

function avatarRefresh(){
    platformFallL = true; platformFallR = true; platformFall = true; avatar = 0; movedL = false; wallL = true; wallR = true; idle = false;
}