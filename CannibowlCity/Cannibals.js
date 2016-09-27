//This file is for the cannibals movements and abilities

var end = false, cannCycle = 0, endPlat = false, sneak = false, assim = true, relocCanni = true, avatarPre = false, cannibalSight, canniTurn = 0, turnedSlow = false, canniSpeed = false;
var creeper, hiddenWall = false, cannibalCollidedPlatform = false;

//create invisible rectangle that sits on top of the cannibal and if the player hits the rectangle then the ai will chase the player
function CannibalField(){
	cannibalSight = new Sprite();
    cannibalSight.width = 70; //160
    cannibalSight.height = 30;
    cannibalSight.x = 0;
    cannibalSight.y = 0;
    cannibalSight.id = "cannibalSight";
    cannibalSight.index = 0;
    world.addChild(cannibalSight);
    cannibalSight.image = Textures.load();
}

//the second rectangle for ai player detection
function CannibalFollow(){
	creeper = new Sprite();
    creeper.width = 70;
    creeper.height = 30;
    creeper.x = 0;
    creeper.y = 0;
    creeper.id = "cannibalSight";
    creeper.index = 0;
    world.addChild(creeper);
    creeper.image = Textures.load();
}

//make cannibals move and such
function CannibalAction(){
    if(avatar.x <= endWall.x && level2 === true && area4 === true){
        hiddenWall = true;
    }
    else{
        hiddenWall = false;
    }
    
    if(collisionFaster(cannibalSight) && hiding === false && sneak === false){
        canniSpeed = true;
        avaterPre = false;
    }
    else if(collisionFaster(creeper) && hiding === false && sneak === false && canniTurn === 0){
        avatarPre = true;
        canniSpeed = false;
    }
    else {
        avatarPre = false;
        canniSpeed = false;
        canniTurn = 0;
    }
    
    if(gameObjects["cannibal"] !== undefined && gameObjects["cannibal"].length !== 0){
        for(var CanniValue in gameObjects["cannibal"]){
            if(typeof gameObjects["cannibal"][CanniValue] === "object" && gameObjects["cannibal"][CanniValue].created === true && !gameObjects["cannibal"][CanniValue].offScreen) {
                var wallObject = cannibalCollision(CanniValue, "wall");
                var platformObject = cannibalCollision(CanniValue, "platform");
                var Canniobj = gameObjects["cannibal"][CanniValue];
                
                cannibalSight.y = Canniobj.y + 20;
                creeper.y = Canniobj.y + 20;
                
                //move to right
                if(!wallObjCollision("cannibal", endWall) && end === false && !cannibalCollidedPlatform && sneak === false){
                    soundEfx["CannibalWalk"].play();
                    Canniobj.animation = "right";
                    Canniobj.frameRate = -Canniobj.moveRate;
                    if(canniSpeed === true && hiddenWall === false)
                        Canniobj.x += 8;
                    else Canniobj.x += 5;
                    cannibalSight.x = Canniobj.x + 60;
                    creeper.x = Canniobj.x - 60;
                    if(wallObjCollision("cannibal", endWall) || (avatarPre === true && hiddenWall === false)){
                        end = true;
                        avatarPre = false;
                        canniSpeed = false;
                        canniTurn++;
                    }
                }
                //move back to left
                else if(end === true && !wallObjCollision("cannibal", backWall) && !cannibalCollidedPlatform && sneak === false){
                    if(canniSpeed === true && hiddenWall === false)
                        Canniobj.x -= 8;
                    else Canniobj.x -= 5;
                    cannibalSight.x = Canniobj.x - 60;
                    creeper.x = Canniobj.x + 60;
                    soundEfx["CannibalWalk"].play();
                    Canniobj.animation = "left";
                    Canniobj.frameRate = Canniobj.moveRate;
                    if((wallObjCollision("cannibal", backWall) || (typeof wallObject === "object" && wallObject.collided)) || (avatarPre === true &&
                            hiddenWall === false)){
                        end = false;
                        avatarPre = false;
                        canniSpeed = false;
                        canniTurn++;
                    }
                }
                //platform right
                else if(typeof platformObject === "object" && platformObject.collided && cannibalCollidedPlatform && Canniobj.x < (platformObject.x + platformObject.width - 77) &&
                        endPlat === false && sneak === false){
                    soundEfx["CannibalWalk"].play();
                    if(canniSpeed === true && hiddenWall === false)
                        Canniobj.x += 8;
                    else Canniobj.x += 5;
                    cannibalSight.x = Canniobj.x + 60;
                    creeper.x = Canniobj.x - 60;
                    Canniobj.animation = "right";
                    Canniobj.frameRate = -Canniobj.moveRate;
                    if(Canniobj.x > (platformObject.x + platformObject.width - 77) ||
                            (avatarPre === true && hiddenWall === false)){
                        endPlat = true;
                        avatarPre = false;
                        canniSpeed = false;
                        canniTurn++;
                    }
                  }
                //move back to left platform
                else if(typeof platformObject === "object" && endPlat === true && platformObject.collided && Canniobj.x > (platformObject.x - 40) && sneak === false && cannibalCollidedPlatform){
                    if(canniSpeed === true && hiddenWall === false)
                        Canniobj.x -= 8;
                    else Canniobj.x -= 5;
                    cannibalSight.x = Canniobj.x - 60;
                    creeper.x = Canniobj.x + 60;
                    soundEfx["CannibalWalk"].play();
                    Canniobj.animation = "left";
                    Canniobj.frameRate = Canniobj.moveRate;
                    if(Canniobj.x < (platformObject.x - 40) || (avatarPre === true && hiddenWall === false)){
                        endPlat = false;
                        avatarPre = false;
                        canniSpeed = false;
                        canniTurn++;
                    }
                }
                else if(sneak === true && level2 === true && area2 === true && avatar.x >= 300){
                    relocCanni = false;
                    if(canniSpeed === true)
                        Canniobj.x -= 10;
                    else Canniobj.x -= 5;
                    cannibalSight.x = Canniobj.x - 60;
                    creeper.x = Canniobj.x + 60;
                    soundEfx["CannibalWalk"].play();
                    Canniobj.animation = "left";
                    Canniobj.frameRate = Canniobj.moveRate;
                    if(Canniobj.x < endWall.x - 20){
                        assim = false;
                        end = true;
                        sneak = false;
                    }
                }
                else{
                    cannibalSight.x = -305;
                    creeper.x = -305;
                    soundEfx["CannibalWalk"].pause();
                }
                
                if(level2 === true && area2 === true && assim === true){
                    sneak = true;
                    if(relocCanni === true){
                        Canniobj.x = 850;
                    }
                }
                else{
                    sneak = false;
                }
                
                Canniobj.collided = false;
                if(typeof platformObject === "object") platformObject.collided = false;
                if(typeof wallObject === "object") wallObject.collided = false;
            }
        }
    }
}

//collision cannibals toward other objects
function cannibalCollision(canniVal, objColType){
    var valueCollidedObj = 0;
    var canniObj = gameObjects["cannibal"][canniVal];
    
    if(typeof canniObj === "object" && gameObjects[objColType] !== undefined && gameObjects[objColType].length !== 0) {
        for(var objValue in gameObjects[objColType]){
            var obj = gameObjects[objColType][objValue];
            
            if(typeof obj === "object" && !obj.offScreen) {
                if(canniObj.x + 20 < obj.x + obj.width && canniObj.x + canniObj.width - 10 > obj.x && canniObj.y < obj.y + obj.height && canniObj.y + canniObj.height > obj.y) {
                    gameObjects["cannibal"][canniVal].collided = true;
                    gameObjects[objColType][objValue].collided = true;
                    if(objColType === "platform") cannibalCollidedPlatform = true;
                    valueCollidedObj = gameObjects[objColType][objValue];
                    break;
                }
                else { 
                    gameObjects["cannibal"][canniVal].collided = false;
                    gameObjects[objColType][objValue].collided = false;
                }
            }
        }
    }
    
	return valueCollidedObj;
}

function cannibalQuit(){
    cannibalSight.remove(this);
    creeper.remove(this);
    world.removeChild(cannibalSight);
    world.removeChild(creeper);
    end = false; cannCycle = 0; endPlat = false; sneak = false; assim = true; relocCanni = true; avatarPre = false; cannibalSight = 0; canniTurn = 0; turnedSlow = false; canniSpeed = false;
    creeper = 0; hiddenWall = false; cannibalCollidedPlatform = false;
}
