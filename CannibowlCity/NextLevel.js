var finished = false;

//to move from levels
function NextLevel(){
	//getting to end of level
	if(level0 === true && collisionWall(avatar, endWall)){
		walk = true;
		keepHealth = healthHunger["Health"].width;
		keepHunger = healthHunger["Hunger"].width;
		value++;
		meatCreated = 0;
		alive = true;
		avatar.x = -140;
		avatar.remove(this);
		area1 = true;
		area2 = false;
		level1 = true;
		level0 = false;
		cannibalSight.remove(this);
		creeper.remove(this);
        RemoveAllObjects();
		LoadContent();
		
	}
	else if(level1 === true && collisionWall(avatar, endWall) && area4 === true){
		walk = true;
		keepHealth = healthHunger["Health"].width;
		keepHunger = healthHunger["Hunger"].width;
		value++;
		meatCreated = 0;
		alive = true;
		avatar.x = -140;
		avatar.remove(this);
		area1 = true;
		area2 = false;
		area3 = false;
		area4 = false;
		level2 = true;
		level1 = false;
		cannibalSight.remove(this);
		creeper.remove(this);
        RemoveAllObjects();
		LoadContent();
	}
	else if(level2 === true && collisionWall(avatar, endWall) && area5 === true){
		terminated = true;
		walk = true;
		keepHealth = healthHunger["Health"].width;
		keepHunger = healthHunger["Hunger"].width;
		value++;
		meatCreated = 0;
		alive = true;
		avatar.x = -140;
		avatar.remove(this);
		area1 = true;
		area2 = false;
		area3 = false;
		area4 = false;
		area5 = false;
		cannibalSight.remove(this);
		creeper.remove(this);
		createSong("bossSong");
		bossFight = true;
		level2 = false;
        RemoveAllObjects();
		LoadContent();
	}
	else if(collisionWall(avatar, endWall) && area2 === true && bossFight === true){
		start = false;
		finished = true;
        muteMusic();
		world.removeChild(canniLeader);
		canniLeader.remove(this);
		bossSong.muted = true;
		bossSong.muted = true;
		bossSong.muted = true;
		bossFight = false;
		terminated = true;
		backgroundStart = false;
		menuSong.muted = false;
		world.removeChild(healthHunger["Hunger"]);
		world.removeChild(healthHunger["Health"]);
		healthHunger["Hunger"].remove(this);
		healthHunger["Health"].remove(this);
		createSong("menuMusic");
		$("#menuScreens").removeClass("hidden");
		$("#victoryButtons").removeClass("hidden");
		$("#menuButtons").addClass("hidden");
		$("#menuBackdrops").attr('src', 'img/Victory.png');
		clearInterval(game_loop);
		hungry = 0;
	}
}

function reloadToMenu(){
	location.reload(true);
}

function restartGameLevel(){
	meatCreated = 0;
	alive = true;
	walk = true;
	keepHealth = 140;
	keepHunger = 140;
	pushable = true;
	meatPresent = false;
	notePickUp = true;
	sneak = false;
	assim = true;
	relocCanni = true;
	backgroundStart = true;
	cannibalSight.remove(this);
	creeper.remove(this);
	value = 0;
	avatar.x = -140;
	$("#menuScreens").addClass("hidden");
	noteCounter = 0;
	area1 = true;
	area2 = false;
	area3 = false;
	area4 = false;
	area5 = false;
	restart = true;
	backgroundStart = false;
	terminated = false;
	level0 = true;
	level1 = false;
	level2 = false;
	avatar.remove(this);
	start = true;
    RemoveAllObjects();
	LoadContent();
}
