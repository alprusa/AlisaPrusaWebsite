var canniLeader;
var theEnd = true, theEnd2 = true;

//set up the boss
function Boss(){
	canniLeader = new Sprite();
    canniLeader.width = 115;
    canniLeader.height = 127;
    canniLeader.x = 504;
    canniLeader.y = 300;
    canniLeader.id = "boss";
    canniLeader.index = 1;
    world.addChild(canniLeader);
    canniLeader.image = Textures.load("img/bossset.png");
    canniLeader.frameWidth = 115;
	canniLeader.frameHeight = 126;
	canniLeader.frameCount = 6;
	canniLeader.frameRate = 6;
	canniLeader.moveRate = 6;
	canniLeader.addAnimations(["left","right"], [3,3]);
	canniLeader.addAnimation("idleL", (2,1));
	canniLeader.addAnimation("idleR", (3,1));
 }
 
//make what the boss can do
function BossActions(){
	//move
	if(!collisionWall(canniLeader, backWall) && theEnd === true){
		soundEfx["CannibalWalk"].play();
		canniLeader.animation = "left"; 
		canniLeader.frameRate = canniLeader.moveRate;
		canniLeader.x -= 5;
	}
	else if(!collisionWall(canniLeader, endWall) && theEnd === false){
		canniLeader.x += 5;
		soundEfx["CannibalWalk"].play();
		canniLeader.animation = "right";
		canniLeader.frameRate = -canniLeader.moveRate;
	}
	else soundEfx["CannibalWalk"].pause();
	//boss defeated
	if(collisionBoss() && hiding !== true){
		healthHunger["Health"].width = 0;
	}
	//hit the wall
	if(collisionWall(canniLeader, backWall)){
			theEnd = false;
	}
	else if(collisionWall(canniLeader, endWall)){
			theEnd = true;
	}
}

function bossQuit(){
    canniLeader = 0;
    theEnd = true; theEnd2 = true;
}
