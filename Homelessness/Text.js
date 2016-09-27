//This file is for the added text to the game

//array for each text element
var textInfo = {};

function gameText(x, y, content, id){
    var tempSprite = new TextBox();
    
    tempSprite.x = x;
    tempSprite.y = y;
    tempSprite.fontSize = 10;
    tempSprite.color = "white";
    tempSprite.text = content;
    tempSprite.id = id;
    tempSprite.index = 0;
    
    return tempSprite;
}

//create text items and set in an dictionary
function makeTextDict(){
    for(var name in pagesContent){
    	for(var i = 0; i < pagesContent[name].length; i++){
    		if(textInfo[name] === undefined) textInfo[name] = [];
    		textInfo[name][i] = pagesContent[name];
    	}
    }
}

function getPersonText(obj, indexNum){
	if(pagesContent[obj] !== undefined) return pagesContent[obj][indexNum];
}

//information text
function makeText(obj, index){
    if(typeof textInfo[obj] === "object") world.addChild(textInfo[obj][index]);
}

function removeText(obj, index){
	//console.log(textInfo[obj][index]);
	if(typeof textInfo[obj] === "object") world.removeChild(textInfo[obj][index]);
}

function textRefresh(){
    textInfo = {"Batman": 0};
}
