//This file is for the added text to the game

//array for each text element
var textInfo = {"ReminderText": 0, "HungerDeath": 0, "HealthDeath": 0, "BossDeath": 0, "RestartNum": 0, "SpecialDeath": 0};

function gameText(x, y, content, id){
    var tempSprite = new TextBox();
    
    tempSprite.x = x;
    tempSprite.y = y;
    tempSprite.fontSize = 32;
    tempSprite.color = "white";
    tempSprite.text = content;
    tempSprite.id = id;
    tempSprite.index = 0;
    
    return tempSprite;
}

//information text
function makeText(obj){
    switch(obj){
        case "ReminderText":
            textInfo[obj] = gameText(150, 200, "Remember to Eat", "ReminderText");
            break;
        case "HungerDeath":
            textInfo[obj] = gameText(220, 230, "You Have Died of Hunger", "HungerDeath");
            $("#deathMessage").text("You Have Died of Hunger");
            break;
        case "HealthDeath":
            textInfo[obj] = gameText(190, 230, "You Have Been Cannibalized", "HealthDeath"); //this one is not always true
            $("#deathMessage").text("You Have Been Cannibalized");
            break;
        case "BossDeath":
            textInfo[obj] = gameText(260, 230, "You Were Defeated", "BossDeath");
            $("#deathMessage").text("You Were Defeated");
            break;
        case "RestartNum":
            textInfo[obj] = gameText(320, 50, "Restarts: ", "RestartNum");
            $("#restartVal").text("Restarts: " + remainingRestart);
            textInfo[obj].text += remainingRestart;
            break;
        case "SpecialDeath":
            textInfo[obj] = gameText(65, 230, "You've Been Killed by the Bones of Your Enemy", "SpecialDeath");
            $("#deathMessage").text("You've Been Killed by the Bones of Your Enemy");
            break;
    }
    
	if(typeof textInfo[obj] === "object") world.addChild(textInfo[obj]);
}

function textRefresh(){
    textInfo = {"ReminderText": 0, "HungerDeath": 0, "HealthDeath": 0, "BossDeath": 0, "RestartNum": 0, "SpecialDeath": 0};
}
