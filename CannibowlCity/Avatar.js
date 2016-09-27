//This file is for the Avatar movements and creation

//variables for detecting player interactions
var platformFallL = true, platformFallR = true, platformFall = true, avatar, movedL = false, wallL = true, wallR = true, idle = false;

//Set up avatar
function Avatar(){
	avatar = new Sprite();
    avatar.width = 100;
    avatar.height = 100;
    avatar.x = 104;
    avatar.y = 300;
    avatar.id = "avatar";
    avatar.index = 0;
    world.addChild(avatar);
    avatar.image = Textures.load("img/avatarset.png");
    avatar.url = "img/avatarset.png";
	avatar.frameWidth = 75;
	avatar.frameHeight = 79;
	avatar.frameCount = 10;
	avatar.frameRate = 10;
	avatar.moveRate = 10;
	avatar.addAnimations(["idleL", "idleR", "left","right","climb"], [1,1,3,3,2]);
	avatar.addAnimation("idleClimb", 9, 1);
}

//movement
function Movement(){
	PlatformStop();
    var wallColVal = avatarCollision("wall");
	
	//stop player from going past wall
	if(typeof wallColVal === "object" && wallColVal.collided){
		if(avatar.x < (wallColVal.x - 55)){
			wallL = true;
			wallR = false;
		}
		else if(avatar.x < (wallColVal.x + 20)){
			wallL = false;
			wallR = true;
		}
	}
	else{
		wallL = true;
		wallR = true;
	}
    
    if(gInput.bools["left"] === false && gInput.bools["right"] === false)
        idle = true;
    else
        idle = false;
	
	//walking left
	if(gInput.left && avatar.x >= background.x && move === true && walk === true && (platformFallL === true || platformFall === true) && wallL === true){
		avatar.animation = "left";
		soundEfx["AvatarWalk"].play();
        avatar.x -= 7;
        avatar.frameRate = avatar.moveRate;
        movedL = true;
	}
	//walking right
	else if(gInput.right && move === true && avatar.x + avatar.width <= background.x + background.width && walk === true && (platformFallR === true || platformFall === true) && wallR === true){
		avatar.animation = "right";
		soundEfx["AvatarWalk"].play();
        avatar.x += 7;
        avatar.frameRate = -avatar.moveRate;
        movedL = false;
	}
	else if(climbLadder === false && movedL === true && idle === true){
		avatar.animation = "idleL";
		soundEfx["AvatarWalk"].pause();
	}
	else if(climbLadder === false && idle === true){
		avatar.animation = "idleR";
		soundEfx["AvatarWalk"].pause();
	}
	
	//allow player to interact with box on ground
	if((level2 === true && area2 === true) || (bossFight === true && area1 === true)){
		boxDisp = false;
	}
	else boxDisp = true;
}

//stop player from falling off platform
function PlatformStop(){
    var platformColVal = avatarCollision("platform");
    
    //console.log(value);
    if(typeof platformColVal === "object"){
        if(platformColVal.collided){
            platformFall = false;
            if(avatar.x < (platformColVal.x - 30)){
                platformFallL = false;
                platformFallR = true;
            }
            else if(avatar.x > (platformColVal.x + platformColVal.width - 77)){
                platformFallR = false;
                platformFallL = true;
            }
            else{
                platformFall = true;
            }
        }
        else if(platformColVal.created === true && platformColVal.collided){
            platformFall = false;
            if(platformColVal.created === true && avatar.x < (platformColVal.x -  30)){
                platformFallL = false;
                platformFallR = true;
            }
            else if(platformColVal.created === true && avatar.x > (platformColVal.x + platformColVal.width - 77)){
                platformFallR = false;
                platformFallL = true;
            }
            else{
                platformFall = true;
            }
        }
        else{
            platformFall = true;
        }
    }
}

//detect collions for player to objects
function avatarCollision(objColType){
    var valueCollided = objColType;
    
    if(gameObjects[objColType] !== undefined && gameObjects[objColType].length !== 0){
        for(var i in gameObjects[objColType]){
            if(gameObjects[objColType][i] !== undefined && !gameObjects[objColType][i].offScreen) {
                if(avatar.x + 10 < gameObjects[objColType][i].x + gameObjects[objColType][i].width && avatar.x + avatar.width - 30 > gameObjects[objColType][i].x && 
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