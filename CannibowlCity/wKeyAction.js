//This file is for the ladder climbing of the avatar

//variables for determining if climbing ladder
var climbLadder = false, climbing = true, time = 0, center = false, lowerPlatformYPos = 600;

//Climbing or walking
function wKey(){
    var ladderColValue = avatarCollision("ladder");
    var platformColValue = avatarCollision("platform");
	
    if(typeof ladderColValue === "object"){
        //determine if player can climb
        if((gInput.up || gInput.down) && avatar.x >= (ladderColValue.x - 65) && avatar.x <= (ladderColValue.x + 3) && ladderColValue.collided){
            climbLadder = true;
            walk = false;
        }
        
        //climbing ladders
        if(gInput.up && climbLadder === true && move === true && (avatar.y >= (ladderColValue.y - 65) || avatar.y >= platformColValue.y - 65)){
            avatar.animation = "climb";
            soundEfx["AvatarWalk"].pause();
            center = true;
            walk = false;
            avatar.y -= 7;
            avatar.frameRate = -avatar.moveRate;
        }
        else if(gInput.down && climbLadder === true && ladderColValue.collided && avatar.y < 300 && avatar.y < lowerPlatformYPos && move === true){
            avatar.animation = "climb";
            soundEfx["AvatarWalk"].pause();
            center = true;
            walk = false;
            avatar.y += 7;
            avatar.frameRate = -avatar.moveRate;
            if(level1 === true && area2 === true && ladderColValue.y < platformColValue.y) {
                lowerPlatformYPos = platformColValue.y - 70;
            }
        }
        //to walk again once you've stopped climbing down
        else if((avatar.y >= 300 && climbLadder === true) || (level1 === true && area2 === true && avatar.y > lowerPlatformYPos)){
            climbLadder = false;
            walk = true;
        }
        else if(climbLadder === true)
            avatar.animation = "idleClimb";
        
        //to be able to walk while on a platform
        if(avatar.y <= (ladderColValue.y - 65) && avatar.y <= platformColValue.y - 65){
            climbLadder = false;
            walk = true;
            lowerPlatformYPos = 600
        }
        
        //make avatar center when climbing ladder
        if(center === true){
            if(ladderColValue.collided)
                avatar.x = ladderColValue.x - 20;
            else avatar.x = ladderColValue.x - 20;
            center = false;
        }
        
        //determine if player can walk again
        if(avatar.y >= 300){
            climbLadder = false;
            walk = true;
            lowerPlatformYPos = 600
        }
        
        ladderColValue.collided = false;
        if(typeof platformColValue === "object") platformColValue.collided = false;
    }
}

function wKeyQuite(){
    limbLadder = false; climbing = true; time = 0; center = false; lowerPlatformYPos = 600;
}
