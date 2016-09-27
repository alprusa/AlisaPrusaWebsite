
var canvas;
var gl;

var points = [];

var NumTimesToSubdivide = 5;
var fracture = 0.02;
var shift = 0.01;
var triangleSet = 0.4, counter = 0, program;
var red = 0.175, blue = 0.122, green = 0.069, colorRed, colorBlue, colorGreen;
var mouseMoveX, mouseMoveY, moveX = -0.0234375, moveY = -0.01718747615814209, vPosition_x, vPosition_y;
var mousePressed = false, scale = 0.0, scaleChange, throwCount = false;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
	
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
	
    //
    //  Initialize our data for the Sierpinski Gasket
    //

    // First, initialize the corners of our gasket with three points.
    
    var vertices = [
        vec2( -0.9, -0.9 ),
        vec2(  0,  1 ),
        vec2(  1, -0.9 )
    ];

    divideTriangle( vertices[0], vertices[1], vertices[2],
                    NumTimesToSubdivide);

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	
	colorRed = gl.getUniformLocation(program, "red");
	colorBlue = gl.getUniformLocation(program, "blue");
	colorGreen = gl.getUniformLocation(program, "green");
	mouseMoveX = gl.getUniformLocation(program, "moveX");
	mouseMoveY = gl.getUniformLocation(program, "moveY");
	scaleChange = gl.getUniformLocation(program, "scale");
	
	document.getElementById("sliderSub").onchange = function(event) {
        NumTimesToSubdivide = 0 + (event.target.value / 10);
		points.length = 0;
		init();
    };
	
	document.getElementById("sliderScale").onchange = function(event) {
        scale = 10 - (event.target.value / 10);
    };
	
	document.getElementById("Reset").onclick = function () {
		scale = 0;
		moveX = -0.0234375;
		moveY = -0.01718747615814209;
		color = 0;
		red = 0;
		blue = 0;
		green = 0;
		throwCount = false;
		NumTimesToSubDivide = 5;
    };
    
	//To determine what key is pressed
	window.onkeydown = function (event){
		var color = String.fromCharCode(event.keyCode);
		if(color === 'R') {
			red = 1;
			blue = 0;
			green = 0;
		}
		else if(color === 'G') {
			red = 0;
			blue = 0;
			green = 1;
		}
		else if(color === 'B') {
			red = 0;
			blue = 1;
			green = 0;
		}
	};
	
	document.getElementById("gl-canvas").onmousedown = function(event){
		mousePressed = true;
		document.getElementById("gl-canvas").onmousemove = function (event) {
			if(mousePressed === true){
				physicsFake(event);
				throwCount = true;
			}
		};
	};
	
	document.getElementById("gl-canvas").onmouseup = function(event){
		mousePressed = false;
		window.onmousemove = function (event) {
			if(mousePressed === false &&  throwCount === true){
				triangleMove(event);
			}
		};
	};

    render();
};

function triangle( a, b, c )
{
    points.push( a, b, c );
	points.push( b, c, a );
}

function divideTriangle( a, b, c, count )
{
	
    // check for end of recursion
    
    if ( count === 0 ) {
        triangle( a, b, c );
    }
    else {
    
        //bisect the sides		
        
        var ab = mix( a, b, triangleSet );
        var ac = mix( a, c, triangleSet );
        var bc = mix( b, c, triangleSet ); //fracture
		
		ab = add( ab, vec2(fracture,shift));
		ac = add( ac, vec2(fracture,shift));
		bc = add( bc, vec2(fracture,shift));

        --count

        // three new triangles
        divideTriangle( a, ab, ac, count );
        divideTriangle( c, ac, bc, count );
        divideTriangle( b, bc, ab, count );
    }
}

function physicsFake(event){
	moveX = event.clientX;
	moveY = event.clientY;
		
	var rect = event.target.getBoundingClientRect();

	moveX = ((moveX - rect.left) - canvas.height / 2) / (canvas.height / 2); // x coord in WebGL space
	moveY = (canvas.width / 2 - (moveY - rect.top)) / (canvas.width / 2); // y coord in WebGL space
	
	moveX = moveX + 0.5;
	moveY = moveY - 0.5;
	
	throwCount = true;
	counter = 0;
}

function triangleMove(event){
	var rect = event.target.getBoundingClientRect();
	
	vPosition_x = gl.getAttribLocation( program, "vPosition.x" );
	vPosition_x += 0.01;
	gl.vertexAttribPointer( vPosition_x, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition_x );
	
	vPosition_y = gl.getAttribLocation( program, "vPosition.y" );
	vPosition_y += 0.01;
	gl.vertexAttribPointer( vPosition_y, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition_y );
	
	moveX = vPosition_x + moveX;
	moveY = vPosition_x + moveY;
	
	if(counter === 0) {
		moveX += 0.01;
		moveY  += 0.01;
		counter = 1;
	}
	
	if((moveX <= 1 && moveX > -1 && counter === 1) || moveX <= -1){
		moveX =  moveX + 1;
	}
	else if(moveX > -1 || moveX > 1){
		moveX = moveX - 0.1;
	}
	
	if((moveY <= 1 && moveY > -1 && counter === 1) || moveY <= -1){
		moveY = moveY + 1;
	}
	else if(moveY > -1 || moveY > 1){
		moveY = moveY - 0.1;
		counter = 2;
	}
	
	if(moveX < 0.5 && counter === 2) counter = 1;
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT );
	
	gl.uniform1i(colorRed, red);
	gl.uniform1i(colorBlue, blue);
	gl.uniform1i(colorGreen, green);
	gl.uniform1f(mouseMoveX, moveX);
	gl.uniform1f(mouseMoveY, moveY);
	gl.uniform1f(scaleChange, scale);
	
	gl.drawArrays( gl.LINES, 0, points.length );
	
	setTimeout(
        function () {requestAnimFrame( render );},
		NumTimesToSubdivide
    );
}

