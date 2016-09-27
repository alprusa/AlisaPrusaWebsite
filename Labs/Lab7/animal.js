//file for animal attributes
var aniOffset = 0, xAn = 0.0, zAn = 1.0, yAn = 0.0, scaleAn = 1.0, thetaAn = [0.0, 0.0, 0.0], moveBack = false, moveForward = true;
var AnimalVertices = 36, animVertices , rotZuppArm = 0.0 , rotZlowArm = 0.0, bodypart = 0, aniLimbOffset = 0, aniHeadOffset = 0;
var saveXZValues = [], firstLoad = true, saveArrayIndexX = 0, walkOffset = 0;

//set firstLoad saveXZValues.length = 0?
function createAnimal(){

	if(firstLoad === true){
		xAn = -1.0;
		saveXZValues[0] = xAn;
	}
	saveArrayIndexX = 0;
	zAn = 1.0;
	walkOffset = 0.012;
    headLoad();
	
	if(firstLoad === true){
		xAn = 0.0;
		saveXZValues[2] = xAn;
	}
	saveArrayIndexX = 2;
	zAn = 1.0;
	walkOffset = 0.008;
    base();
	
	//front left arm
	if(firstLoad === true){
		xAn = -0.4;
		saveXZValues[4] = xAn;
	}
	saveArrayIndexX = 4;
	zAn = 0.7;
	walkOffset = 0.012;
    upperArm();
	
	if(firstLoad === true){
		xAn = -0.5;
		saveXZValues[6] = xAn;
	}
	saveArrayIndexX = 6;
	zAn = 0.6;
	walkOffset = 0.019;
    lowerArm();
	
	//front right arm
	if(firstLoad === true){
		xAn = -0.4;
		saveXZValues[8] = xAn;
	}
	saveArrayIndexX = 8;
	zAn = 1.3;
	walkOffset = 0.012;
    upperArm();
	
	if(firstLoad === true){
		xAn = -0.5;
		saveXZValues[10] = xAn;
	}
	saveArrayIndexX = 10;
	zAn = 1.4;
	walkOffset = 0.019;
    lowerArm();
	
	//back left arm
	if(firstLoad === true){
		xAn = 0.4;
		saveXZValues[12] = xAn;
	}
	saveArrayIndexX = 12;
	zAn = 0.7;
	walkOffset = 0.012;
    upperArm();
	
	if(firstLoad === true){
		xAn = 0.5;
		saveXZValues[14] = xAn;
	}
	saveArrayIndexX = 14;
	zAn = 0.6;
	walkOffset = 0.019;
    lowerArm();
	
	//back right arm
	if(firstLoad === true){
		xAn = 0.4;
		saveXZValues[16] = xAn;
	}
	saveArrayIndexX = 16;
	zAn = 1.3;
	walkOffset = 0.012;
    upperArm();
	
	if(firstLoad === true){
		xAn = 0.5;
		saveXZValues[18] = xAn;
	}
	saveArrayIndexX = 18;
	zAn = 1.4;
	walkOffset = 0.019;
    lowerArm();
	
	//right eye
	if(firstLoad === true){
		xAn = -7.0;
		saveXZValues[20] = xAn;
	}
	saveArrayIndexX = 20;
	walkOffset = 0.14;
    eyes();
	
	/*//left eye
	if(firstLoad === true){
		xAn = 4;
		saveXZValues[22] = xAn;
	}
	saveArrayIndexX = 22;
	saveArrayIndexZ = 23;
	walkOffset = 0.14;
    eyes();*/
	
	firstLoad = false;
}

function animalForm(a, b, c, d, length, height, width) {
	var noramalsCol = vec4( 0.8, 0.8, 0.8, 1.0 );
	
	animVertices = [
		vec4( -length, -height,  width, 1.0 ),
		vec4( -length,  height,  width, 1.0 ),
		vec4(  length,  height,  width, 1.0 ),
		vec4(  length, -height,  width, 1.0 ),
		vec4( -length, -height, -width, 1.0 ),
		vec4( -length,  height, -width, 1.0 ),
		vec4(  length,  height, -width, 1.0 ),
		vec4(  length, -height, -width, 1.0 )
	];
	
	normals.push(noramalsCol);
    normals.push(noramalsCol);
    normals.push(noramalsCol);
    normals.push(noramalsCol);
	normals.push(noramalsCol);
	normals.push(noramalsCol);
	
    points.push(animVertices[a]);
    points.push(animVertices[b]);
    points.push(animVertices[c]);
	
	points.push(animVertices[a]);
    points.push(animVertices[c]);
    points.push(animVertices[d]);

    textureCoord.push(animVertices[a]);
    textureCoord.push(animVertices[b]);
    textureCoord.push(animVertices[c]);
	
	textureCoord.push(animVertices[a]);
    textureCoord.push(animVertices[c]);
    textureCoord.push(animVertices[d]);
	
	if(bodypart === 0) aniOffset += 6;
	else if(bodypart === 1) aniLimbOffset +=6;
	else aniHeadOffset +=6;
}

function animal(){
	bodypart = 0;
    animalForm( 1, 0, 3, 2, 0.7, 0.5, 0.3);
    animalForm( 2, 3, 7, 6, 0.7, 0.5, 0.3);
    animalForm( 3, 0, 4, 7, 0.7, 0.5, 0.3);
    animalForm( 6, 5, 1, 2, 0.7, 0.5, 0.3);
    animalForm( 4, 5, 6, 7, 0.7, 0.5, 0.3);
    animalForm( 5, 4, 0, 1, 0.7, 0.5, 0.3);
}

function limbs(){
	bodypart = 1;
	animalForm( 1, 0, 3, 2, 0.3, 0.5, 0.2);
    animalForm( 2, 3, 7, 6, 0.3, 0.5, 0.2);
    animalForm( 3, 0, 4, 7, 0.3, 0.5, 0.2);
    animalForm( 6, 5, 1, 2, 0.3, 0.5, 0.2);
    animalForm( 4, 5, 6, 7, 0.3, 0.5, 0.2);
    animalForm( 5, 4, 0, 1, 0.3, 0.5, 0.2);
}

function head(){
	bodypart = 2;
	animalForm( 1, 0, 3, 2, 0.3, 0.3, 0.3);
    animalForm( 2, 3, 7, 6, 0.3, 0.3, 0.3);
    animalForm( 3, 0, 4, 7, 0.3, 0.3, 0.3);
    animalForm( 6, 5, 1, 2, 0.3, 0.3, 0.3);
    animalForm( 4, 5, 6, 7, 0.3, 0.3, 0.3);
    animalForm( 5, 4, 0, 1, 0.3, 0.3, 0.3);
}

function animalLoc(){
	if((saveXZValues[saveArrayIndexX] <= 4 && saveXZValues[saveArrayIndexX] < -15) || moveForward === true){
		saveXZValues[saveArrayIndexX] = saveXZValues[saveArrayIndexX] + 0.01 + walkOffset;
		moveForward = true;
		moveBack = false;
		if(saveXZValues[saveArrayIndexX] > 4) {
			moveBack = true;
			moveForward = false;
		}
	}
	if((saveXZValues[saveArrayIndexX] >= -15 && saveXZValues[saveArrayIndexX] > 4) || moveBack === true){
		saveXZValues[saveArrayIndexX] = saveXZValues[saveArrayIndexX] - 0.01 - walkOffset;
		moveBack = true;
		moveForward = false;
		if(saveXZValues[saveArrayIndexX] < -15) {
			moveForward = true;
			moveBack = false;
		}
	}
}

//create body parts
function base(){
	var baseOffset = index + offset;
	
	if(animate === true) animalLoc();
	gl.uniform1f(xTrans, saveXZValues[saveArrayIndexX]);
    yAn = 0.2;
	gl.uniform1f(yTrans, yAn);
	gl.uniform1f(zTrans, zAn);
	
	scaleAn = 1.5;
	gl.uniform1f(scaleChange, scaleAn);
	thetaAn = [15.0, 0.0, 0.0]
	gl.uniform3fv(thetaLoc, thetaAn);
	
    gl.drawArrays( gl.TRIANGLES, baseOffset, aniOffset );
}

function upperArm(){
	var armoffset = points.length - aniLimbOffset - aniHeadOffset;
	
	if(animate === true) animalLoc();
	gl.uniform1f(xTrans, saveXZValues[saveArrayIndexX]);
    yAn = -0.5;
	gl.uniform1f(yTrans, yAn);
	gl.uniform1f(zTrans, zAn);
	
	scaleAn = 2.0;
	gl.uniform1f(scaleChange, scaleAn);
	thetaAn = [15.0, 0.0, rotZuppArm]
	gl.uniform3fv(thetaLoc, thetaAn);
	
    gl.drawArrays( gl.TRIANGLES, armoffset, aniLimbOffset );
}

function lowerArm(){
	var armoffset = points.length - aniLimbOffset - aniHeadOffset;
	
	if(animate === true) animalLoc();
	gl.uniform1f(xTrans, saveXZValues[saveArrayIndexX]);
    yAn = -1.4;
	gl.uniform1f(yTrans, yAn);
	gl.uniform1f(zTrans, zAn);
	
	scaleAn = 3.0;
	gl.uniform1f(scaleChange, scaleAn);
	thetaAn = [15.0, 1.0, rotZlowArm]
	gl.uniform3fv(thetaLoc, thetaAn);
	
    gl.drawArrays( gl.TRIANGLES, armoffset, aniLimbOffset );
}

function headLoad(){
	if(animate === true) animalLoc();
	gl.uniform1f(xTrans, saveXZValues[saveArrayIndexX]);
    yAn = 1.0;
	gl.uniform1f(yTrans, yAn);
	gl.uniform1f(zTrans, zAn);
	
	scaleAn = 2.0;
	gl.uniform1f(scaleChange, scaleAn);
	thetaAn = [15.0, 0.0, 0.0]
	gl.uniform3fv(thetaLoc, thetaAn);
	
    gl.drawArrays( gl.TRIANGLES, points.length - aniHeadOffset, aniHeadOffset );
}

function eyes(){
	if(animate === true) animalLoc();
    yAn = 8.8;
	zAn = 3.0;
	gl.uniform1f(yTrans, yAn);
	gl.uniform1f(xTrans, saveXZValues[saveArrayIndexX]);
	gl.uniform1f(zTrans, zAn);
	
	scaleAn = 20.0;
	gl.uniform1f(scaleChange, scaleAn);
	thetaAn = [15.0, 0.0, 0.0]
	gl.uniform3fv(thetaLoc, thetaAn);
	
	for( var i=0; i<index; i+=3)
        gl.drawArrays( gl.TRIANGLES, i, 3  );
}