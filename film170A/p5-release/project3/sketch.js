var canvas;
var cWidth = screen.width*0.6;
var cHeight = screen.height*0.95;

var currentPoem;
var resartPoem;

var mononokeImage1;
var mononokeImage2;
var wearyImage;
var starsImage;
var spiritedAwayImage1;
var spiritedAwayImage2;
var mountainImage;
var forestImage;
var hatImage;

var section1 = [];
var section2 = [];
var section3 = [];
var section4 = [];

var sec1Active = false;
var sec2Active = false;
var sec3Active = false;
var sec4Active = false;

var posXMain;
var posYMain;
var time;
var currTime;
var imageTime;

var angleXChange = 50;
var angleYChange = 1;
        
function preload() {
    currentPoem = loadStrings('assets/SpiritsoftheDead.txt');
    resartPoem = loadStrings('assets/Permission.txt');
      
    mononokeImage1 = loadImage('assets/pmSection1.jpg');
    mononokeImage2 = loadImage('assets/monokeSection1.jpg');
    wearyImage = loadImage('assets/wearyPhrase2.jpg');
    starsImage = loadImage('assets/starsSection2.jpg');
    spiritedAwayImage1 = loadImage('assets/spSection3.jpg');
    spiritedAwayImage2 = loadImage('assets/spiritedAwaySection3.jpg');
    mountainImage = loadImage('assets/mountainsSection4.jpg');
    forestImage = loadImage('assets/forestSection4.jpg');

    hatImage = loadImage('assets/sortingHat.png');
}

function setup() {
  	canvas = createCanvas(cWidth, cHeight);
  	canvas.class("canvasMain");
  	canvas.parent("container");
    
    posXMain = (canvas.width/2);
    posYMain = 60;

  	//display the text/images that
  	s1 = currentPoem.indexOf('ENTER');
  	s2 = currentPoem.indexOf('ENTER', s1+1);
  	s3 = currentPoem.indexOf('ENTER', s2+1);

  	createPoemSections();
}

function draw() {
    if(!sec1Active || !sec2Active || !sec3Active || !sec4Active) {
        time = second(); //make time start before if is true for when it is true
        currTime = time;
        imageTime = second();
        background(0,0,0);
    }
    else {
        currTime++;
        if(currTime % 12 == 0 && currTime > time+280 && currTime < time+310){
            background(256,256,256);
            document.getElementById('bells').play();
        }
        else
            background(0,0,0);
    }
    
	

	fill(256, 256, 256);
	textSize(18);
    
    //to determine if the full poem is visible
    if(sec1Active && sec2Active && sec3Active && sec4Active && currTime > time+300) {
        image(hatImage, 150, 550, 400, 400);
        var timeStamp = time+500;
        
        if(posXMain > 150 && currTime < timeStamp) posXMain -= angleXChange;
        else if(posXMain < (canvas.width/2) && currTime > timeStamp)  posXMain += angleXChange;
        //else angleXChange = 0;
        
        if(posYMain < 550 && currTime < timeStamp) posYMain += angleYChange;
        else if(posYMain > 60 && currTime > timeStamp)  posYMain -= angleYChange;
        //else angleYChange = 0;
        
        if(currTime > time+600){
            posXMain = canvas.width/2;
            posYMain = 60;
        }
        
        animateText(posXMain, posYMain);
    }
    
    posXStand = canvas.width/2;
    posYStand = 60;
        
    //to show either the text or image
    if(currTime < time+390) displayPoem(posXStand, posYStand, 0, false);
    if(currTime < time+360) displayPoem(posXStand, posYStand+10, 1, false);
    if(currTime < time+330) displayPoem(posXStand, posYStand+10, 2, false);
    if(currTime < time+300) displayPoem(posXStand, posYStand+10, 3, false);
    
    text("- Edgar Allen Poe", canvas.width/2+200, 900); //add the author

    //display the restart poem text
    posXRest = 10;
    posYRest = 40;
    for(i = 0; i < resartPoem.length; i++){
        //if(posYRest > (window.innerWidth*0.95) - 40) break;
        if(resartPoem[i] == "Restart?") fill(50,200,256);
        text(resartPoem[i], posXRest, posYRest);
        posYRest += 25;
    }

    fill(256, 256, 256);
    text("- Jaime Ferreyros", posXRest+30, posYRest+20); //add the author

    //check to see if user wants to restart the poem
    if (mouseIsPressed && mouseX < 77 && mouseX > 10 && mouseY < 400 && mouseY > 373) {
        sec1Active = false;
        sec2Active = false;
        sec3Active = false;
        sec4Active = false;
        posXMain = canvas.width/2;
        posYMain = 60;
    }
}

//function that takes original text string array and separates them into different sections
function createPoemSections(){
	//separate out sections of poem to make it work
  	k = 0; //so each section array starts out at 0
	for(i = 0; i < currentPoem.length; i++){
		if(i < s1) section1[i] = currentPoem[i];
		else if(i < s2 && i > s1) section2[k] = currentPoem[i];
		else if(i < s3 && i > s2) section3[k] = currentPoem[i];
		else if(i > s3) section4[k] = currentPoem[i];

		k++;
		if(i == s1 || i == s2 || i == s3) k = 0;
	}
}

//determine which section of will poem is to be displayed then add that to the screen
function displayPoem(posX, posY, secNum, flipped){
	
	switch(secNum){
		case 0:
			//this is to generate the first image and to make the first section of the poem
			if((mouseIsPressed && mouseX < 981 && mouseX > 641 && mouseY < 304 && mouseY > 21) || sec1Active){
				if(!flipped) displayText(section1, posX, posY);
                else displayText(section1, posX, posY+185);
				sec1Active = true;
			}
			else{
				posYImg = 20;
				width = 340;
				height = 280;
				
				if(imageTime % 3 == 0) image(mononokeImage2, posX, posYImg, width, height);
                else image(mononokeImage1, posX, posYImg, width, height);
                
                fill(50,200,256);
                text("Click Thy Image", (posX+(width/2))-20, posYImg+20); //add the author
			}
			break;
		case 1:
			if((mouseIsPressed && mouseX < 981 && mouseX > 641 && mouseY < 540 && mouseY > 315) || sec2Active){
				if(!flipped) displayText(section2, posX, posY+270);
                else displayText(section2, posX, posY+465);
				sec2Active = true;
			}
			else{
				posYImg = 315;
				if(imageTime % 4 == 0 || imageTime % 5 == 0) image(starsImage, posX, posYImg, 340, 225);
                else image(wearyImage, posX, posYImg, 340, 225);
			}
			break;
		case 2:
			if((mouseIsPressed && mouseX < 981 && mouseX > 641 && mouseY < 658 && mouseY > 553) || sec3Active){
				if(!flipped) displayText(section3, posX, posY+500);
                else displayText(section3, posX, posY+700);
				sec3Active = true;
			}
			else{
				posYImg = 555;
				if(imageTime % 5 == 0 || imageTime % 6 == 0) image(spiritedAwayImage1, posX, posYImg, 340, 100);
                else image(spiritedAwayImage2, posX, posYImg, 340, 100);
			}
			break;
		case 3:
			if((mouseIsPressed && mouseX < 981 && mouseX > 641 && mouseY < 832 && mouseY > 671) || sec4Active){
				if(!flipped) displayText(section4, posX, posY+640);
                else displayText(section4, posX, posY);
				sec4Active = true;
			}
			else{
				posYImg = 670;
				if(imageTime % 6 == 0 || imageTime % 7 == 0) image(mountainImage, posX, posYImg, 340, 190);
                else image(forestImage, posX, posYImg, 340, 190);
			}
			break;
	}
	
	fill(255,255,255);
}

function displayText(textArray, posX, posY){
	for(i = 0; i < textArray.length; i++){
		text(textArray[i], posX, posY);
		posY += 25;
	}
}

function animateText(posX, posY){
    var timeStamp = time+500;
    
    //to show either the text or image
    if(currTime < time+420 && currTime > time+390) displayPoem(posX, posY, 0, false);
    else if(currTime > timeStamp+90) displayPoem(posX, posY, 0, true);
    
    if(currTime < time+390 && currTime > time+360) displayPoem(posX, posY, 1, false);
    else if(currTime > timeStamp+60) displayPoem(posX, posY, 1, true);
    
    if(currTime < time+360 && currTime > time+330) displayPoem(posX, posY, 2, false);
    else if(currTime > timeStamp+30) displayPoem(posX, posY, 2, true);
    
    if(currTime < time+330) displayPoem(posX+20, posY, 3, false);
    else if(currTime > timeStamp) displayPoem(posX, posY, 3, true);
    else {
        angleXChange = 50;
        angleYChange = 5;
    }
}

//add a check to see if all setActive bools are true if so then start a corootine or timer of sort
//then have the text move and rearrange itself