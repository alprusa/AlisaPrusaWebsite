var noteCounter = 0, preTime = 0;

var everyNote = {"note0":0, "note1":0, "note2":0, "note3":0, "note4":0, "note5":0, "note6":0};

function noteObj(imageURL, id){
    var tempSprite = new Sprite();
    
    tempSprite.width = 600;
    tempSprite.height = 400;
    tempSprite.x = 100;
    tempSprite.y = 50;
    tempSprite.image = Textures.load(imageURL);
    tempSprite.url = imageURL;
    tempSprite.id = id;
    tempSprite.index = 0;
    
    return tempSprite;
}

//create actual sprites for screens
function createNotes(){
    var noteAdded = 0;
    for(var obj in everyNote){
        everyNote[obj] = noteObj("img/" + obj + ".png", noteAdded);
        noteAdded++;
    }
}

//picking up notes
function NotePickUp(action, curTime){
    var noteObj = avatarCollision("journal");
    var noteNum = "note" + noteCounter;
    var pastNoteNum = "note" + (noteCounter - 1);
    
    if(typeof noteObj === "object"){
        if(noteObj.created && gInput.pickUp && noteObj.collided){
            soundEfx["NotePickUp"].play();
            preTime = curTime + 1000;
            start = false;
            noteCounter++;
            noteObj.created = false;
            notePickUp = false;
            world.addChild(everyNote[noteNum]);
            noteObj.remove(this);
        }
        //else soundEfx["NotePickUp"].pause();
        
        //close or put down the note
        if(noteObj.created === false && gInput.pickUp && typeof everyNote[pastNoteNum] === "object" && preTime < curTime){
            everyNote[pastNoteNum].remove(this)
            world.removeChild(everyNote[pastNoteNum]);
            start = true;
            notePickUp = false;
            pickUpToggle = 0;
        }
        
        if(noteCounter > everyNote.length && noteObj.created === false && gInput.pickUp){
                for(var obj in everyNote){
                    world.removeChild(everyNote[obj]);
                }
                start = true;
                notePickUp = false;
                noteCounter = 0;
        }
    }
}

function notesQuit(){
    noteCounter = 0; preTime = 0;
    everyNote = {"note0":0, "note1":0, "note2":0, "note3":0, "note4":0, "note5":0, "note6":0};
}