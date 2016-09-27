function mouseStuff(event){
	//var e = window.event;

    var posX = event.clientX;
    var posY = event.clientY;
	console.log(posX, posY);
}

function clickUtencils(event){
    var canvas = document.getElementById('p6canvas');
	var cWidth = canvas.width;
	var cHeight = canvas.height;
    
    initChoice();
    
    var a = document.createElement('a');
	var linkText = document.createTextNode("Click Me");
	a.appendChild(linkText);
	a.title = "Click Me";
	a.href = "http://people.ucsc.edu/~aprusa/CannibowlCity/CannibowlCity.html";
	document.getElementById('CannibowlCity').appendChild(a);
}

//width="612" height="792"
