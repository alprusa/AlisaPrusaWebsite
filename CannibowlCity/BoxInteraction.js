//This file is for results of the avatar's interactions with the box

var cannibalDeath = false, cannibalLocation = 0, areaBox = 0;

//move box
function Pushing(){
    var bcColValArray = objectCollision("box", "cannibal"); //0 = box object, 1 = cannibal object, 2 = bool for if collided
    var bpColValArray = objectCollision("box", "platform"); //0 = box object, 1 = platform object, 2 = bool for if collided
    var boxColVal = avatarCollision("box");
    
	//when player nears box move it
    if(typeof boxColVal === "object" && gInput.right && boxColVal.collided && boxColVal.created && hiding === false && !wallObjCollision("box", endWall)){
        soundEfx["BoxPush"].play();
        boxColVal.x += 9;
    }
    else soundEfx["BoxPush"].pause();
    
    //if close to edge do force push box off
    if(typeof bpColValArray[0] === "object" && typeof bpColValArray[1] === "object" && bpColValArray[0].x >= (bpColValArray[1].x + bpColValArray[1].width) - 30){
        boxColVal.x += 30;
        areaBox = boxColVal;
    }
    
    //make box fall when it falls off platform
    if(typeof bpColValArray[0] !== "object" && typeof bpColValArray[1] !== "object" && areaBox.y <= 300 && boxDisp === true){
        areaBox.y += 10;
        if(hiding === true && boxEnter === true){
            count = 0;
            exitObj === false;
        }
    }
    
    //remove box and if hit cannibal then
    if(bcColValArray[2] && typeof bcColValArray[0] === "object" && bcColValArray[0].created === true && boxDisp === true){
        areaBox.remove(this);
        areaBox.y = -10;
        
        cannibalLocation = bcColValArray[1].x;
        meatCreated++;
       
        var meatFoodVal = bcColValArray[1].indexInArray;
        if(gameObjects["meatFood"][meatFoodVal] !== undefined) {
            gameObjects["meatFood"][meatFoodVal].x = cannibalLocation;
            gameObjects["meatFood"][meatFoodVal].y = bcColValArray[1].y + 60;
            gameObjects["meatFood"][meatFoodVal].created = true;
            world.addChild(gameObjects["meatFood"][meatFoodVal]);
        }
        
        cannibalCollidedPlatform = false;
        soundEfx["CannibalScream"].play();
        bcColValArray[1].remove(this);
        cannibalDeath = true;
        meatPresent = true;
        boxEnter = false;
        gone = true;
        areaBox.created = false;
        bcColValArray[1].created = false;
        alive = false;
    }
    
    //remove box when it hits the ground
    if(areaBox.y >= 300 && pushable === true && boxDisp === true && areaBox.created === true){
        areaBox.remove(this);
        areaBox.created = false;
        pushable = false;
        alive = false;
    }
    
    //make it so player makes it to bottom or dies in box
    if(hiding === true && boxEnter === true && areaBox.x >= 300 && areaBox.created === false && 
       !bcColValArray[2] && boxDisp === true){
        avatar.y = 300;
        escapeBox = true;
    }
    else if(typeof bcColValArray[1] === "object" && hiding === true && bcColValArray[2] && boxDisp === true && 
        areaBox.created === false && bcColValArray[1].created === false && avatar.y < 300){
        avatar.y = 300;
        escapeBox = true;
        finished = false;
        canniCollision = true;
        healthHunger["Health"].add.width = 0;
    }
}

function boxQuit(){
    cannibalDeath = false; cannibalLocation = 0; areaBox = 0;
}
