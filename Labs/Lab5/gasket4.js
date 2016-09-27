
var canvas;
var gl;

var points = [];
var colors = [];
var normals = [];

var vPosition, vBuffer, bufferID, thetaStop = [-160.0, 0.0, 0.0], rotAxis = false, offset = 0, z = 0.0, saveLength = 0;
var theta = [0.0, 0.0, 0.0], thetaLoc, rotX = 0, rotY = 1, rotZ = 2, axis = rotX, scaleChange, scale = 1.0, scaleTiles = 20.0, lZ = 0, vertices, Cp = false;
var modelViewMatrix, projectionMatrix, project, modelView, phiChange = false, toggleP = false, zTrans, index = 0, lX = 0, toggle = false;

var near = 0.01, far = 100.0, radius = 1.0, thetaCam  = 0.1, phi = 0.0, eye, NumSquares = 5, Num = 1, program, sphereVec;

var  fovy = 70.0;  // Field-of-view in Y direction angle (in degrees)
var  aspect = 1.0;       // Viewport aspect ratio
const at = vec3(0.0,  0.0, 0.0), up = vec3(0.0,  1.0, 0.0);
var NumTimesToSubdivide = 3, x = 0.0, y = 0.0, yTrans, xTrans;
var mousePressed = false, dr = 5.0 * Math.PI/180.0;

var lightPosition = vec4(1.0, 1.0, 1.0, 0.0 );
var lightAmbient = vec4(0.2, 0.2, 0.2, 1.0 );
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );

var materialAmbient = vec4( 1.0, 0.0, 1.0, 1.0 );
var materialDiffuse = vec4( 1.0, 0.8, 0.0, 1.0 );
var materialSpecular = vec4( 1.0, 0.8, 0.0, 1.0 );
var materialShininess = 100.0;

var ctm, sphere = true;
var ambientColor, diffuseColor, specularColor;

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
    
    vertices = [
        vec4(0.0, 0.0, -1.0,1),
		vec4(0.0, 0.942809, 0.333333, 1),
		vec4(-0.816497, -0.471405, 0.333333, 1),
		vec4(0.816497, -0.471405, 0.333333,1)
    ];
	
    divideTriangle( vertices[0], vertices[1], vertices[2], vertices[3],
                 NumTimesToSubdivide);
				 
	square();	 
    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
	
    aspect =  canvas.width/canvas.height;
	
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
	
    // enable hidden-surface removal
    
    gl.enable(gl.DEPTH_TEST);

    //  Load shaders and initialize attribute buffers
    
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
	
	var ambientProduct = mult(lightAmbient, materialAmbient);
    var diffuseProduct = mult(lightDiffuse, materialDiffuse);
    var specularProduct = mult(lightSpecular, materialSpecular);
    
    // Create a buffer object, initialize it, and associate it with the
    //  associated attribute variable in our vertex shader
	colors = normals
    
	//colors
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
    
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );
	
	//normals
	var nBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normals), gl.STATIC_DRAW );
    
    var vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal );
	
	//circle points
	vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

	//vPosition
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.enableVertexAttribArray( vPosition );
	
	yTrans = gl.getUniformLocation(program, "yPos");
	xTrans = gl.getUniformLocation(program, "xPos");
	zTrans = gl.getUniformLocation(program, "zPos");
	thetaLoc = gl.getUniformLocation(program, "theta");
	scaleChange = gl.getUniformLocation(program, "scale");
	projectionMatrix = gl.getUniformLocation(program, "projectionMatrix");
	modelViewMatrix = gl.getUniformLocation(program, "modelViewMatrix");
	
	gl.uniform4fv( gl.getUniformLocation(program, "ambientProduct"),flatten(ambientProduct) );
	gl.uniformMatrix2fv( gl.getUniformLocation(program, "sphere"),false,vertices );
    gl.uniform4fv( gl.getUniformLocation(program, "diffuseProduct"),flatten(diffuseProduct) );
    gl.uniform4fv( gl.getUniformLocation(program, "specularProduct"),flatten(specularProduct) );	
    gl.uniform4fv( gl.getUniformLocation(program, "lightPosition"),flatten(lightPosition) );
    gl.uniform1f( gl.getUniformLocation(program, "shininess"),materialShininess );
	program.useLightingUniform = gl.getUniformLocation(program, "uUseTexture");

	if (canvas.addEventListener) {
		canvas.addEventListener("mousewheel", MouseWheel, false);
		canvas.addEventListener("DOMMouseScroll", MouseWheel, false);
	}
	
	document.getElementById("IncreaseFOV").onclick = function () {
		if(fovy < 100) fovy += 10;
	};
		
	document.getElementById("DecreaseFOC").onclick = function () {
		if(fovy >= 0) fovy -= 10;
	};
	
	document.getElementById("gl-canvas").onmousedown = function(event){
		mousePressed = true;
		document.getElementById("gl-canvas").onmousemove = function (event) {
			if(mousePressed === true){
				mousePressedLight(event);
				offset = 0;
				points.length = 0;
				colors.length = 0;
				normals.length = 0;
				index = 0;
				init();
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
		    z = z + 0.05;
			if(scale <= 10) scale = scale + 0.05;
		}
		else if(translate === 'S') {
			z = z - 0.05;
			if(scale >= 1) scale = scale - 0.05;
		}
		else if(translate === 'A') {
			x = x - 0.05;
		}
		else if(translate === 'D') {
			x = x + 0.05;
		}
		else if(translate === 'R') {
			if(phiChange === false){
				thetaCam += 0.05;
			}
			else{
				phi += 0.05;
			}
		}
		else if(translate === 'F') {
			if(phiChange === false){
				thetaCam -= 0.05;
			}
			else{
				phi -= 0.05;
			}
		}
		else if(translate === 'P') {
			phiChange = !phiChange;
		}
		else if(translate === numberPress(translate)){
			NumTimesToSubdivide = Num;
			points.length = 0;
			normals.length = 0;
			colors.length = 0;
			offset = 0;
			index = 0;
			init();
		}
		else if(translate === 'X'){
			axis = rotX;
			theta[axis] -= 1.0;
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
		else if(translate === 'T'){
			toggle = !toggle;
			if(toggle === false){
				lightAmbient = vec4(0.2, 0.2, 0.2, 1.0 );
				lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
				lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );
			}
			else{
				lightAmbient = vec4(0.0, 0.0, 0.0, 0.0 );
				lightDiffuse = vec4( 0.0, 0.0, 0.0, 0.0 );
				lightSpecular = vec4( 0.0, 0.0, 0.0, 0.0 );
			}
			offset = 0;
			init();
		}
		else if(translate === 'C'){
			Cp = !Cp;
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
		case '6':
			numVal = '6';
			break;
		default:
			numVal = '3';
	}
	
	Num = parseInt(numVal) - 1;
	return numVal;
}

function MouseWheel(event){
	var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
	
	if(delta === -1 && fovy < 100) fovy += 10;
	if(delta === 1 && fovy >= 0) fovy -= 10;
}

function mousePressedLight(event){
	var moveX = event.clientX;
	var moveY = event.clientY;
		
	var rect = event.target.getBoundingClientRect();

	moveX = ((moveX - rect.left) - canvas.height / 2) / (canvas.height / 2); // x coord in WebGL space
	moveY = (canvas.width / 2 - (moveY - rect.top)) / (canvas.width / 2); // y coord in WebGL space
	
	moveX = -moveX;
	moveY = -moveY;
	
    lX = moveX;
	lZ = moveY;
	
	lightPosition = vec4(lX, lZ, 1.0, 0.0 );
}

function square(){
	
	var baseColors = [
        vec4(0.0, 0.5, 0.5, 1.0),
		vec4(0.0, 0.0, 0.0, 1.0)
    ];

    var i = 0;
    for (var z = 100.0; z > -100.0; z -= 5.0) {
        for (var x = -100.0; x < 100.0; x += 5.0) {
            if (i % 2) {
                normals.push(baseColors[0]);
                normals.push(baseColors[0]);
                normals.push(baseColors[0]);
                normals.push(baseColors[0]);
                normals.push(baseColors[0]);
                normals.push(baseColors[0]);
            }
            else {
                normals.push(baseColors[1]);
                normals.push(baseColors[1]);
                normals.push(baseColors[1]);
                normals.push(baseColors[1]);
                normals.push(baseColors[1]);
                normals.push(baseColors[1]);
            }
            points.push(vec4(x, 0.0, z, 1.0));
            points.push(vec4(x, 0.0, z - 5.0, 1.0));
            points.push(vec4(x - 5.0, 0.0, z - 5.0, 1.0));

            points.push(vec4(x, 0.0, z, 1.0));
            points.push(vec4(x - 5.0, 0.0, z - 5.0, 1.0));
            points.push(vec4(x - 5.0, 0.0, z, 1.0));
            ++i;
			offset = offset + 6;
        }
        ++i;
    }
}

function triangle( a, b, c )
{
    normals.push(a);
    normals.push(b);
    normals.push(c);
     
    points.push(a);
    points.push(b);
    points.push(c);

    index += 3;
}

function divideTriangle( a, b, c, d, n)
{
    // tetrahedron with each side using
    // a different color
    
    divideTetra(a, b, c, n);
    divideTetra(d, c, b, n);
    divideTetra(a, d, b, n);
    divideTetra(a, c, d, n);
}

function divideTetra( a, b, c,  count )
{
    // check for end of recursion
    
    if ( count > 0 ) {
                
        var ab = mix( a, b, 0.5);
        var ac = mix( a, c, 0.5);
        var bc = mix( b, c, 0.5);
                
        ab = normalize(ab, true);
        ac = normalize(ac, true);
        bc = normalize(bc, true);
                                
        divideTetra( a, ab, ac, count - 1 );
        divideTetra( ab, b, bc, count - 1 );
        divideTetra( bc, c, ac, count - 1 );
        divideTetra( ab, bc, ac, count - 1 );
    }
    else { 
        triangle( a, b, c );
    }
}


function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	eye = vec3(radius*Math.sin(thetaCam)*Math.cos(phi),
        radius*Math.sin(thetaCam)*Math.sin(phi), radius*Math.cos(thetaCam));
    modelView = lookAt(eye, at , up);
    project = perspective(fovy, aspect, near, far);
	
	gl.uniformMatrix4fv( modelViewMatrix, false, flatten(modelView) );
    gl.uniformMatrix4fv( projectionMatrix, false, flatten(project) );
	
	gl.uniform1f(yTrans, 0.0);
	gl.uniform1f(xTrans, x);
	gl.uniform1f(zTrans, z);
	gl.uniform1f(scaleChange, scale);
	
	gl.uniform3fv(thetaLoc, theta);
	if(Cp === true) sphere = false;
	else sphere = true;
	gl.uniform1i(program.useLightingUniform, sphere);
    
	gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
	gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
	 for( var i=0; i<index; i+=3) 
        gl.drawArrays( gl.TRIANGLES, i, 3  );
	
	gl.uniform1f(yTrans, 9.0);
	gl.uniform1f(xTrans, 0.0);
	gl.uniform1f(zTrans, 0.0);
	gl.uniform1f(scaleChange, scaleTiles);
	
    gl.uniform3fv(thetaLoc, thetaStop);
	sphere = true;
	gl.uniform1i(program.useLightingUniform, sphere);
	
	gl.drawArrays( gl.TRIANGLES, points.length - offset , offset );
	
	window.requestAnimFrame( render );
}
