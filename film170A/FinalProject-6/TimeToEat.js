// Main canvas and context references
var canvas;
var ctx;

// Frames per second
var fps = 60.0;

// Animations
var animations = [ new eatingSpoon(), new eatingKnife(), new eatingFork() ];

function eatingSpoon() {

  // Control and anchor points
  this.points = [
				[ [127.7, 164.3], [150.4, 235.8], [143.4, 301.8], [112.1, 311.7] ],
				[ [112.1, 311.7], [80.8, 321.7], [37.0, 271.8], [14.3, 200.3] ],
				[ [14.3, 200.3], [-8.4, 128.8], [-1.4, 62.8], [30.0, 52.8] ],
				[ [30.0, 52.8], [61.3, 42.9], [105.1, 92.8], [127.7, 164.3] ]
				];

  // Linear motion index
  this.linear = [
				[0, 0.00, 0.00], [0, 0.25, 0.08], [0, 0.55, 0.17], [1, 0.00, 0.25], 
				[1, 0.45, 0.33], [1, 0.75, 0.42], [1, 1.00, 0.50], [2, 0.25, 0.58], 
				[2, 0.55, 0.67], [3, 0.00, 0.75], [3, 0.45, 0.83], [3, 0.75, 0.92], 
				[3, 1.00, 1.00]
				];

  // Segment T boundaries
  this.segmentT = [0.25, 0.50, 0.75, 1.00];

  this.lastValue = -1.0;
  this.x = 0;
  this.y = 0;
  this.orientation = 0.0;
  this.pathClock = new clock(5.00, 0.00, 1, false, 0, linear, this.linear.length - 1, 1.00, 0.0000);

  // Update function
  this.update = updatePath;
}

function eatingKnife() {
	// Control and anchor points
	this.points = [
				[ [254.3, 384.3], [307.7, 431.6], [347.1, 474.4], [342.4, 479.8] ],
				[ [342.4, 479.8], [337.6, 485.1], [290.5, 451.1], [237.0, 403.7] ],
				[ [237.0, 403.7], [183.6, 356.4], [144.2, 313.6], [148.9, 308.3] ],
				[ [148.9, 308.3], [153.7, 302.9], [200.9, 336.9], [254.3, 384.3] ]
				];

	// Linear motion index
	this.linear = [
				[0, 0.00, 0.00], [0, 0.26, 0.10], [0, 0.60, 0.20], [1, 0.40, 0.30], 
				[1, 0.74, 0.40], [1, 1.00, 0.50], [2, 0.26, 0.60], [2, 0.60, 0.70], 
				[3, 0.40, 0.80], [3, 0.74, 0.90], [3, 1.00, 1.00]
				];

	// Segment T boundaries
	this.segmentT = [0.25, 0.50, 0.75, 1.00];

	this.lastValue = -1.0;
	this.x = 0;
	this.y = 0;
	this.orientation = 0.0;
	this.pathClock = new clock(5.00, 0.00, 1, false, 0, linear, this.linear.length - 1, 1.00, 0.0000);

	// Update function
	this.update = updatePath;
}

function eatingFork() {
	// Control and anchor points
	this.points = [
				[ [275.3, 119.0], [302.6, 185.7], [321.6, 241.0], [317.7, 242.6] ],
				[ [317.7, 242.6], [313.9, 244.2], [288.6, 191.4], [261.3, 124.7] ],
				[ [261.3, 124.7], [234.1, 58.0], [215.1, 2.6], [219.0, 1.0] ],
				[ [219.0, 1.0], [222.8, -0.5], [248.1, 52.3], [275.3, 119.0] ]
				];

	// Linear motion index
	this.linear = [
				[0, 0.00, 0.00], [0, 0.26, 0.10], [0, 0.60, 0.20], [1, 0.40, 0.30], 
				[1, 0.74, 0.40], [1, 1.00, 0.50], [2, 0.26, 0.60], [2, 0.60, 0.70], 
				[3, 0.40, 0.80], [3, 0.74, 0.90], [3, 1.00, 1.00]
				];

	// Segment T boundaries
	this.segmentT = [0.25, 0.50, 0.75, 1.00];

	this.lastValue = -1.0;
	this.x = 0;
	this.y = 0;
	this.orientation = 0.0;
	this.pathClock = new clock(5.00, 0.00, 1, false, 0, linear, this.linear.length - 1, 1.00, 0.0000);

	// Update function
	this.update = updatePath;
}

function initChoice() {
	clearInterval(initMain);
	// Set main canvas and context references
	canvas = document.getElementById("p6canvas");
	ctx = canvas.getContext("2d");

	// Start animation clocks
	animations[0].pathClock.start();
	animations[1].pathClock.start();
	animations[2].pathClock.start();

	// Set animation timer
	setInterval(drawFrameChoice, (1000 / fps));
}

function updateAnimationsChoice() {

  // Update animation paths  
  var animationCount = animations.length;
  for (var i = 0; i < animationCount; i++) {
	animations[i].update();
  }
}

function drawFrameChoice() {

  // Update animations
  updateAnimationsChoice();

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  drawTable(ctx);

  hotDog(ctx);

  ctx.save();
  ctx.translate(animations[0].x, animations[0].y);
  spoon(ctx);
  ctx.restore();

  ctx.save();
  ctx.translate(animations[1].x, animations[1].y);
  knife(ctx);
  ctx.restore();

  ctx.save();
  ctx.translate(animations[2].x, animations[2].y);
  fork(ctx);
  ctx.restore();
}

function drawTable(ctx) {
	// background/Rectangle
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(612.0, 792.0);
	ctx.lineTo(0.0, 792.0);
	ctx.lineTo(0.0, 0.0);
	ctx.lineTo(612.0, 0.0);
	ctx.lineTo(612.0, 792.0);
	ctx.closePath();
	ctx.fillStyle = "rgb(88, 183, 231)";
	ctx.fill();

	// background/Rectangle
	ctx.beginPath();
	ctx.moveTo(616.3, 850.3);
	ctx.lineTo(0.0, 799.5);
	ctx.lineTo(31.1, 421.7);
	ctx.lineTo(647.4, 472.4);
	ctx.lineTo(616.3, 850.3);
	ctx.closePath();
	ctx.fillStyle = "rgb(108, 65, 34)";
	ctx.fill();
	ctx.restore();
}

function hotDog(ctx) {

  // hotDog/Linked File
  ctx.save();
  ctx.save();
  ctx.transform(1.000, 0.000, 0.000, 1.000, 240.5, 359.4);
  ctx.drawImage(document.getElementById("imageH"), -200.0, -225.0);
  ctx.restore();
  ctx.restore();
}

function spoon(ctx) {

  // spoon/Path
  ctx.save();
  // This unsupported artwork has been rasterized
  ctx.drawImage(document.getElementById("imageS"), -49.5, -117.5);

  // spoon/Path
  ctx.beginPath();
  ctx.moveTo(10.3, 72.3);
  ctx.bezierCurveTo(11.6, 72.8, 12.3, 74.3, 11.7, 75.7);
  ctx.bezierCurveTo(11.2, 77.2, 9.7, 77.9, 8.4, 77.4);
  ctx.bezierCurveTo(7.0, 76.9, 6.4, 75.4, 6.9, 73.9);
  ctx.bezierCurveTo(7.4, 72.5, 8.9, 71.8, 10.3, 72.3);
  ctx.closePath();
  ctx.fillStyle = "rgb(254, 254, 255)";
  ctx.fill();
  ctx.stroke();

  // spoon/Path
  ctx.beginPath();
  ctx.moveTo(20.2, 70.2);
  ctx.bezierCurveTo(21.6, 70.7, 22.2, 72.2, 21.7, 73.6);
  ctx.bezierCurveTo(21.2, 75.1, 19.7, 75.8, 18.3, 75.3);
  ctx.bezierCurveTo(17.0, 74.8, 16.3, 73.3, 16.9, 71.8);
  ctx.bezierCurveTo(17.4, 70.4, 18.9, 69.7, 20.2, 70.2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // spoon/Path
  ctx.beginPath();
  ctx.moveTo(4.8, 67.3);
  ctx.bezierCurveTo(4.8, 67.3, 11.8, 60.0, 18.3, 64.0);
  ctx.bezierCurveTo(18.3, 64.0, 9.9, 54.4, 4.8, 67.3);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function knife(ctx) {

  // knife/Path
  ctx.save();
  // This unsupported artwork has been rasterized
  ctx.drawImage(document.getElementById("imageK"), -136.0, -82.5);

  // knife/Path
  ctx.beginPath();
  ctx.moveTo(-86.7, -38.9);
  ctx.bezierCurveTo(-84.9, -37.8, -82.6, -38.2, -81.6, -39.8);
  ctx.bezierCurveTo(-80.7, -41.4, -81.4, -43.5, -83.2, -44.6);
  ctx.bezierCurveTo(-85.0, -45.7, -87.2, -45.3, -88.2, -43.7);
  ctx.bezierCurveTo(-89.2, -42.1, -88.5, -40.0, -86.7, -38.9);
  ctx.closePath();
  ctx.fillStyle = "rgb(254, 254, 255)";
  ctx.fill();
  ctx.strokeStyle = "rgb(2, 2, 2)";
  ctx.stroke();

  // knife/Path
  ctx.beginPath();
  ctx.moveTo(-70.6, -35.9);
  ctx.bezierCurveTo(-70.6, -35.9, -67.6, -30.2, -71.1, -24.9);
  ctx.lineTo(-66.6, -22.2);
  ctx.bezierCurveTo(-66.6, -22.2, -65.0, -28.9, -70.6, -35.9);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function fork(ctx) {

  // fork/Path
  ctx.save();
  // This unsupported artwork has been rasterized
  ctx.drawImage(document.getElementById("imageF"), -94.0, -117.5);

  // fork/Path
  ctx.beginPath();
  ctx.moveTo(12.0, 37.7);
  ctx.bezierCurveTo(11.0, 37.6, 10.0, 38.4, 9.9, 39.5);
  ctx.bezierCurveTo(9.7, 40.7, 10.3, 41.8, 11.4, 41.9);
  ctx.bezierCurveTo(12.4, 42.1, 13.3, 41.3, 13.5, 40.1);
  ctx.bezierCurveTo(13.7, 39.0, 13.0, 37.9, 12.0, 37.7);
  ctx.closePath();
  ctx.fillStyle = "rgb(254, 254, 255)";
  ctx.fill();
  ctx.stroke();

  // fork/Path
  ctx.beginPath();
  ctx.moveTo(18.6, 31.4);
  ctx.bezierCurveTo(17.6, 31.3, 16.7, 32.1, 16.5, 33.2);
  ctx.bezierCurveTo(16.3, 34.4, 17.0, 35.5, 18.0, 35.6);
  ctx.bezierCurveTo(19.0, 35.8, 19.9, 35.0, 20.1, 33.8);
  ctx.bezierCurveTo(20.3, 32.7, 19.6, 31.6, 18.6, 31.4);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // fork/Path
  ctx.beginPath();
  ctx.moveTo(9.3, 34.3);
  ctx.bezierCurveTo(9.3, 34.3, 12.6, 29.5, 15.4, 28.5);
  ctx.bezierCurveTo(15.4, 28.5, 8.7, 29.0, 9.3, 34.3);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}
