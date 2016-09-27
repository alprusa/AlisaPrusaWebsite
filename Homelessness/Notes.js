//notes or messages given to the user to read
var preTime = 0, noteObj, indexNum = 0, mousePressed = false;

function noteObj(imageURL, id){
    var tempSprite = new Sprite();
    
    tempSprite.width = 100;
    tempSprite.height = 100;
    tempSprite.x = 100;
    tempSprite.y = 50;
    tempSprite.image = Textures.load(imageURL);
    tempSprite.url = imageURL;
    tempSprite.id = id;
    tempSprite.index = 0;
    
    return tempSprite;
}

var messageBack = noteObj("img/messageBox.png", "note");

//picking up notes
function NotePickUp(curTime){
    noteObj = avatarCollision("people");
    
    if(typeof noteObj === "object"){
        if(noteObj.created && (gInput.chat || mousePressed) && noteObj.collided && preTime < curTime){
            //soundEfx["NotePickUp"].play();
            Zoomin(50, 45, 30, noteObj);
            preTime = curTime + 1000;
            start = false;
            noteObj.created = false;
            $('#win').removeClass('hidden');
            var dialog = getPersonText(noteObj.name, indexNum);
            document.getElementById('popTextUp').innerHTML = dialog + "<br>-" + noteObj.name;
            if(peopleTalkedTo.indexOf(noteObj.name) < 0) peopleTalkedTo[peopleTalkedTo.length] = noteObj.name;
        }
    }
    
    mousePressed = false;
}

function closeWindow(){
	if(typeof noteObj === "object"){
		var dateObj = new Date();
    	var curTime = dateObj.getTime();
    
		//close or put down the note
	    if(preTime < curTime){
	    	Zoomin(-50, -45, -30, noteObj);
	    	$('#win').addClass('hidden');
	    	$('#read').removeClass('hidden');
	    	indexNum = 0;
	        noteObj.created = true;
	        start = true;
	        pickUpToggle = 0;
	        canvas.focus();
	    }
    }
}

function NextQuote(){
	if(pagesContent[noteObj.name] !== undefined && indexNum < pagesContent[noteObj.name].length) {
		indexNum++;
	}
	
	if(pagesContent[noteObj.name][indexNum+1] !== undefined) {
		var dialog = getPersonText(noteObj.name, indexNum);
	    document.getElementById('popTextUp').innerHTML = dialog + "<br>-" + noteObj.name;
   }
   else{
   		$('#read').addClass('hidden');
   }
}

Element.prototype.leftTopScreen = function () {
    var x = this.offsetLeft;
    var y = this.offsetTop;

    var element = this.offsetParent;

    while (element !== null) {
        x = parseInt (x) + parseInt (element.offsetLeft);
        y = parseInt (y) + parseInt (element.offsetTop);

        element = element.offsetParent;
    }

    return new Array (x, y);
};

function mousePosStart(event) {
	//var x = event.clientX;
	//var y = event.clientY;
	
	mousePressed = true;
}