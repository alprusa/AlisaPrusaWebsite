//This file is the main JS file that brings all others together also has implimentation for notes

use2D = true;
initGame("canvas");

//player control variables
var left = 65, right = 68, up = 87, down = 83, enterExit = 32, pickUp = 70, quit = 27, action;

//variables for determining player action
var move = true, walk, jumped = false, pushable = true;

//what happens to cannibals
var meatCreated = 0, alive = true;

//object creation vars
var audioCycle = 0, value = 0, boxDisp = true;

//var for background events
var backgroundStart = false, background, endWall, backWall, terminated = false;

//text to game
var notePickUp = true, keepText = true;

//getting the game started
var start = false, playAudio = false, restart = false, restartCount = 0, keepHealth = 140, keepHunger = 140;

//level variables
var level0 = true, level1 = false, level2 = false, bossFight = false;

var healthBar, hungerBar;

gInput.addBool(left, "left");
gInput.addBool(right, "right");
gInput.addBool(up, "up");
gInput.addBool(down, "down");
gInput.addBool(enterExit, "enterExit");
gInput.addBool(pickUp, "pickUp");
gInput.addBool(quit, "quit");

//Game setup add images
function LoadContent(action) {
	Background();
	levelCreate();
    Avatar();
    playerIndicator();
    healthHunger["Health"].width = keepHealth;
	healthHunger["Hunger"].width = keepHunger;
    
    if(level0 === true && restart === false){
    	createSong("menuSong");
        createNotes();
    }
    
    walk = true;
    foodPresent = true;
    restart = false;
    createWalls();
    finished = false;
    if(typeof game_loop != "undefined") clearInterval(game_loop);
	game_loop = setInterval(CannibowlCity, 60);
}

function levelCreate(){
    SoundEffects();
    
    if(level0 === true){
        //2 sections of objects
    	CallObjects(0);
   	 	CannibalField();
   	 	CannibalFollow();
   	}
   	if(level1 === true){
        //4 sections of objects
        CallObjects(1);
   	 	CannibalField();
   	 	CannibalFollow();
   	}
   	if(level2 === true){
        //5 sections of objects
        CallObjects(2);
   	 	CannibalField();
   	 	CannibalFollow();
   	}
   	if(bossFight === true){
        //2 sections of objects
    	CallObjects(3);
   		Boss();
   		soundEfx["BossLaugh"].play();
   	}
}

//where the game loops through the files
function CannibowlCity(){
	//play main soundtrack once
	if(start === true && backgroundStart === false){
		menuSong.muted = true;
        createSong("mainSong");
		backgroundStart = true;
	}
	
	//Begin the game
	if(start === true){
		canvas.focus();
		HealthHungerBar();
		wKey();
		Hide();
		Pushing();
		Movement();
		AreaChange();
		NextLevel();
		if(bossFight === false){
			CannibalAction();
		}
		if(bossFight === true){
			BossActions();
		}
	}
	
	//display text for telling player to eat
	if(start === true && keepText === true){
		makeText("ReminderText");
		keepText = false;
	}
	//stop song for deathsong
	if(terminated === true){
		mainSong.muted = true;
	}
    
    var dateObj = new Date();
    var curTime = dateObj.getTime();
	NotePickUp(action, curTime);
    
    if(gInput.quit){
        quitGame();
    }
}

//quit game
function quitGame(){
	start = true;
    RemoveAllObjects();
    //player control variables
    action = 0;

    //variables for determining player action
    move = true; walk = 0; jumped = false; pushable = true;

    //what happens to cannibals
    meatCreated = 0; alive = true;

    //object creation vars
    audioCycle = 0; value = 0; boxDisp = true;

    //var for background events
    backgroundStart = false; background = 0; endWall = 0; backWall = 0; terminated = false;

    //text to game
    notePickUp = true; keepText = true;

    //getting the game started
    start = false; playAudio = false; restart = false; restartCount = 0; keepHealth = 140; keepHunger = 140;

    //level variables
    level0 = true; level1 = false; level2 = false; bossFight = false;

    healthBar = 0; hungerBar = 0;
    
    finished = false;
    
    cameraQuit();
    cannibalQuit();
    healthRefresh();
    hidingQuit();
    notesQuit();
    wKeyQuite();
    avatarRefresh();
    boxQuit();
    bossQuit();
    gettingStartedRefresh();
    textRefresh();
    soundRefresh();
    muteMusic();
    LoadContent(0);
}
