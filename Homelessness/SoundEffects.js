//This file is for the creation of the sounds for the elements

//array for the sound elements
var soundEfx = {"Footstep1": 0, "NotePickUp": 0};

function gameSounds(audio, name, volume){
    var tempAudio = new SoundManager();
    
    tempAudio.muted = false;
    tempAudio = Sounds.load(audio);
    tempAudio.audioFile = audio;
    tempAudio.name = name;
    tempAudio.volume = volume;
    tempAudio.pause();
    tempAudio.loop = false;
    tempAudio.index = 0;
    
    return tempAudio;
}

//audio for in game actions
function SoundEffects(){
    for(var sound in soundEfx){
        soundEfx[sound] = gameSounds("audio/" + sound + ".mp3", sound, 0.3);
        
       // if(sound === "Footstep1") soundEfx[sound].volume = 0.1;
    }
}

function soundRefresh(){
    soundEfx = {"AvatarWalk": 0, "NotePickUp": 0};
}
