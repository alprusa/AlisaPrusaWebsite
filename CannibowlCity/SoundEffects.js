//This file is for the creation of the sounds for the elements

//array for the sound elements
var soundEfx = {"AvatarWalk": 0, "BoxPush": 0, "CannibalAttack": 0, "CannibalWalk": 0, "Eating": 0, "EnterContainer": 0, "NotePickUp": 0, "AvatarScream": 0, "CannibalScream": 0, "BossLaugh": 0};

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
        soundEfx[sound] = gameSounds("audio/" + sound + ".mp3", sound, 0.7);
        
        if(sound === "AvatarWalk") soundEfx[sound].volume = 0.4;
        if(sound === "CannibalWalk") soundEfx[sound].volume = 0.1;
    }
}

function soundRefresh(){
    soundEfx = {"AvatarWalk": 0, "BoxPush": 0, "CannibalAttack": 0, "CannibalWalk": 0, "Eating": 0, "EnterContainer": 0, "NotePickUp": 0, "AvatarScream": 0, "CannibalScream": 0, "BossLaugh": 0};
}
