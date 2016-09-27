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

//impliment and build feature screens
function BeforeGame(){
	if(StarSc === true){
        createScreens("StartScreen");
    }
    
	function mousePosStart(event) {
        var x = event.clientX;
        var y = event.clientY;
        
        //go back to menu screen
        if(x > 494 && x < 605 && y > 493 && y < 529 && goBack === true && finished === false){
        	goBack = false;
        	stopClicks = 0;
        	world.removeChild(nonGamePlayScreens["StartScreen"]);
        	createScreens("StartScreen");
        }
        
        //instruction screen
        if(x > 744 && x < 957 && y > 340 && y < 403 && stopClicks === 0 && finished === false){
        	goBack = true;
        	StarSc = false;
        	stopClicks = 1;
        	world.removeChild(nonGamePlayScreens["Instruction"]);
        	createScreens("Instruction");
        }
        
        //credits screen
        if(x > 744 && x < 957 && y > 426 && y < 491 && stopClicks === 0 && finished === false){
        	goBack = true;
        	StarSc = false;
        	stopClicks = 1;
        	world.removeChild(nonGamePlayScreens["Credits"]);
        	createScreens("Credits");
        }
        
        //start game
        if(x > 720 && x < 980 && y > 234 && y < 319 && goBack === false && finished === false){
            RemoveScreens();
        	stopClicks = 1;
        	start = true;
        }
	}
    
	$("#canvas").on("click", function (event) {
        mousePosStart(event);
	});
}

function gettingStartedRefresh(){
    note = 0; goBack = false; StarSc = true; stopClicks = 0;
    nonGamePlayScreens = {"Instruction": 0, "Credits": 0, "StartScreen": 0, "GameOver": 0, "Victory": 0};
}