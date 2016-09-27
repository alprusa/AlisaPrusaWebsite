var projectDisplayed = false;
var project1 = false;
var exit;
var projectTitle;

function clicked(event){
    var x = event.clientX;     // Get the horizontal coordinate
    var y = event.clientY;     // Get the vertical coordinate
    console.log(x, y);
}

function createExtraClickables(){
    exit = document.createElement("area"); // Create exit button to close project display
    exit.shape = "circle";
    exit.coords = "555, 65, 13";
    exit.alt = "Exit";
    exit.onclick = function (){
        removeExtraClickables();
    };
    
    projectTitle = document.createElement("area"); // Create link to get to project section
    projectTitle.shape = "poly";
    projectTitle.coords = "0, 0, 0, 0";
    projectTitle.alt = "ProjectLink";
    projectTitle.onclick = function (){
        removeExtraClickables();
    };
    
    Labyrinth = document.createElement("area"); // Create exit button to close project display
    Labyrinth.shape = "circle";
    Labyrinth.coords = "272, 157, 27";
    Labyrinth.alt = "Labyrinth";
    Labyrinth.href = "http://people.ucsc.edu/~mimlowe/project1/one.html";
    Labyrinth.onclick = function (){
        removeExtraClickables();
    };
}

function removeExtraClickables(){
    changeImage(7);
    document.getElementById("mapCordinates").removeChild(projectTitle);
    document.getElementById("mapCordinates").removeChild(exit);
    
    if(project1){
        document.getElementById("mapCordinates").removeChild(Labyrinth);
        project1 = false;
    }
}

function changeImage(imageChange){
    var cartographyImage = document.getElementById("mapping");

    switch(imageChange){
        case 0:
            cartographyImage.src = "images/Project1.svg";
            projectTitle.coords = "265, 103, 269, 117, 462, 36, 468, 48";
            projectTitle.href = "#project1Anchor";
            projectDisplayed = true;
            project1 = true;
            break;
        case 1:
            cartographyImage.src = "images/Project2.svg";
            projectTitle.coords = "297, 79, 303, 93, 421, 37, 428, 48";
            projectTitle.href = "#project2Anchor";
            projectDisplayed = true;
            break;
        case 2:
            cartographyImage.src = "images/Project3.svg";
            projectTitle.coords = "294, 90, 298, 102, 429, 43, 434, 56";
            projectTitle.href = "#project3Anchor";
            projectDisplayed = true;
            break;
        case 3:
            cartographyImage.src = "images/Project4.svg";
            projectTitle.coords = "252, 121, 257, 134, 495, 51, 489, 39";
            projectTitle.href = "#project4Anchor";
            projectDisplayed = true;
            break;
        case 4:
            cartographyImage.src = "images/Project5.svg";
            projectTitle.coords = "307, 74, 315, 86, 434, 42, 427, 31";
            projectTitle.href = "#project5Anchor";
            projectDisplayed = true;
            break;
        case 5:
            cartographyImage.src = "images/Project6.svg";
            projectTitle.coords = "271, 104, 279, 117, 458, 53, 452, 41";
            projectTitle.href = "#project6Anchor";
            projectDisplayed = true;
            break;
        case 6:
            cartographyImage.src = "images/Project7.svg";
            projectTitle.coords = "294, 78, 299, 92, 436, 42, 430, 30";
            projectTitle.href = "#project7Anchor";
            projectDisplayed = true;
            break;
        default:
            cartographyImage.src = "images/Cartography.svg";
            projectDisplayed = false;
            break;
    }
}

function mouseOverFunc(){
    document.getElementById("mapping").onmouseover = function(){
        document.getElementById("mapping").style.cursor = "default";
    }

    document.getElementById("mapping").onmouseout = function(){
        document.getElementById("mapping").style.cursor = "pointer";
    }
    
    if(projectDisplayed){
        document.getElementById("mapCordinates").appendChild(exit);
        document.getElementById("mapCordinates").appendChild(projectTitle);
        
        if(project1)
            document.getElementById("mapCordinates").appendChild(Labyrinth);
        
        projectDisplayed = false;
    }
    
}

createExtraClickables();
setInterval(mouseOverFunc, 30);