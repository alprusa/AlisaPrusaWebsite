//This file is for the feature of hiding in objects for the player

//Set up hiding in containers
var hiding = false, count = 0, boxEnter = false, trashEnter = false, exitObj = false, keepCount = false, escapeBox = false;

//Pressing e
function Hide(){
    //when player releasees E key
    if(gInput.bools["enterExit"] === false){
        if(hiding === true || keepCount === true){
            count++;
        }
        if(count >= 2){
            exitObj = true;
        }
        if(count >= 4 && keepCount === true){
            exitObj = false;
            keepCount = false;
            escapeBox = false;
            count = 0;
        }
    }
    
    if(gameObjects["box"] !== undefined) boxHide();
    if(gameObjects["trashcan"] !== undefined) trashcanHide();
}
    
function boxHide(){
    var boxColVal = avatarCollision("box");
    var pcColValArray = objectCollision("platform", "cannibal");
    
     //to activate hiding for player
    if(typeof boxColVal === "object" && gInput.enterExit && boxColVal.collided && boxColVal.created && exitObj === false){
        soundEfx["EnterContainer"].play();
        boxColVal.image = Textures.load("img/boxeyes.png");
        avatar.image = Textures.load("");
        move = false;
        hiding = true;
    }
    
    //to exit the objects
    if(typeof boxColVal === "object" && exitObj === true && gInput.enterExit && hiding === true && boxColVal.created && boxColVal.collided){
        if(escapeBox === false)
            boxColVal.image = Textures.load(boxColVal.url);
        avatar.image = Textures.load(avatar.url);
        soundEfx["EnterContainer"].play();
        move = true;
        boxEnter = false;
        keepCount = true;
        hiding = false;
    }
    
    if(typeof boxColVal === "object") boxColVal.collided = false;
}

function trashcanHide(){
    var trashCanColVal = avatarCollision("trashcan");
    
    //to activate hiding for player
    if(typeof trashCanColVal === "object" && gInput.enterExit && trashCanColVal.collided && exitObj === false){
        soundEfx["EnterContainer"].play();
        trashCanColVal.image = Textures.load("img/trashcaneyes.png");
        avatar.image = Textures.load("");
        move = false;
        hiding = true;
    }
    
    //else soundEfx["EnterContainer"].pause();
    //to exit the objects
    else if(typeof trashCanColVal === "object" && exitObj === true && gInput.enterExit && hiding === true && trashCanColVal.collided){
        trashCanColVal.image = Textures.load(trashCanColVal.url);
        avatar.image = Textures.load(avatar.url);
        soundEfx["EnterContainer"].play();
        move = true;
        trashEnter = false;
        keepCount = true;
        hiding = false;
    }
    //else soundEfx["EnterContainer"].pause();
    
    if(typeof trashCanColVal === "object" ) trashCanColVal.collided = false;
}

function hidingQuit(){
    hiding = false; count = 0; boxEnter = false; trashEnter = false; exitObj = false; keepCount = false; escapeBox = false;
}