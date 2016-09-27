//This file is for collision detection between elements

//collision for box and cannibal collision
function objectCollision(obj1, obj2){
    var valueCollidedObj = [0, 0, false];
    
    
    if(gameObjects[obj1] !== undefined && gameObjects[obj1].length !== 0 && gameObjects[obj2] !== undefined && gameObjects[obj2].length !== 0) {
        for(var i in gameObjects[obj1]){
            if(gameObjects[obj1][i] !== undefined && !gameObjects[obj1][i].offScreen){
                for(var j in gameObjects[obj2]){
                    if(gameObjects[obj2][j] !== undefined && !gameObjects[obj2][j].offScreen) {
                        if(gameObjects[obj1][i].x + 20 < gameObjects[obj2][j].x + gameObjects[obj2][j].width &&
                                gameObjects[obj1][i].x + gameObjects[obj1][i].width - 10 > gameObjects[obj2][j].x && 
                                gameObjects[obj1][i].y < gameObjects[obj2][j].y + gameObjects[obj2][j].height &&
                                gameObjects[obj1][i].y + gameObjects[obj1][i].height > gameObjects[obj2][j].y) {

                                gameObjects[obj1][i].collided = true;
                                valueCollidedObj[0] = gameObjects[obj1][i];
                                
                                gameObjects[obj2][j].collided = true;
                                valueCollidedObj[1] = gameObjects[obj2][j];
                                
                                valueCollidedObj[2] = true;
                            break;
                        }
                        else{
                            gameObjects[obj1][i].collided = false;
                            gameObjects[obj2][j].collided = false;
                        }
                    }
                }
            }
        }
    }
    
	return valueCollidedObj;
}

//detect collions for player to boss
function collisionBoss(){
	return avatar.x + 80 < canniLeader.x + canniLeader.width && 
		avatar.x + avatar.width - 20 > canniLeader.x && 
		avatar.y + 20 < canniLeader.y + canniLeader.height &&
		avatar.y + avatar.height + 20 > canniLeader.y;
}

//detect collions for objects to end of area
function wallObjCollision(obj, wall){
    var valueCollidedObj = false;
    
    if(gameObjects[obj] !== undefined && gameObjects[obj].length !== 0) {
        for(var i = 0; i < gameObjects[obj].length; i++){
            if(gameObjects[obj][i] !== undefined && !gameObjects[obj][i].offScreen) {
                if(gameObjects[obj][i].x < wall.x + wall.width && 
                        gameObjects[obj][i].x + gameObjects[obj][i].width > wall.x && 
                        gameObjects[obj][i].y < wall.y + wall.height &&
                        gameObjects[obj][i].y + gameObjects[obj][i].height > wall.y) {
                    valueCollidedObj = true;
                    gameObjects[obj][i].collided = true;
                    break;
                }
                else{
                    gameObjects[obj][i].collided = false;
                }
            }
        }
    }
    
	return valueCollidedObj;
}

//detect collions for objects to end of area
function collisionWall(obj, wall){
    if(obj === undefined || wall === undefined) return;
    
	return obj.x < wall.x + wall.width && 
		obj.x + obj.width > wall.x && 
		obj.y < wall.y + wall.height &&
		obj.y + obj.height > wall.y;
}

//for cannibal collision is faster
function collisionFaster(sight){
    if(sight === undefined) return false;
    
	return avatar.x < sight.x + sight.width && 
		avatar.x + avatar.width + 10 > sight.x && 
		avatar.y < sight.y + sight.height &&
		avatar.y + avatar.height  > sight.y;
}
