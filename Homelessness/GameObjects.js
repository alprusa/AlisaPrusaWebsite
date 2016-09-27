//This file is for making the objects and such for the player to interact with
var canvas = document.getElementById('canvas');

//0 = people, 1 = wall
var gameObjects = {"people":[], "dinner":[], "church": [], "shelter": [], "school": [], "bank": [], "hospital": [], "cycleWalls": [], "pointOfInterest": []};

function gameElement(width, height, x, y, areaLoc, imageURL, id, name, use, created){
    var tempSprite = new Sprite();
    
    tempSprite.width = width;
    tempSprite.height = height;
    tempSprite.x = x;
    tempSprite.y = y;
    tempSprite.areaLoc = areaLoc;
    tempSprite.image = Textures.load(imageURL);
    tempSprite.url = imageURL;
    tempSprite.id = id;
    tempSprite.name = name;
    tempSprite.use = use;
    tempSprite.created = created;
    tempSprite.collided = false;
    tempSprite.offScreen = true;
    tempSprite.index = 1;
    
    return tempSprite;
}

//variables needed to create people or empty script pages before text is added
var peopleXPosition = [9, 300, 350, 550, 700, 1000, 1300];
var people = gameElement(20, 30, 0, 115, 0, "img/person0.png", "people", "people", true, false);

var pointsOfXPosition = [9, 300, 350, 550, 700, 1000, 1300];
var pointsOfInterest = gameElement(15, 20, 0, 0, 0, "img/pointOfInterest.png", "pointOfInterest", "pointOfInterest", true, false);

//variables needed to create buildings
var dinerX = 5;
var dinner = gameElement(250, 150, 5, 20, 0, "img/McDs_NP.png", "dinner", "dinner", true, false);

var churchX = 250;
var church = gameElement(150, 150, 250, 9, -canvas.width, "img/Church_NP.png", "church", "church", true, false);

var shelterX = 400;
var shelter = gameElement(250, 150, 400, -9, -canvas.width, "img/House1_NP.png", "shelter", "shelter", true, false);

var schoolX = 600;
var school = gameElement(400, 170, 600, 5, -(canvas.width * 2), "img/School_NP.png", "school", "school", true, false);

var bankX = 900;
var bank = gameElement(400, 150, 900, 17, -(canvas.width * 4), "img/Bank_NP.png", "bank", "bank", true, false);

var hospitalX = 1300;
var hospital = gameElement(100, 150, 1300, 20, -(canvas.width * 5), "img/Hospital_NP.png", "hospital", "hospital", true, false);

var dinnerWallX = 5;
var leftWall = gameElement(20, 550, 5, 0, 5, "img/AreaWall.png", "cycleWalls", "leftWall", true, false);

var hospitalWallX = 1300;
var rightWall = gameElement(20, 550, 1300, 0, -(canvas.width * 5), "img/AreaWall.png", "cycleWalls", "rightWall", true, false);

var navBar = 0;
var NavBar = gameElement(canvas.width, 10, 0, 5, 0, "img/line-bar.png", "navBar", "navBar", true, false);

//Create game objects
//obj is which object to be added to the gameObjects array
//indexNum is which obj (by index int) is being used so the correct variables are used
//levelNum which level is being created
function gameProps(obj, indexNum, objArray){
    switch(indexNum){
        case 0://people creator case
            addGameElements(obj, objArray, 0);
            break;
        case 1://building creator case
        	var len = gameObjects[obj.id].length;
        	len < 0 ? len = 0 : false;

        	if(gameObjects[obj.id][len] === undefined || gameObjects[obj.id][len] === null) {
	            gameObjects[obj.id][len] = obj; //add a new obj to gameObjects if this index is unused
	        }
            if(gameObjects[obj.id][len].x > 0 && gameObjects[obj.id][len].x < 800)
           		 gameObjects[obj.id][len].offScreen = false;
        
	        gameObjects[obj.id][len].created = true;
	        world.addChild(gameObjects[obj.id][len]);
            break;
    }
}

//obj = obj type to be added and changed
//objarray the array objects that will be changing some variable of the object
//typeToSet is whhat is being changed by the objArray x,y,width,or height
//levelNum the level that the objects are being added to
function addGameElements(obj, objArray, typeToSet){
    for(var i = 0; i < objArray.length; i++){
        if((gameObjects[obj.id][i] === undefined || gameObjects[obj.id][i] === null) && obj.id === "people") {
    		obj.url = "img/person" + i + ".png";
    		var counter = 0;
    		for(var name in pagesContent){
    			if(counter === i){
    				gameObjects[obj.id][i] = gameElement(obj.width, obj.height, 0, obj.y, 0, obj.url, obj.id, name, true, false); //add a new obj to gameObjects if this index is unused
    				break;
    			}
    			counter++;
    		}
        }
        else{
        	gameObjects[obj.id][i] = gameElement(obj.width, obj.height, 0, obj.y, 0, obj.url, obj.id, name, true, false); //add a new obj to gameObjects if this index is unused
        }
        
        gameObjects[obj.id][i].x = objArray[i];
        
        if(gameObjects[obj.id][i].x > 0 && gameObjects[obj.id][i].x < 800)
            gameObjects[obj.id][i].offScreen = false;
        
        gameObjects[obj.id][i].created = true;
        world.addChild(gameObjects[obj.id][i]);
    }
}

//to delete objects
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
    gameObjects = {"people":[], "dinner":[], "church": [], "shelter": [], "school": [], "bank": [], "hospital": [], "cycleWalls": [], "pointOfInterest": []};
    
	avatar.remove(this);
	world.removeChild(avatar);
    
    background.remove(this);
    world.removeChild(background);
}

//to make each object needed
function CallObjects(){
    gameProps(dinner, 1, null);
    gameProps(shelter, 1, null);
    gameProps(hospital, 1, null);
    gameProps(bank, 1, null);
    gameProps(school, 1, null);
    gameProps(church, 1, null);
    //gameProps(leftWall, 1, null);
    //gameProps(rightWall, 1, null);
    
    world.addChild(NavBar);
    gameProps(pointsOfInterest, 0, pointsOfXPosition);
    
    gameProps(people, 0, peopleXPosition);
}

//detect collions for objects to end of area
function collisionWall(obj, wall){
    if(obj === undefined || wall === undefined) return;
    
	return obj.x < wall.x + wall.width && 
		obj.x + obj.width > wall.x && 
		obj.y < wall.y + wall.height &&
		obj.y + obj.height > wall.y;
}
