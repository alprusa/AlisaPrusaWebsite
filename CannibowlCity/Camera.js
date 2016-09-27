//This file is for changing the area that the player is interaction with

//var for determining about going back and forth
var area1 = true, area2 = false, area3 = false, area4 = false, area5 = false;

//move the background and such to change level/areas
function AreaChange(){
	//move to next area
	if(avatarWallCollision(endWall) && avatar.x + avatar.width < background.x + background.width){
			if(area1 === true && (level0 === true || bossFight === true || level1 === true || level2 === true)){
				ShiftAreaForward();
				area2 = true;
				area1 = false;
			}
			else if(area2 === true && (level1 === true || level2 === true)){
				ShiftAreaForward();
				area3 = true;
				area2 = false;
			}
			else if(area3 === true && (level1 === true || level2 === true)){
				ShiftAreaForward();
				area4 = true;
				area3 = false;
			}
			else if(area4 === true && level2 === true){
				ShiftAreaForward();
				area4 = false;
				area5 = true;
			}
	}

	//shift items or allow player to go back
	if(area1 === false && avatarWallCollision(backWall) && avatar.x > background.x){
			if(area5 === true && level2 === true){
				ShiftAreaBack();
				area4 = true;
				area5 = false;
			}
			else if(area4 === true && (level1 === true || level2 === true)){
				ShiftAreaBack();
				area3 = true;
				area4 = false;
			}
			else if(area3 === true && (level1 === true || level2 === true)){
				ShiftAreaBack();
				area2 = true;
				area3 = false;
			}
			else if(area2 === true && (level0 === true || bossFight === true || level1 === true || level2 === true)){
				ShiftAreaBack();
				area1 = true;
				area2 = false;
			}
	}
}

function ShiftAreaForward(){
    var moveBy = 800;
    
	//move to next area
	if(avatarWallCollision(endWall)){
		background.x -= moveBy;
		for(var obj in gameObjects){
            if(obj !== undefined && obj.length !== 0){
                for(var i = 0; i < obj.length; i++){
                    if(gameObjects[obj][i] === undefined) break;
                    
                    gameObjects[obj][i].x -= moveBy;
                    if(obj === "meatfood")
                        gameObjects["meatfood"][i].x = cannibalLocation - moveBy;
                    
                    if(gameObjects[obj][i].x > 0 && gameObjects[obj][i].x < 800)
                        gameObjects[obj][i].offScreen = false;
                    else
                        gameObjects[obj][i].offScreen = true;
                }
            }
		}
		foodPresent = true;
        cannibalCollidedPlatform = false;
		alive = true;
		pushable = true;
		meatPresent = true;
		notePickUp = true;
		value++;
		avatar.x = 104;
		canniTurn = 0;
		canniSpeed = true;
		if(bossFight === true){
			canniLeader.x = 7;
			theEnd = false;
		}
	}
}

function ShiftAreaBack(){
    var moveBy = 800;
    
	//shift items or allow player to go back
	if(avatarWallCollision(backWall)){
		background.x += moveBy;
		for(var obj in gameObjects){
            if(obj !== undefined && obj.length !== 0){
                for(var i = 0; i < obj.length; i++){
                    if(gameObjects[obj][i] === undefined) break;
                    
                    gameObjects[obj][i].x += moveBy;
                    if(obj === "meatfood")
                        gameObjects["meatfood"][i].x = cannibalLocation + moveBy;
                    
                    if(gameObjects[obj][i].x > 0 && gameObjects[obj][i].x < 800)
                        gameObjects[obj][i].offScreen = false;
                    else
                        gameObjects[obj][i].offScreen = true;
                }
            }
		}
		foodPresent = true;
        cannibalCollidedPlatform = false;
		if(cannibalDeath === false){
			alive = true;
		}
		else alive = false;
		pushable = false;
		meatPresent = true;
		notePickUp = true;
		value--;
		avatar.x = 520;
		canniTurn = 0;
		canniSpeed = true;
		avatarPre = false;
		if(bossFight === true){
			canniLeader.x = 42;
			theEnd = false;
		}
	}
}

function cameraQuit(){
    area1 = true; area2 = false; area3 = false; area4 = false; area5 = false;
}
