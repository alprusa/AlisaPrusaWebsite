//This file is to impliment the clickable menu screen and other pop-up windows

//variables for the game screens and info
var note, goBack = false, StarSc = true, stopClicks = 0;

var nonGamePlayScreens = {"Instruction": 0, "Credits": 0, "StartScreen": 0, "GameOver": 0, "Victory": 0};

function gameScreens(imageURL, id){
    var tempSprite = new Sprite();
    
    tempSprite.width = 800;
    tempSprite.height = 550;
    tempSprite.x = 0;
    tempSprite.y = 0;
    tempSprite.image = Textures.load(imageURL);
    tempSprite.url = imageURL;
    tempSprite.id = id;
    tempSprite.index = 0;
    
    return tempSprite;
}

//create actual sprites for screens
function createScreens(obj){
    nonGamePlayScreens[obj] = gameScreens("img/" + obj + ".png");
    world.addChild(nonGamePlayScreens[obj]);
}

//to remove the game screens
function RemoveScreens(){
	for(var obj in nonGamePlayScreens){
        world.removeChild(nonGamePlayScreens[obj]);
	}
}

function startGame(){
	RemoveScreens();
	stopClicks = 1;
	start = true;
	$("#menuScreens").addClass("hidden");
}

function creditsScreen(){
	goBack = true;
	StarSc = false;
	stopClicks = 1;
	$("#menuButtons").addClass("hidden");
	$("#backButton").removeClass("hidden");
	$("#menuBackdrops").attr('src', 'img/Credits.png');
}

function instructionScreen(){
	goBack = true;
	StarSc = false;
	stopClicks = 1;
	$("#menuButtons").addClass("hidden");
	$("#backButton").removeClass("hidden");
	$("#menuBackdrops").attr('src', 'img/Instruction.png');
}

function returnToMenu(){
	goBack = false;
	stopClicks = 0;
	$("#menuButtons").removeClass("hidden");
	$("#backButton").addClass("hidden");
	$("#menuBackdrops").attr('src', 'img/StartScreen.png');
}

function gettingStartedRefresh(){
    note = 0; goBack = false; StarSc = true; stopClicks = 0;
    nonGamePlayScreens = {"Instruction": 0, "Credits": 0, "StartScreen": 0, "GameOver": 0, "Victory": 0};
}