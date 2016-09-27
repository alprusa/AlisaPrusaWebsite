var canvas;
var cWidth = 1000;
var cHeight = 600;

var mouseClickRadius = 30;

var matrixImage;

var phoneDisplayImages = [];
var phoneIndex;
var prePhoneIndex;

var EgyptianRevolution;
var OccupyWallStreetV;

var phoneBody;
var phoneX = cWidth/2;
var phoneY = 10;
var phoneOrigHeight = 853;
var phoneOrigWidth = 550;
var phoneAdjustX = 150;
var phoneAdjustY = 250;
        
var binaryTextStrips = [];
var binaryTimer;
var binaryTextWidth = 40;
var binaryTextHeight = 424;

var messageToggle = 0;
var rightText = false;
var phoneClosed = false;
        
function preload() {
    restrauntReservation = loadStrings('p5-Project3/assets/RestaurantReservation.txt');
      
    matrixStart = loadImage('p5-Project3/assets/matrixStart.jpg');
    
    EgyptianRevolution = createVideo(['p5-Project3/assets/Egypt.mp4', 'p5-Project3/assets/Egypt.webm']);
    OccupyWallStreetV = createVideo(['p5-Project3/assets/WallStreet.mp4', 'p5-Project3/assets/WallStreet.webm']);
    
    phoneDisplayImages[0] = loadImage('p5-Project3/assets/PhoneDisplay.png');
    phoneDisplayImages[1] = loadImage('p5-Project3/assets/BahrainiRevolt.png');
    phoneDisplayImages[2] = loadImage('p5-Project3/assets/EgyptUprising1.png');
    phoneDisplayImages[3] = loadImage('p5-Project3/assets/InternationalHackers.png');
    phoneDisplayImages[4] = loadImage('p5-Project3/assets/OccupyWallStreet.png');
    phoneDisplayImages[5] = loadImage('p5-Project3/assets/SyrianRevolution.png');
    phoneDisplayImages[6] = loadImage('p5-Project3/assets/YesAllWomen.png');
    phoneDisplayImages[7] = loadImage('p5-Project3/assets/LondonRiots.png');
    
    binaryTextStrips[0] = [loadImage('p5-Project3/assets/BinaryStripText1.png'), cWidth/12, cHeight/28];  //0 - string, 1 - xPos, 2 - yPos
    binaryTextStrips[1] = [loadImage('p5-Project3/assets/BinaryStripText2.png'), cWidth/4.5, cHeight/8];  //0 - string, 1 - xPos, 2 - yPos
    binaryTextStrips[2] = [loadImage('p5-Project3/assets/BinaryStripText3.png'), cWidth/2.9, cHeight/4];  //0 - string, 1 - xPos, 2 - yPos
    binaryTextStrips[3] = [loadImage('p5-Project3/assets/BinaryStripText4.png'), cWidth/2.2, cHeight/28.5];  //0 - string, 1 - xPos, 2 - yPos
    binaryTextStrips[4] = [loadImage('p5-Project3/assets/BinaryStripText5.png'), cWidth/1.7, cHeight/6];  //0 - string, 1 - xPos, 2 - yPos
    binaryTextStrips[5] = [loadImage('p5-Project3/assets/BinaryStripText6.png'), cWidth/1.4, cHeight/110];  //0 - string, 1 - xPos, 2 - yPos
    binaryTextStrips[6] = [loadImage('p5-Project3/assets/BinaryStripText7.png'), cWidth/1.19, cHeight/4];  //0 - string, 1 - xPos, 2 - yPos
}

function setup() {
  	canvas = createCanvas(cWidth, cHeight);
  	canvas.class("canvasMain");
  	canvas.parent("processingContainer");
    
    EgyptianRevolution.hide();
    OccupyWallStreetV.hide();
}

function draw() {
    binaryTimer = second();
	background(0,0,0);
	image(matrixStart, 0, 0, cWidth, cHeight);
    
    //Display and resize the Binary text strips
    for(var i = 0; i < binaryTextStrips.length; i++){
        if(binaryTimer % 3 == 0){
            binaryTextWidth = 40;
            binaryTextHeight = 424;
            image(binaryTextStrips[i][0], binaryTextStrips[i][1], binaryTextStrips[i][2], binaryTextWidth, binaryTextHeight);
        }
        else{
            binaryTextWidth = 48;
            binaryTextHeight = 432;
            image(binaryTextStrips[i][0], binaryTextStrips[i][1], binaryTextStrips[i][2], binaryTextWidth, binaryTextHeight);
        }
        
        if(mouseIsPressed && collisionBinary(mouseX, binaryTextStrips[i][1], mouseY, binaryTextStrips[i][2])) {
            messageToggle = 1;
            if(mouseX < cWidth/2) rightText = true;
            else rightText = false;
            phoneIndex = i;
        }
    }
    
    //display the phone image
    if(messageToggle > 0){
        displayPhone(phoneIndex);
        
        if(mouseIsPressed && collisionPhone(mouseX, phoneX, mouseY, phoneY) && messageToggle == 2){
            prePhoneIndex = phoneIndex;
            messageToggle = 0;
            phoneClosed = true;
        }
        
        if(!mouseIsPressed) messageToggle = 2;
    }
    
    if(phoneIndex != prePhoneIndex) phoneClosed = false;
    
    if(phoneClosed) OccupyWallStreetV.pause();
    if(phoneClosed) EgyptianRevolution.pause();
    
    fill(255,255,255);
    textSize(32);
    if(binaryTimer % 3 == 0) text("Send your message", mouseX-120, mouseY-5);
    else text("Click binary strips", mouseX-120, mouseY-5);
}

function collisionBinary(x1,x2,y1,y2){
	return x1 < x2 + binaryTextWidth && x1 + mouseClickRadius > x2
	    && y1 < y2 + binaryTextHeight && y1 + mouseClickRadius > y2;
}

function collisionPhone(x1,x2,y1,y2){
	return x1 < x2 + (phoneOrigWidth-phoneAdjustX) && x1 + mouseClickRadius > x2 && y1 < y2 + (phoneOrigHeight-phoneAdjustY) && y1 + mouseClickRadius > y2;
}

function displayPhone(index){
    if(rightText){
        phoneX = cWidth/2;
    }
    else{
        phoneX = cWidth/10;
    }
        
    switch(index){
        case 0:
            image(phoneDisplayImages[6], phoneX, phoneY, phoneOrigWidth-phoneAdjustX, phoneOrigHeight-phoneAdjustY);
            break;
        case 1:
            image(phoneDisplayImages[5], phoneX, phoneY, phoneOrigWidth-phoneAdjustX, phoneOrigHeight-phoneAdjustY);
            break;
        case 2:
            OccupyWallStreetV.loop();
            image(OccupyWallStreetV, phoneX-400, phoneY, 500, 340);
            image(phoneDisplayImages[4], phoneX, phoneY, phoneOrigWidth-phoneAdjustX, phoneOrigHeight-phoneAdjustY);
            break;
        case 3:
            image(phoneDisplayImages[7], phoneX, phoneY, phoneOrigWidth-phoneAdjustX, phoneOrigHeight-phoneAdjustY);
            break;
        case 4:
            EgyptianRevolution.loop();
            image(EgyptianRevolution, phoneX+300, phoneY, 500, 340);
            image(phoneDisplayImages[2], phoneX, phoneY, phoneOrigWidth-phoneAdjustX, phoneOrigHeight-phoneAdjustY);
            break;
        case 5:
            image(phoneDisplayImages[3], phoneX, phoneY, phoneOrigWidth-phoneAdjustX, phoneOrigHeight-phoneAdjustY);
            break;
        case 6:
            image(phoneDisplayImages[1], phoneX, phoneY, phoneOrigWidth-phoneAdjustX, phoneOrigHeight-phoneAdjustY);
            break;
        default:
            image(phoneDisplayImages[0], phoneX, phoneY, phoneOrigWidth-phoneAdjustX, phoneOrigHeight-phoneAdjustY);
            break;
        
    }

    if(index != 2) OccupyWallStreetV.pause();
    if(index != 4) EgyptianRevolution.pause();
}
