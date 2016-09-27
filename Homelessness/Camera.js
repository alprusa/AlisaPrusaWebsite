//This file is for changing the area that the player is interaction with

//var for determining about going back and forth
var shift_forward, areaChanged = false;

//save area start locations

//move the background and such to change level/areas
function AreaChange(){//shift items or allow player to go back
	if(avatarWallCollision(endWall) && hospital.x < avatar.x && !areaChanged){
		Cycle(300);
		areaChanged = true;
	}
	
	else if(avatarWallCollision(backWall) && dinner.x > avatar.x && !areaChanged){
		Cycle(-1400);
		areaChanged = true;
	}
	
	if(gameObjects["hospital"][0].offScreen) areaChanged = false;
	if(gameObjects["dinner"][0].offScreen) areaChanged = false;
}

function ShiftAreaForward(){
    var moveBy = 2;
    //PointsOfInterest();
    
	//move to next area
                
	for(var obj in gameObjects){
        if(obj !== undefined && obj.length !== 0){
            for(var i = 0; i < obj.length; i++){
                if(gameObjects[obj][i] === undefined) break;
                
                gameObjects[obj][i].x -= moveBy;
               	
                if(gameObjects[obj][i].x >= background.x || gameObjects[obj][i].x + gameObjects[obj][i].width <= background.width)
                    gameObjects[obj][i].offScreen = false;
                else
                    gameObjects[obj][i].offScreen = true;
            }
        }
	}
	notePickUp = true;
}

function ShiftAreaBack(){
    var moveBy = 2;
    //PointsOfInterest();
    
	//shift items or allow player to go back
	for(var obj in gameObjects){
        if(obj !== undefined && obj.length !== 0){
            for(var i = 0; i < obj.length; i++){
                if(gameObjects[obj][i] === undefined) break;
                
                gameObjects[obj][i].x += moveBy;
                
                if(gameObjects[obj][i].x >= background.x || gameObjects[obj][i].x + gameObjects[obj][i].width <= background.width)
                    gameObjects[obj][i].offScreen = false;
                else
                    gameObjects[obj][i].offScreen = true;
            }
        }
	}
	notePickUp = true;
}

function Cycle(setBack){
	//PointsOfInterest();
	//shift items or allow player to go back

	for(var obj in gameObjects){
        if(obj !== undefined && obj.length !== 0){
            for(var i = 0; i < obj.length; i++){
                if(gameObjects[obj][i] === undefined) break;

                switch(gameObjects[obj][i].id){
                    case "people":
                    	if(gameObjects[obj][i].offScreen)
                        	gameObjects[obj][i].x = peopleXPosition[i] + setBack;
                        break;
                    case "dinner":
                    	if(gameObjects[obj][i].offScreen)
                        	gameObjects[obj][i].x = dinerX + setBack;
                        break;
                    case "church":
                    	if(gameObjects[obj][i].offScreen)
                        	gameObjects[obj][i].x = churchX + setBack;
                        break;
                    case "shelter":
                   	 	if(gameObjects[obj][i].offScreen)
                        	gameObjects[obj][i].x = shelterX + setBack;
                        break;
                    case "school":
                    	if(gameObjects[obj][i].offScreen)
                        	gameObjects[obj][i].x = schoolX + setBack;
                        break;
                    case "bank":
                    	if(gameObjects[obj][i].offScreen)
                        	gameObjects[obj][i].x = bankX + setBack;
                        break;
                    case "hospital":
                   		if(gameObjects[obj][i].offScreen)
                        	gameObjects[obj][i].x = hospitalX + setBack;
                        break;
                    case "pointOfInterest":
                    	if(gameObjects[obj][i].offScreen)
                        	gameObjects[obj][i].x = pointsOfXPosition[i] + setBack;
                        break;
                    /*case "cycleWalls":
               		if(gameObjects[obj][i].offScreen && gameObjects[obj][i].name == "leftWall")
                    	gameObjects[obj][i].x = gameObjects["dinner"][0].x;
                  	else if(gameObjects[obj][i].offScreen && gameObjects[obj][i].name == "rightWall")
                    	gameObjects[obj][i].x = gameObjects["hospital"][0].x;
                    break;*/
                }
                
                if(gameObjects[obj][i].x >= background.x || gameObjects[obj][i].x + gameObjects[obj][i].width <= background.width)
                    gameObjects[obj][i].offScreen = false;
                else
                    gameObjects[obj][i].offScreen = true;
            }
        }
	}
}

function JumpToPos(building, origX){
	building.areaLoc = origX;
	//PointsOfInterest();
	
	for(var obj in gameObjects){
        if(obj !== undefined && obj.length !== 0){
            for(var i = 0; i < obj.length; i++){
                if(gameObjects[obj][i] === undefined) break;

                switch(gameObjects[obj][i].id){
                    case "people":
                    	gameObjects[obj][i].x = peopleXPosition[i] - building.areaLoc;
                        break;
                    case "dinner":
                    	gameObjects[obj][i].x = dinerX - building.areaLoc;
                        break;
                    case "church":
                    	gameObjects[obj][i].x = churchX - building.areaLoc;
                        break;
                    case "shelter":
                    	gameObjects[obj][i].x = shelterX - building.areaLoc;
                        break;
                    case "school":
                    	gameObjects[obj][i].x = schoolX - building.areaLoc;
                        break;
                    case "bank":
                    	gameObjects[obj][i].x = bankX - building.areaLoc;
                        break;
                    case "hospital":
                    	gameObjects[obj][i].x = hospitalX - building.areaLoc;
                        break;
                    case "pointOfInterest":
                    	if(gameObjects[obj][i].offScreen)
                        	gameObjects[obj][i].x = pointsOfXPosition[i] - building.areaLoc;
                        break;
                    /*case "cycleWalls":
                   		if(gameObjects[obj][i].offScreen && gameObjects[obj][i].name == "leftWall")
                        	gameObjects[obj][i].x = gameObjects["dinner"][0].x;
                      	else if(gameObjects[obj][i].offScreen && gameObjects[obj][i].name == "rightWall")
                        	gameObjects[obj][i].x = gameObjects["hospital"][0].x;
                        break;*/
                }
                
                if(gameObjects[obj][i].x >= background.x || gameObjects[obj][i].x + gameObjects[obj][i].width <= background.width)
                    gameObjects[obj][i].offScreen = false;
                else
                    gameObjects[obj][i].offScreen = true;
            }
        }
	}
	
	avatar.x = building.x;
	
	if(building.name === "hospital") Cycle(300);
	
	canvas.focus();
}

function Zoomin(scaleBy, moveByY, avatarMovY, personObj){
	for(var obj in gameObjects){
        if(obj !== undefined && obj.length !== 0){
            for(var i = 0; i < obj.length; i++){
                if(gameObjects[obj][i] !== undefined && obj !== "pointOfInterest" && obj !== "people"){
	                gameObjects[obj][i].width += scaleBy;
	                gameObjects[obj][i].height += scaleBy;
	                gameObjects[obj][i].y -= moveByY;
                }
            }
        }
	}
	
	personObj.width += scaleBy;
    personObj.height += scaleBy;
    personObj.y -= moveByY;
	avatar.width += (scaleBy + scaleBy);
	avatar.height += (scaleBy + scaleBy);
	avatar.y -= (moveByY + avatarMovY);
}

function cameraQuit(){
    area1 = true; area2 = false; area3 = false; area4 = false; area5 = false;
}
