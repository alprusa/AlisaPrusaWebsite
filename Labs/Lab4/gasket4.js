
var canvas;
var gl;

var points = [];
var pts = [];
var colors = [];

var vPosition, vBuffer, bufferID, thetaStop = [0.0, 0.0, 0.0], rotAxis = false, offset = 0, mouseTime = 0;
var theta = [0.0, 0.0, 0.0], thetaLoc, rotX = 0, rotY = 1, rotZ = 2, axis = rotX, scaleChange, scale = 1.0;
var modelViewMatrix, projectionMatrix, project, modelView, phiChange = false, toggleP = false;

var near = 0.1, far = 20.0, radius = 4.0, thetaCam  = 0.0, phi = 0.0, eye, NumSquares = 5, Num = 1;

var  fovy = 45.0;  // Field-of-view in Y direction angle (in degrees)
var  aspect;       // Viewport aspect ratio
const at = vec3(0.0, 0.0, 0.0), up = vec3(0.0, 1.0, 0.0);

var NumTimesToSubdivide = 3, x = 0.0, y = 0.0, yTrans, xTrans;
var mousePressed = false;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Initialize our data for the Sierpinski Gasket
    //

    // First, initialize the vertices of our 3D gasket
    // Four vertices on unit circle
    // Intial tetrahedron with equal length sides
    
    var vertices = [
        vec3(  0.0000,  0.0000, -0.9000 ),
        vec3(  0.0000,  0.9428,  0.1333 ),
        vec3( -0.8165, -0.4714,  0.1333 ),
        vec3(  0.8165, -0.4714,  0.1333 )
    ];
	
	var verts = [
		vec3( -0.5, -0.9, -0.9),  //bottom right
        vec3( 0.9, -0.9, -0.9), // bottom left
        vec3( 0.9, -0.0, 0.9), //top left
        vec3( -0.5, -0.0, 0.9) // top right
    ];
	
    divideTetra( vertices[0], vertices[1], vertices[2], vertices[3],
                 NumTimesToSubdivide);
				 
	tiledFloor(verts[0], verts[1], verts[2], verts[3],
                 NumSquares);

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
	
    aspect =  canvas.width/canvas.height;
	
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
	
	
    // enable hidden-surface removal
    
    gl.enable(gl.DEPTH_TEST);

    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Create a buffer object, initialize it, and associate it with the
    //  associated attribute variable in our vertex shader
    
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
    
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );
    
    vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.enableVertexAttribArray( vPosition );
	
	yTrans = gl.getUniformLocation(program, "yPos");
	xTrans = gl.getUniformLocation(program, "xPos");
	thetaLoc = gl.getUniformLocation(program, "theta");
	scaleChange = gl.getUniformLocation(program, "scale");
	projectionMatrix = gl.getUniformLocation(program, "projectionMatrix");
	modelViewMatrix = gl.getUniformLocation(program, "modelViewMatrix");

	if (canvas.addEventListener) {
		canvas.addEventListener("mousewheel", MouseWheel, false);
		canvas.addEventListener("DOMMouseScroll", MouseWheel, false);
	}
	
	document.getElementById("IncreaseFOV").onclick = function () {
		if(fovy < 180) fovy += 10;
	};
		
	document.getElementById("DecreaseFOC").onclick = function () {
		if(fovy >= 0) fovy -= 10;
	};
	
	document.getElementById("gl-canvas").onmousedown = function(event){
		mousePressed = true;
		document.getElementById("gl-canvas").onmousemove = function (event) {
			if(mousePressed === true){
				mousePressedFOV(event);
			}
		};
	};
	
	document.getElementById("gl-canvas").onmouseup = function(event){
		mousePressed = false;
	};
    
	//To determine what key is pressed
	window.onkeydown = function (event){
		var translate = String.fromCharCode(event.keyCode);
		var numPress = numberPress(translate);
		if(translate === 'W') {
		    y = y + 0.01;
		}
		else if(translate === 'S') {
			y = y - 0.01;
		}
		else if(translate === 'A') {
			x = x - 0.01;
		}
		else if(translate === 'D') {
			x = x + 0.01;
		}
		else if(translate === 'R') {
			thetaCam += 0.01;
		}
		else if(translate === 'F') {
			thetaCam -= 0.01;
		}
		else if(translate === numberPress(translate)){
			NumTimesToSubdivide = Num;
			points.length = 0;
			offset = 0;
			init();
		}
		else if(translate === 'X'){
			axis = rotX;
			theta[axis] += 1.0;
		}
		else if(translate === 'Y'){
			axis = rotY;
			theta[axis] += 1.0;
		}
		else if(translate === 'Z'){
			axis = rotZ;
			theta[axis] += 1.0;
		}
		else if(translate === 'P'){
			toggleP = !toggleP;
			phiChange = true;
			if(toggleP === false){
				phiChange = false;
			}
		}
		else if(translate === 'Q'){
			if(scale <= 10) scale += 1;
		}
		else if(translate === 'E'){
			if(scale >= 2) scale -= 1;
		}
	};

    render();
};

function numberPress(translate){
	var numVal;
	switch(translate){
		case '1':
			numVal = '1';
			break;
		case '2':
			numVal = '2';
			break;
		case '3':
			numVal = '3';
			break;
		case '4':
			numVal = '4';
			break;
		case '5':
			numVal = '5';
			break;
		default:
			numVal = '3';
	}
	
	Num = parseInt(numVal) - 1;
	return numVal;
}

function MouseWheel(event){
	var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
	
	if(delta === -1 && fovy < 180) fovy += 10;
	if(delta === 1 && fovy >= 0) fovy -= 10;
}

function mousePressedFOV(event){
	var moveX = event.clientX;
	var moveY = event.clientY;
		
	var rect = event.target.getBoundingClientRect();

	moveX = ((moveX - rect.left) - canvas.height / 2) / (canvas.height / 2); // x coord in WebGL space
	moveY = (canvas.width / 2 - (moveY - rect.top)) / (canvas.width / 2); // y coord in WebGL space
	
	var moX = moveX;
	var moY = moveY;
	
	if(moveX > 0.01) moveX = 0.01;
	else if(moveX < 0) moveX = 0.01;
	if(moveY > 0.01) moveY = 0.01;
	else if(moveY < 0) moveY = 0.01;
	
	if(phiChange === false){
		if(moX < 0) thetaCam -= moveX;
		else if(moX > 0) thetaCam += moveX;
	}
	else{
		if(moveY < 0) phi -= moveY;
		else if(moveY > 0) phi += moveY;
	}
}

function tiledFloor(a,b,c,d,count){
		
	if ( count === 0 ) {
        quad( a, b, c, d);
    }
    
    // find midpoints of sides
    // divide four smaller tetrahedra
    
    else {
        var ab = mix( a, b, 0.5 );
        var ac = mix( a, c, 0.5 );
        var ad = mix( a, d, 0.5 );
        var bc = mix( b, c, 0.5 );
        var bd = mix( b, d, 0.5 );
        var cd = mix( c, d, 0.5 );

        --count;
        
        tiledFloor(  a, ab, ac, ad, count );
        tiledFloor( ab,  b, bc, bd, count );
        tiledFloor( ac, bc,  c, cd, count );
        tiledFloor( ad, bd, cd,  d, count );
    }
}

function quad(a, b, c, d){
	square( a, c, b, d, 0 );
    square( a, c, d, b, 1 );
    square( a, b, d, a, 2 );
    square( b, c, d, b, 3 );
}

function square(a, b, c, d, color){
	
	var baseColors = [
        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 1.0, 1.0),
		vec3(0.0, 0.0, 1.0),
        vec3(0.0, 0.0, 0.0)
    ];

    colors.push( baseColors[color] );
    points.push( a );
    colors.push( baseColors[color] );
    points.push( b );
    colors.push( baseColors[color] );
    points.push( c );
	colors.push( baseColors[color] );
    points.push( d );
	offset=offset+4;
}

function triangle( a, b, c, color )
{

    // add colors and vertices for one triangle

    var baseColors = [
        vec3(1.0, 0.0, 0.0),
        vec3(0.0, 1.0, 0.0),
        vec3(0.0, 0.0, 1.0),
        vec3(0.0, 0.0, 0.0)
    ];

    colors.push( baseColors[color] );
    points.push( a );
    colors.push( baseColors[color] );
    points.push( b );
    colors.push( baseColors[color] );
    points.push( c );
}

function tetra( a, b, c, d )
{
    // tetrahedron with each side using
    // a different color
    
    triangle( a, c, b, 0 );
    triangle( a, c, d, 1 );
    triangle( a, b, d, 2 );
    triangle( b, c, d, 3 );
}

function divideTetra( a, b, c, d, count )
{
    // check for end of recursion
    
    if ( count === 0 ) {
        tetra( a, b, c, d );
    }
    
    // find midpoints of sides
    // divide four smaller tetrahedra
    
    else {
        var ab = mix( a, b, 0.5 );
        var ac = mix( a, c, 0.5 );
        var ad = mix( a, d, 0.5 );
        var bc = mix( b, c, 0.5 );
        var bd = mix( b, d, 0.5 );
        var cd = mix( c, d, 0.5 );

        --count;
        
        divideTetra(  a, ab, ac, ad, count );
        divideTetra( ab,  b, bc, bd, count );
        divideTetra( ac, bc,  c, cd, count );
        divideTetra( ad, bd, cd,  d, count );
    }
}


function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	
	eye = vec3(radius*Math.sin(thetaCam)*Math.cos(phi), 
        radius*Math.sin(thetaCam)*Math.sin(phi), radius*Math.cos(thetaCam));
    modelView = lookAt(eye, at , up);
    project = perspective(fovy, aspect, near, far);
	
	gl.uniform1f(yTrans, y);
	gl.uniform1f(xTrans, x);
	gl.uniform1f(scaleChange, scale);
	
	gl.uniform3fv(thetaLoc, theta);
    
	gl.uniformMatrix4fv( modelViewMatrix, false, flatten(modelView) );
    gl.uniformMatrix4fv( projectionMatrix, false, flatten(project) );
	
	gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.drawArrays( gl.TRIANGLES, 0, points.length - offset  );
	
	gl.uniform1f(yTrans, 0.0);
	gl.uniform1f(xTrans, 0.0);
	gl.uniform1f(scaleChange, 0.0);
	
    gl.uniform3fv(thetaLoc, thetaStop);

	gl.drawArrays( gl.TRIANGLES, points.length - offset , offset );
	
	requestAnimFrame( render );
}
