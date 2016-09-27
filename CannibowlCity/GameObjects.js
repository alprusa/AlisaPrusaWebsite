//This file is for making the objects and such for the player to interact with

//0 = trashCan, 1 = platform, 2 = ladder, 3 = box, 4 = randFood, 5 = meatFood, 6 = journal, 7 = wall, 8 = cannibal
var gameObjects = {"trashcan":[], "platform":[], "ladder":[], "box":[], "randFood":[], "meatFood":[], "journal":[], "wall":[], "cannibal":[]};

function gameElement(width, height, x, y, imageURL, id, use, created){
    var tempSprite = new Sprite();
    
    tempSprite.width = width;
    tempSprite.height = height;
    tempSprite.x = x;
    tempSprite.y = y;
    tempSprite.image = Textures.load(imageURL);
    tempSprite.url = imageURL;
    tempSprite.id = id;
    tempSprite.use = use;
    tempSprite.created = created;
    tempSprite.collided = false;
    tempSprite.offScreen = true;
    tempSprite.index = 1;
    
    return tempSprite;
}

function cannibalElement(width, height, x, y, imageURL, id, use, created){
    var tempSprite = new Sprite();
    
    tempSprite.width = width;
    tempSprite.height = height;
    tempSprite.x = x;
    tempSprite.y = y;
    tempSprite.image = Textures.load(imageURL);
    tempSprite.url = imageURL;
    tempSprite.id = id;
    tempSprite.use = use;
    tempSprite.created = created;
    tempSprite.collided = false;
    tempSprite.offScreen = true;
    tempSprite.indexInArray = 0;
    tempSprite.index = 1;
    
    tempSprite.frameWidth = 75;
    tempSprite.frameHeight = 92;
    tempSprite.frameCount = 8;
    tempSprite.frameRate = 8;
    tempSprite.moveRate = 8;
    tempSprite.addAnimations(["idleL", "idleR", "left", "right"], [1,1,3,3]);
    
    return tempSprite;
}

//variables needed to create the trashcan game object
//the zero positoned elements will be removed once all the rest of the code is sorted out
var trashCanXPosition = [[634, 260, 1222],[334, 1746, 2100, 2734],[334, 1860],[1022, 1272]]; //each array set is the x cordinates for all the trashcans in the level
var trashCanYPosition = [[283, 283, 272], [293, 291, 293, 283], [88, 280], [283, 283]];
var trashCan = gameElement(80, 80, 0, 0, "img/trashcanempty.png", "trashcan", true, false);

//variables needed to create the platforms
var platformXPosition = [[345, 1150],[172, 1028, 958, 1796, 2860, 2465],[134, 2528, 3334],[]];
var platformYPosition = [[97, 161],[137, 242, 92, 83, 157, 157],[137, 155, 137],[]];
var platformWidth = [[300, 300],[400, 500, 400, 250, 250, 250],[500, 500, 500],[]]; //only width needs an array so need to test if mix maxting some width/height being arrays and int is fine
var platform = gameElement(300, 40, 0, 0, "img/platform.png", "platform", true, false);

//variables needed to create ladders
var ladderXPosition = [[340, 1347],[290, 1306, 1106, 1803, 2860, 2660],[140, 540, 2566, 2950, 3740],[]];
var ladderYPosition = [[115, 161],[165, 243, 107, 83, 170, 170],[145, 145, 180, 180, 163],[]];
var ladderHeight = [[280, 240],[200, 150, 163, 300, 200, 200],[220, 220, 190, 200, 210],[]];
var ladder = gameElement(60, 280, 0, 0, "img/ladder.png", "ladder", true, false);

//variables needed to create boxes
var boxXPosition = [[500],[334, 1146, 1850, 2983],[1116],[200]];
var boxYPosition = [[40],[80, 35, 30, 100],[280],[280]];
var box = gameElement(90, 90, 0, 0, "img/boxempty.png", "box", true, false);

//variables needed to create random food (bread)
var randFoodXPosition = [[583, 1200],[434, 2560],[1763, 3500, 3443],[]];
var randFoodYPosition = [[345, 160],[140, 155],[320, 145, 345],[]];
var randFood = gameElement(40, 30, 0, 0, "img/bread.png", "randFood", true, false);

//variables needed to create meat food (steak)
//uses the cannibals position arrays to make sure there is an equal number of cannibals and meat
var meatFood = gameElement(40, 40, 0, 0, "img/meat.png", "meatFood", false, false);

//variables needed to create journal or empty script pages before text is added (is this necessary though?)
var journalXPosition = [[443],[600, 2043],[443, 2234, 3600],[1500]];
var journalYPosition = [[345],[353, 345],[345, 340, 130],[345]];
var journal = gameElement(40, 40, 0, 0, "img/scroll.png", "journal", true, false);

//variables needed to create walls
var wallXPosition = [[],[],[300, 2700],[]];
var wallYPosition = [[],[],[180, 190],[]];
var wall = gameElement(30, 190, 0, 0, "img/wall.png", "wall", true, false);

//variables needed to create cannibals
var cannibalsXPosition = [[643, 1443],[434, 1034, 2243, 3043],[443, 1443, 2034, 2834],[]];
var cannibalsYPosition = [[265, 255],[273, 158, 265, 265],[65, 255, 273, 293],[]];
var cannibal = cannibalElement(80, 110, 0, 0, "img/canniset.png", "cannibal", true, false);

//Create game objects
//obj is which object to be added to the gameObjects array
//indexNum is which obj (by index int) is being used so the correct variables are used
//levelNum which level is being created
function gameProps(obj, indexNum, levelNum){
    switch(indexNum){
        case 0://trashcan creator case
            addGameElements(trashCan, trashCanXPosition, 0, levelNum);
            addGameElements(trashCan, trashCanYPosition, 1, levelNum);
            break;
        case 1://platform creator case
            addGameElements(obj, platformXPosition, 0, levelNum);
            addGameElements(obj, platformYPosition, 1, levelNum);
            addGameElements(obj, platformWidth, 2, levelNum);
            break;
        case 2://ladder creator case
            addGameElements(obj, ladderXPosition, 0, levelNum);
            addGameElements(obj, ladderYPosition, 1, levelNum);
            addGameElements(obj, ladderHeight, 3, levelNum);
            break;
        case 3://box creator case
            addGameElements(obj, boxXPosition, 0, levelNum);
            addGameElements(obj, boxYPosition, 1, levelNum);
            break;
        case 4://random food creator case
            addGameElements(obj, randFoodXPosition, 0, levelNum);
            addGameElements(obj, randFoodYPosition, 1, levelNum);
            break;
        case 5://meat food creator case
            addGameElements(obj, cannibalsXPosition, 0, levelNum);
            addGameElements(obj, cannibalsYPosition, 1, levelNum);
            break;
        case 6://journal creator case
            addGameElements(obj, journalXPosition, 0, levelNum);
            addGameElements(obj, journalYPosition, 1, levelNum);
            break;
        case 7://wall creator case
            addGameElements(obj, wallXPosition, 0, levelNum);
            addGameElements(obj, wallYPosition, 1, levelNum);
            break;
       case 8://cannibal creator case
            addGameElements(obj, cannibalsXPosition, 0, levelNum);
            addGameElements(obj, cannibalsYPosition, 1, levelNum);
            break;
    }
}

//obj = obj type to be added and changed
//objarray the array objects that will be changing some variable of the object
//typeToSet is whhat is being changed by the objArray x,y,width,or height
//levelNum the level that the objects are being added to
function addGameElements(obj, objArray, typeToSet, levelNum){
    var newObj = false;
    for(var i = 0; i < objArray[levelNum].length; i++){
        if(gameObjects[obj.id][i] === undefined || gameObjects[obj.id][i] === null) {
            if(obj.id === "cannibal"){
                gameObjects[obj.id][i] = cannibalElement(obj.width, obj.height, 0, 0, obj.url, obj.id, true, false); //add a new obj to gameObjects if this index is unused
                gameObjects[obj.id][i].indexInArray = i;
            }
            else
                gameObjects[obj.id][i] = gameElement(obj.width, obj.height, 0, 0, obj.url, obj.id, true, false); //add a new obj to gameObjects if this index is unused
            newObj = true;
        }
        
        //0 = x position change, 1 = y position, 2 = width, 3 = height
        switch(typeToSet){
            case 0:
                gameObjects[obj.id][i].x = objArray[levelNum][i];
                
                if(gameObjects[obj.id][i].x > 0 && gameObjects[obj.id][i].x < 800)
                    gameObjects[obj.id][i].offScreen = false;
                break;
            case 1:
                gameObjects[obj.id][i].y = objArray[levelNum][i];
                if(obj.id === "meatFood") gameObjects[obj.id][i].y = -10;
                break;
            case 2:
                gameObjects[obj.id][i].width = objArray[levelNum][i];
                break;
            case 3:
                gameObjects[obj.id][i].height = objArray[levelNum][i];
                break;
        }
        
        gameObjects[obj.id][i].created = true;
        if(newObj && obj.id !== "meatFood") world.addChild(gameObjects[obj.id][i]);
        newObj = false;
    }
}

//to delete objects when boss appears
function RemoveAllObjects(){
	for(var gameObj in gameObjects){
        if(gameObjects[gameObj] !== undefined && gameObjects[gameObj].length !== 0){
            for(var i = 0; i < gameObjects[gameObj].length; i++){
                if(gameObjects[gameObj][i] === undefined) break;
                
                gameObjects[gameObj][i].x = -800;
                gameObjects[gameObj][i].remove(this);
                world.removeChild(gameObjects[gameObj][i]);
                gameObjects[gameObj][i] = 0;
            }
        }
	}
    gameObjects = {"trashcan":[], "platform":[], "ladder":[], "box":[], "randFood":[], "meatFood":[], "journal":[], "wall":[], "cannibal":[]};
    
	avatar.remove(this);
	world.removeChild(avatar);
    
    background.remove(this);
    world.removeChild(background);
    
    //maybe also do a remove for the audio since it's reloaded with loadContent
    
	alive = false;
	meatPresent = false;
}

//to make each object needed
function CallObjects(levelNum){
	gameProps(trashCan, 0, levelNum);
    gameProps(platform, 1, levelNum);
    gameProps(ladder, 2, levelNum);
    gameProps(box, 3, levelNum);
    gameProps(randFood, 4, levelNum);
    gameProps(meatFood, 5, levelNum);
    gameProps(journal, 6, levelNum);
    gameProps(wall, 7, levelNum);
    gameProps(cannibal, 8, levelNum);
}
