//This file is for creating the primary audio and background
var mainSong, menuSong, deathSong, bossSong;

//set up background image
function Background(){
	background = new Sprite();
	if(level0 === true || bossFight === true)
    	background.width = 1600;
    else if(level1 === true) background.width = 3200;
    else if(level2 === true) background.width = 4000;
    background.height = 550;
    background.x = 0;
    background.y = 0;
    background.id = "background";
    background.index = 2;
    world.addChild(background);
    background.image = Textures.load("img/background.png");
}

//"prototype" for making the hidden walls that are used to detect if objects reach end of screen
function hiddenWalls(x, y, id){
    var tempSprite = new Sprite();
    var imageURL = "img/AreaWall.png";
    
    tempSprite.x = x;
    tempSprite.y = y;
    tempSprite.width = 20;
    tempSprite.height = 550;
    tempSprite.id = id;
    tempSprite.index = 0;
    tempSprite.image = Textures.load(imageURL);
    tempSprite.url = imageURL;
    
    return tempSprite;
}

//wall to detect when player reaches end of visual area
function createWalls(){
    endWall = hiddenWalls(800, 0, "endWall");
    backWall = hiddenWalls(-20, 0, "backWall");
    
    world.addChild(endWall);
    world.addChild(backWall);
}

//"prototype" for creating the music elements for the game
function songObject(audio, volume, id){
    var tempMusic = new SoundManager();
    
    tempMusic.muted = false;
    tempMusic = Sounds.load(audio);
    tempMusic.audio = audio;
    tempMusic.volume = volume;
    tempMusic.id = id;
    tempMusic.play();
    tempMusic.loop = true;
    
    return tempMusic;
}

//create the song and play it
function createSong(songName){
    switch(songName){
        case "mainSong":
            mainSong = songObject("audio/HorrorMusic_Main.mp3", 0.5, songName);
            break;
        case "menuSong":
            menuSong = songObject("audio/TemptingFate_Credits.mp3", 0.5, songName);
            break;
        case "deathSong":
            deathSong = songObject("audio/Quiet_Death.mp3", 0.5, songName);
            break;
        case "bossSong":
            bossSong = songObject("audio/SuspenseAction_Boss.mp3", 0.5, songName);
            break;
    }
}

//mute all music when quit/fail/victory happen
function muteMusic(){
    if(mainSong !== undefined) mainSong.muted = true;
    if(menuSong !== undefined) menuSong.muted = true;
    if(deathSong !== undefined) deathSong.muted = true;
    if(bossSong !== undefined) bossSong.muted = true;
}
