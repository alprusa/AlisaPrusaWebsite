// do 2 and 5 for A/B
//for grid floor make two large triangles for a square then add a color grid for checker board
//http://www.ibm.com/developerworks/web/library/wa-webgl1/index.html

var canvas;
var gl;

var points = [];
var pts = [];
var colors = [];

var vPosition, vBuffer, bufferID, thetaStop = [0.0, 0.0, 0.0], rotAxis = false, offset = 0, offsetTri = 0;
var theta = [0.0, 0.0, 0.0], thetaLoc, rotX = 0, rotY = 1, rotZ = 2, axis = rotX, scaleChange, scale;

var NumTimesToSubdivide = 3, x = 0.0, y = 0.0, yTrans, yTrans;
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
		vec3( -1.0,  -0.3, -0.0 ),  // top left
        vec3(  -1.0,  -1.0, 0.1 ), // bottom left
        vec3(  1.0, -1.0, -0.1 ),  // bottom right
        vec3(  -1.0,  -0.3, -0.0 ), // top left
        vec3(  1.0,  -0.3, -0.1 ), // top right
        vec3( 1.0, -1.0, -0.1 ) // bottom right
    ];
	
    divideTetra( vertices[0], vertices[1], vertices[2], vertices[3],
                 NumTimesToSubdivide);
				 
	tiledFloor(verts[0], verts[1], verts[2], verts[3], verts[4], verts[5]);

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
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
	
	document.getElementById("RotateX").onclick = function () {
		axis = rotX;
		theta[axis] += 1.0;
		 rotAxis = true;
    };
	
	document.getElementById("RotateY").onclick = function () {
		axis = rotY;
		theta[axis] += 1.0;
		rotAxis = true;
    };
	
	document.getElementById("RotateZ").onclick = function () {
		axis = rotZ;
		theta[axis] += 1.0;
		rotAxis = true;
    };
	
	document.getElementById("sliderSub").onchange = function(event) {
        NumTimesToSubdivide = 0 + (event.target.value / 10);
		points.length = 0;
		offset = 0;
		init();
    };
	
	document.getElementById("sliderScale").onchange = function(event) {
        scale = 10 - (event.target.value / 10);
    };
    
	//To determine what key is pressed
	window.onkeydown = function (event){
		var translate = String.fromCharCode(event.keyCode);
		if(translate !== null) rotAxis = false;
		if(translate === 'W' && rotAxis === false) {
		    y = y + 0.01;
		}
		else if(translate === 'S' && rotAxis === false) {
			y = y - 0.01;
		}
		else if(translate === 'A' && rotAxis === false) {
			x = x - 0.01;
		}
		else if(translate === 'D' && rotAxis === false) {
			x = x + 0.01;
		}
	};

    render();
};

function tiledFloor(a, b, c, d, e, f){
	var tileColors = [
		vec3(1.0, 0.0, 0.0),
		vec3(0.0, 1.0, 1.0)
	];
	var i = 0;
	for (var zCol = 100.0; zCol > -100.0; zCol -= 5.0) {
		for (var xCol = -100.0; xCol < 100.0; xCol += 5.0) {
			if (i % 2) {
				// Add 6 colors to current square.
				colors.push( tileColors[0] );
				colors.push( tileColors[0] );
				colors.push( tileColors[0] );
				colors.push( tileColors[0] );
				colors.push( tileColors[0] );
				colors.push( tileColors[0] );
			}
			else {
				// Add 6 different colors to current square.
				colors.push( tileColors[1] );
				colors.push( tileColors[1] );
				colors.push( tileColors[1] );
				colors.push( tileColors[1] );
				colors.push( tileColors[1] );
				colors.push( tileColors[1] )
			}
			// Add 6 points that make the square. Each point
		// should be composed of x and z.
			points.push(vec3(-xCol, -0.3, -zCol+10)); //top left
			points.push(vec3(-xCol, -1.0, zCol)); // bottom left
			points.push(vec3(xCol, -1.0, -zCol+10)); // bottom right
			points.push(vec3(-xCol, -0.3, zCol)); // top left
			points.push(vec3(xCol, -0.3, -zCol+10)); // top right
			points.push(vec3(xCol, -1.0, zCol)); // bottom right
			++i;
			offset=offset+6;
		}
		++i;
	}
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
	
	gl.uniform1f(yTrans, y);
	gl.uniform1f(xTrans, x);
	gl.uniform1f(scaleChange, scale);
	
    gl.uniform3fv(thetaLoc, theta);
	
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
