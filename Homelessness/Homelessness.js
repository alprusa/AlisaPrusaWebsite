//var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var scale = 1;
use2D = true;
initGame("canvas");

//player control variables
var left = 37, right = 39, up = 87, down = 83, chat = 32, quit = 27;

//variables for determining player action
var move = true, walk, jumped = false;

//object creation vars
var audioCycle = 0, value = 0;

//var for background events
var backgroundStart = false, background, endWall, backWall, terminated = false;

//text to game
var notePickUp = true, keepText = true;

//getting the game started
var start = true, playAudio = false, restart = false, restartCount = 0;

//level variables
var level0 = true, level1 = false, level2 = false;

//save data
var peopleTalkedTo = [];
var endTime;

gInput.addBool(left, "left");
gInput.addBool(right, "right");
gInput.addBool(up, "up");
gInput.addBool(down, "down");
gInput.addBool(chat, "chat");
gInput.addBool(quit, "quit");

//Game setup add images
function LoadContent(action) {
	Background();
	CallObjects(); //create all objects in the sections
	//PointsOfInterest();
	
    Avatar();
    makeTextDict();
    
    walk = true;
    restart = false;
    createWalls();
    finished = false;
    
    createSong("mainSong");
	SoundEffects();
	
	var dateObj = new Date();
    endTime = dateObj.getTime() + 40000;
    
    canvas.focus();
	
    if(typeof game_loop != "undefined") clearInterval(game_loop);
	game_loop = setInterval(CannibowlCity, 60);
}

//where the game loops through the files
function CannibowlCity(){
	//ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	//Begin the game
	if(start === true){
		Movement();
		AreaChange();
	}
    
    var dateObj = new Date();
    var curTime = dateObj.getTime();
	NotePickUp(curTime);
	
	if(curTime > endTime) {
		$('#report').removeClass('hidden');
		$('#win').addClass('hidden');
		
        var reportData = document.getElementById('reportData').innerHTML;
        reportData = "<h3>Report Log</h3><br>People Talked To:";
        
        for(var i = 0; i < peopleTalkedTo.length; i++){
        	document.getElementById('reportData').innerHTML = reportData + "<br>" + (i + 1) + ". " + peopleTalkedTo[i];
        	reportData = document.getElementById('reportData').innerHTML;
        }
        
		clearInterval(game_loop);
	}
    
    if(gInput.quit){
        quitGame();
    }
}

/*function PointsOfInterest(){
	var markers = document.getElementById("markers");
	var point = document.getElementsByClassName('point');
	if(point !== null) {
		for(var i = 0; i < point.length; i++)
			markers.removeChild(point[i]);
	}
	
	var people = "people";
	
	for(var i = 0; i < gameObjects[people].length; i++){
		if(gameObjects[people][i].x >= 0 && gameObjects[people][i].x < canvas.width){
			var img = document.createElement("img");
			img.src = "img/pointOfInterest.png";
			$(img).addClass("point");
			img.style.position = "absolute";
			img.style.left = ((gameObjects[people][i].x + canvas.width) * i + 50) + "px";
			markers.appendChild(img);
		}
	}
}*/

function restartPage(){
	location.reload();
}

//quit game
function quitGame(){
	start = true;
    RemoveAllObjects();
    //player control variables
    action = 0;

    //variables for determining player action
    move = true; walk = 0; jumped = false;

    //object creation vars
    audioCycle = 0; value = 0;

    //var for background events
    backgroundStart = false; background = 0; endWall = 0; backWall = 0; terminated = false;

    //text to game
    notePickUp = true; keepText = true;

    //getting the game started
    start = false; playAudio = false; restart = false; restartCount = 0;

    //level variables
    level0 = true; level1 = false; level2 = false;
    
    finished = false;
    
    cameraQuit();
    avatarRefresh();
    gettingStartedRefresh();
    textRefresh();
    //soundRefresh();
    muteMusic();
    LoadContent(0);
}
