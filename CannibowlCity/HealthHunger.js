//This file is for the Health and Hunger meters for the avatar

//for creating and determing the hunger and murder of the avatars health/hunger
var hungry = 0, dying = true, foodPresent = true, meatPresent = false, remainingRestart = 3;
var canniCollision = false, bossCollision = false, hungerDown = false, hiddenBox = false, overFlow = false, flash = 0;

var healthHunger = {"HealthContainer": 0, "HungerContainer": 0, "Health": 0, "Hunger": 0};

function UIContainer(x, y, imageURL, id){
    var tempSprite = new Sprite();
    
    tempSprite.x = x;
    tempSprite.y = y;
    tempSprite.image = Textures.load(imageURL);
    tempSprite.url = imageURL;
    tempSprite.id = id;
    tempSprite.width = 150;
    tempSprite.height = 50;
    tempSprite.index = 0;
    
    return tempSprite;
}

function UIBar(x, y, imageURL, id){
    var tempSprite = new Sprite();
    
    tempSprite.x = x;
    tempSprite.y = y;
    tempSprite.image = Textures.load(imageURL);
    tempSprite.url = imageURL;
    tempSprite.id = id;
    tempSprite.width = 140;
    tempSprite.height = 23;
    tempSprite.index = 0;
    
    return tempSprite;
}

//Create health and hunger bars
function playerIndicator(){
    //health and hunger container elements
    healthHunger["HealthContainer"] = UIContainer(10, 10, "img/HealthContainer.png", "HealthContainer");
    healthHunger["HungerContainer"] = UIContainer(10, 60, "img/HungerContainer.png", "HungerContainer");

    //health and hunger bars
    healthHunger["Health"] = UIBar(15, 30, "img/Health.png", "Health");
    healthHunger["Hunger"] = UIBar(15, 80, "img/Hunger.png", "Hunger");

	for(var obj in healthHunger){
		world.addChild(healthHunger[obj]);
	}
}

//change avatar hunger and health bars
function HealthHungerBar(action){
	hungry++;
	flash++;
    
    var randFoodObj = avatarCollision("randFood");
    var meatFoodObj = avatarCollision("meatFood");
    var boxObj = avatarCollision("box");
    var canniObj = avatarCollision("cannibal");
	
	//Pressing f pick up bread
	if(typeof randFoodObj === "object" && gInput.pickUp && healthHunger["Hunger"].width < 140 && randFoodObj.collided && randFoodObj.created){
	    randFoodObj.remove(this);
		soundEfx["Eating"].play();
		hungry = 0;
		dying = false;
		healthHunger["Hunger"].width += 5;
		randFoodObj.created = false;
	}
    
	//pick up human meat
	if(typeof meatFoodObj === "object" && gInput.pickUp && meatFoodObj.created && meatFoodObj.collided && healthHunger["Hunger"].width < 140){
		meatFoodObj.remove(this);
		soundEfx["Eating"].play();
		hungry = 0;
		dying = false;
		if(healthHunger["Hunger"].width < 130)
			healthHunger["Hunger"].width += 10;
		else {
			healthHunger["Hunger"].width += 5;
			overFlow = true;
		}
		meatCreated--;
		meatFoodObj.created = false;
		meatPresent = false;
	}
	
	//Pressing f find food in box
	if(typeof boxObj === "object" && gInput.pickUp && boxObj.collided && healthHunger["Hunger"].width < 140 && boxObj.created === true && hiding === true && foodPresent === true){
		soundEfx["Eating"].play();
		hungry = 0;
		dying = false;
		healthHunger["Hunger"].width += 5;
		foodPresent = false;
	}
	
	//cannibal kill
	if(typeof canniObj === "object" && canniObj.collided && healthHunger["Health"].width > 0 && canniObj.created === true && hiding === false &&
	   avatar.x <= canniObj.x + canniObj.width - 40){
		healthHunger["Health"].width -= 5;
		soundEfx["CannibalAttack"].play();
	}
	
	//when health is zero
	if(healthHunger["Health"].width <= 0 && finished === false){
		start = false;
		for(var obj in soundEfx){
			soundEfx[obj].pause();
		};
        muteMusic();
		soundEfx["AvatarScream"].play();
		terminated = true;
		createSong("deathSong");
		$("#menuScreens").removeClass("hidden");
		$("#gameOverButtons").removeClass("hidden");
		$("#menuButtons").addClass("hidden");
		$("#menuBackdrops").attr('src', 'img/GameOver.png');
		remainingRestart--;
        
		if(healthHunger["Hunger"].width <= 0 && hiding === false){
			makeText("HungerDeath");
			hungerDown = true;
		}
		else if(healthHunger["Health"].width <= 0 && escapeBox === true && hiding === true){
			makeText("SpecialDeath");
			hiddenBox = true;
		}
		else if(bossFight === true){
			makeText("BossDeath");
			bossSong.muted = true;
			bossSong.muted = true;
			bossSong.muted = true;
			world.removeChild(canniLeader);
			canniLeader.remove(this);
			bossCollision = true;
		}
		else if(typeof canniObj === "object" && canniObj.collided){
			 makeText("HealthDeath");
			 canniCollision = true;
		}
        
		world.removeChild(healthHunger["Hunger"]);
		world.removeChild(healthHunger["Health"]);
		healthHunger["Hunger"].remove(this);
		healthHunger["Health"].remove(this);
		makeText("RestartNum");
		clearInterval(game_loop);
		hungry = 0;
	}
	
	//when hungry or hunger is zero
	if(healthHunger["Hunger"].width <= 0 && hungry >= 130){
		healthHunger["Health"].width -= 10;
		dying = false;
		hungry = 0;
	}
	
	//when avatar is not hungry bread
	if(typeof randFoodObj === "object" && gInput.pickUp && healthHunger["Hunger"].width === 140 && healthHunger["Health"].width < 140 &&
           randFoodObj.collided && randFoodObj.created === true){
		randFoodObj.remove(this);
		soundEfx["Eating"].play(); 
		hungry = 0;
		dying = false;
		healthHunger["Health"].width += 5;
        randFoodObj.created = false;
	}
	
	//meat
	if(typeof meatFoodObj === "object" && (overFlow === true && healthHunger["Health"].width !== 140) || (gInput.pickUp && healthHunger["Hunger"].width === 140 &&
            healthHunger["Health"].width < 140 && meatFoodObj.created === true && meatFoodObj.collided)){
		meatFoodObj.remove(this);
		soundEfx["Eating"].play(); 
		hungry = 0;
		dying = false;
		healthHunger["Health"].width += 5;
		meatFoodObj.created = false;
		overFlow = false;
		meatPresent = false;
	}
	
	//time to determine the hunger of avatar
	if(hungry >= 140 && healthHunger["Hunger"].width > 0){
		healthHunger["Hunger"].width -= 5;
		hungry = 0;
	}
    
    //remove text
    if(hungry >= 25){
		world.removeChild(textInfo["ReminderText"]);
	}
	
	//Show player they have low health
	if(healthHunger["Health"].width <= 40 && flash > 10){
		healthHunger["Health"].image = Textures.load("");
		flash = 0;
	}
	else healthHunger["Health"].image = Textures.load(healthHunger["Health"].url);
    
	//low hunger
	if(healthHunger["Hunger"].width <= 40 && flash > 10){
		healthHunger["Hunger"].image = Textures.load("");
		flash = 0;
	}
	else healthHunger["Hunger"].image = Textures.load(healthHunger["Hunger"].url);
}

function restartGame(){
	if(remainingRestart <= 0)  return;
	
    walk = true;
    background.x = 0;
    foodCreated = true;
    meatCreated = 0;
    alive = true;
    keepHealth = 140;
    keepHunger = 140;
    pushable = true;
    meatPresent = false;
    sneak = false;
    assim = true;
    relocCanni = true;
    notePickUp = true;
    avatar.x = -10;
    
    if(level0 === true && noteCounter > 0){
        noteCounter = 0;
    }
    else if(level1 === true && noteCounter > 1){
        noteCounter = 1;
    }
    else if(level2 === true && noteCounter > 3){
        noteCounter = 3;
    }
    else if(bossFight === true && noteCounter > 5){
        noteCounter = 5;
    }
    
    if(noteCounter > 6){
        noteCounter = 0;
    }
    
    area1 = true;
    area2 = false;
    area3 = false;
    area4 = false;
    area5 = false;
    cannibalSight.remove(this);
    creeper.remove(this);
    restart = true;
    deathSong.muted = true;
    avatar.x = -140;
    start = true;
    RemoveAllObjects();
    $("#menuScreens").addClass("hidden");
    
    if(healthHunger["Hunger"].width <= 0 && canniCollision === false && hungerDown === true && hiding === false)
        world.removeChild(textInfo["HungerDeath"]);
    else if(healthHunger["Health"].width <= 0 && hiddenBox === true)
        world.removeChild(textInfo["SpecialDeath"]);
    else if(bossCollision === true)
        world.removeChild(textInfo["BossDeath"]);
    else if(canniCollision === true) world.removeChild(textInfo["HealthDeath"]);
    if(bossFight === true){
        bossSong.muted = false;
        world.removeChild(canniLeader);
        canniLeader.remove(this);
    }
    
    world.removeChild(textInfo["RestartNum"]);
    escapeBox = false;
    avatar.remove(this);
    
    if(bossCollision === true)
        createSong("bossSong");
    else if(bossFight === false){
         terminated = false;
         backgroundStart = false;
    }
    
    restartCount++;
    canniCollision = false;
    bossCollision = false;
    hungerDown = false;
    LoadContent();
}

function healthRefresh(){
   hungry = 0; dying = true; foodPresent = true; meatPresent = false; remainingRestart = 3;
   canniCollision = false; bossCollision = false; hungerDown = false; hiddenBox = false; overFlow = false; flash = 0;
   healthHunger = {"HealthContainer": 0, "HungerContainer": 0, "Health": 0, "Hunger": 0};
}
