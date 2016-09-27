// Main canvas and context references
var canvas;
var ctx;

// Frames per second
var fps = 60.0;

function initMain() {
  // Set main canvas and context references
  canvas = document.getElementById("p6canvas");
  ctx = canvas.getContext("2d");

  // Initialize animations
  rightArms.rotateClock = new clock(5.00, 0.00, 1, false, 0, linear, 2.0 * Math.PI, 1.00, 0.0000);
  leftArm.rotateClock = new clock(5.00, 0.00, -1, false, 0, linear, 2.0 * Math.PI, 1.00, 0.0000);

  // Start animation clocks
  rightArms.rotateClock.start();
  leftArm.rotateClock.start();

  // Set animation timer
  setInterval(drawFrame, (1000 / fps));
}

function restart(){
	clearInterval(initChoice);
    initMain();
}

function updateAnimations() {
  // Update animation clocks
  updateAllClocks();
}

function drawFrame() {
  // Update animations
  if(rightArms.rotateClock.value < 1.5) updateAnimations();

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  background(ctx);

  if(rightArms.rotateClock.value > 1.5) hatUP(ctx);

  if(rightArms.rotateClock.value < 1.5) hatDOWN(ctx);

  ctx.save();
  ctx.translate(329.3, 425.5);
  ctx.rotate(rightArms.rotateClock.value);
  rightArms(ctx);
  ctx.restore();

  ctx.save();
  ctx.translate(223.7, 419.4);
  ctx.rotate(leftArm.rotateClock.value);
  leftArm(ctx);
  ctx.restore();

  panels(ctx);

  if(rightArms.rotateClock.value > 1.5) draw(ctx);
}

function background(ctx) {
  // background/Image
  ctx.save();
  ctx.drawImage(document.getElementById("image1"), 0.0, 196.0);
  ctx.restore();
}

function hatUP(ctx) {

  // hatUP/Path
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(376.4, 233.5);
  ctx.lineTo(385.6, 192.2);
  ctx.bezierCurveTo(372.5, 148.2, 318.8, 150.9, 318.8, 150.9);
  ctx.bezierCurveTo(294.3, 150.2, 285.2, 164.4, 285.2, 164.4);
  ctx.lineTo(272.4, 216.8);
  ctx.bezierCurveTo(272.4, 216.8, 323.8, 218.6, 376.4, 233.5);
  ctx.closePath();
  ctx.fillStyle = "rgb(2, 2, 2)";
  ctx.fill();

  // hatUP/Path
  ctx.beginPath();
  ctx.moveTo(376.4, 233.3);
  ctx.bezierCurveTo(376.4, 233.3, 392.4, 241.6, 397.1, 252.3);
  ctx.bezierCurveTo(397.1, 252.3, 406.8, 269.4, 391.3, 287.4);
  ctx.bezierCurveTo(391.3, 287.4, 377.5, 308.4, 331.0, 300.1);
  ctx.bezierCurveTo(331.0, 300.1, 285.5, 293.6, 247.5, 249.5);
  ctx.bezierCurveTo(247.5, 249.5, 206.0, 208.7, 272.4, 216.6);
  ctx.bezierCurveTo(272.4, 216.6, 337.3, 218.4, 376.4, 233.3);
  ctx.closePath();
  ctx.fill();

  // hatUP/Path
  ctx.beginPath();
  ctx.moveTo(264.9, 243.4);
  ctx.bezierCurveTo(264.9, 243.4, 271.2, 230.1, 316.3, 239.6);
  ctx.bezierCurveTo(316.3, 239.6, 366.4, 249.6, 370.1, 270.8);
  ctx.bezierCurveTo(370.1, 270.8, 369.0, 303.0, 304.2, 282.1);
  ctx.bezierCurveTo(304.2, 282.1, 259.1, 264.0, 264.9, 243.4);
  ctx.closePath();
  ctx.fillStyle = "rgb(254, 254, 255)";
  ctx.fill();

  // hatUP/ShKewwtif

  // hatUP/ShKewwtif/Layer 1
  ctx.save();
  ctx.drawImage(document.getElementById("image2"), 255.6, 217.1);

  // hatUP/Path
  ctx.restore();
  ctx.beginPath();
  ctx.moveTo(379.5, 219.4);
  ctx.lineTo(376.4, 233.5);
  ctx.bezierCurveTo(323.8, 218.6, 272.4, 216.8, 272.4, 216.8);
  ctx.lineTo(276.6, 199.8);
  ctx.bezierCurveTo(276.6, 199.8, 335.3, 199.8, 379.5, 219.4);
  ctx.closePath();
  ctx.fillStyle = "rgb(200, 192, 192)";
  ctx.fill();
  ctx.strokeStyle = "rgb(2, 2, 2)";
  ctx.stroke();

  // hatUP/Path
  ctx.beginPath();
  ctx.moveTo(391.2, 288.8);
  ctx.bezierCurveTo(406.6, 270.9, 396.9, 253.8, 396.9, 253.8);
  ctx.bezierCurveTo(392.3, 243.0, 376.3, 234.8, 376.3, 234.8);
  ctx.bezierCurveTo(337.1, 219.9, 272.3, 218.1, 272.3, 218.1);
  ctx.bezierCurveTo(205.9, 210.2, 247.4, 250.9, 247.4, 250.9);
  ctx.lineTo(254.4, 252.9);
  ctx.bezierCurveTo(254.4, 252.9, 256.9, 234.5, 272.4, 231.0);
  ctx.bezierCurveTo(272.4, 231.0, 365.8, 228.8, 366.1, 262.7);
  ctx.lineTo(391.2, 288.8);
  ctx.closePath();
  ctx.fillStyle = "rgb(2, 2, 2)";
  ctx.fill();
  ctx.restore();
}

function hatDOWN(ctx) {

  // hatDOWN/Layer 1
  ctx.save();
  ctx.drawImage(document.getElementById("image3"), 264.5, 217.1);

  // hatDOWN/Path
  ctx.beginPath();
  ctx.moveTo(267.5, 265.6);
  ctx.lineTo(264.0, 220.1);
  ctx.bezierCurveTo(264.0, 220.1, 266.5, 200.6, 318.0, 200.1);
  ctx.bezierCurveTo(318.0, 200.1, 367.0, 197.1, 376.5, 219.1);
  ctx.lineTo(372.5, 265.6);
  ctx.bezierCurveTo(372.5, 265.6, 399.0, 264.1, 400.0, 284.6);
  ctx.bezierCurveTo(400.0, 284.6, 408.5, 349.6, 316.5, 356.1);
  ctx.bezierCurveTo(316.5, 356.1, 240.5, 357.7, 240.5, 290.1);
  ctx.bezierCurveTo(240.5, 287.6, 240.5, 287.6, 240.5, 287.6);
  ctx.bezierCurveTo(240.5, 287.6, 243.0, 265.6, 267.5, 265.6);
  ctx.closePath();
  ctx.fillStyle = "rgb(2, 2, 2)";
  ctx.fill();

  // hatDOWN/Path
  ctx.beginPath();
  ctx.moveTo(313.0, 328.1);
  ctx.bezierCurveTo(313.0, 328.1, 280.0, 325.6, 267.0, 305.1);
  ctx.lineTo(267.0, 279.1);
  ctx.bezierCurveTo(267.0, 279.1, 269.5, 295.1, 313.0, 301.6);
  ctx.bezierCurveTo(313.0, 301.6, 362.5, 307.5, 372.5, 274.1);
  ctx.lineTo(372.5, 301.1);
  ctx.bezierCurveTo(372.5, 301.1, 368.0, 331.1, 313.0, 328.1);
  ctx.closePath();
  ctx.fillStyle = "rgb(200, 192, 192)";
  ctx.fill();
  ctx.strokeStyle = "rgb(2, 2, 2)";
  ctx.stroke();
  ctx.restore();
}

function rightArms(ctx) {

  // rightArms/Utencils
  ctx.save();

  // rightArms/Utencils/Path
  ctx.save();
  // This unsupported artwork has been rasterized
  ctx.drawImage(document.getElementById("image4"), -43.4, 219.0);

  // rightArms/Utencils/Path
  ctx.beginPath();
  ctx.moveTo(4.5, 237.5);
  ctx.bezierCurveTo(3.5, 238.5, 1.8, 238.6, 0.7, 237.5);
  ctx.bezierCurveTo(-0.4, 236.5, -0.5, 234.9, 0.5, 233.8);
  ctx.bezierCurveTo(1.4, 232.8, 3.1, 232.7, 4.2, 233.7);
  ctx.bezierCurveTo(5.3, 234.8, 5.4, 236.4, 4.5, 237.5);
  ctx.closePath();
  ctx.fillStyle = "rgb(254, 254, 255)";
  ctx.fill();
  ctx.stroke();

  // rightArms/Utencils/Path
  ctx.beginPath();
  ctx.moveTo(2.7, 247.5);
  ctx.bezierCurveTo(1.7, 248.5, 0.0, 248.6, -1.1, 247.5);
  ctx.bezierCurveTo(-2.2, 246.5, -2.3, 244.9, -1.3, 243.8);
  ctx.bezierCurveTo(-0.4, 242.8, 1.3, 242.7, 2.4, 243.8);
  ctx.bezierCurveTo(3.5, 244.8, 3.6, 246.4, 2.7, 247.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // rightArms/Utencils/Path
  ctx.beginPath();
  ctx.moveTo(11.1, 234.3);
  ctx.bezierCurveTo(11.1, 234.3, 15.3, 243.5, 9.2, 248.0);
  ctx.bezierCurveTo(9.2, 248.0, 21.2, 243.8, 11.1, 234.3);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // rightArms/Utencils/Path
  // This unsupported artwork has been rasterized
  ctx.drawImage(document.getElementById("image5"), -94.5, 134.5);

  // rightArms/Utencils/Path
  ctx.beginPath();
  ctx.moveTo(-34.7, 159.6);
  ctx.bezierCurveTo(-32.8, 160.5, -32.0, 162.7, -32.8, 164.3);
  ctx.bezierCurveTo(-33.7, 166.0, -35.9, 166.5, -37.8, 165.6);
  ctx.bezierCurveTo(-39.7, 164.6, -40.5, 162.5, -39.7, 160.8);
  ctx.bezierCurveTo(-38.8, 159.2, -36.6, 158.6, -34.7, 159.6);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgb(2, 2, 2)";
  ctx.stroke();

  // rightArms/Utencils/Path
  ctx.beginPath();
  ctx.moveTo(-23.7, 171.7);
  ctx.bezierCurveTo(-23.7, 171.7, -17.3, 171.2, -14.7, 165.4);
  ctx.lineTo(-10.0, 167.8);
  ctx.bezierCurveTo(-10.0, 167.8, -14.8, 172.7, -23.7, 171.7);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // rightArms/Utencils/Path
  // This unsupported artwork has been rasterized
  ctx.drawImage(document.getElementById("image6"), -38.4, 177.3);

  // rightArms/Utencils/Path
  ctx.beginPath();
  ctx.moveTo(49.8, 288.1);
  ctx.bezierCurveTo(50.8, 288.3, 51.4, 289.4, 51.1, 290.6);
  ctx.bezierCurveTo(50.8, 291.7, 49.8, 292.5, 48.8, 292.2);
  ctx.bezierCurveTo(47.8, 292.0, 47.2, 290.8, 47.5, 289.7);
  ctx.bezierCurveTo(47.8, 288.5, 48.8, 287.8, 49.8, 288.1);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.stroke();

  // rightArms/Utencils/Path
  ctx.beginPath();
  ctx.moveTo(46.2, 279.7);
  ctx.bezierCurveTo(47.2, 279.9, 47.8, 281.1, 47.5, 282.2);
  ctx.bezierCurveTo(47.2, 283.3, 46.2, 284.1, 45.2, 283.8);
  ctx.bezierCurveTo(44.2, 283.6, 43.6, 282.5, 43.9, 281.3);
  ctx.bezierCurveTo(44.2, 280.2, 45.2, 279.4, 46.2, 279.7);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // rightArms/Utencils/Path
  ctx.beginPath();
  ctx.moveTo(53.7, 286.0);
  ctx.bezierCurveTo(53.7, 286.0, 52.5, 280.2, 50.4, 278.2);
  ctx.bezierCurveTo(50.4, 278.2, 56.3, 281.3, 53.7, 286.0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // rightArms/Arm
  ctx.restore();

  // rightArms/Arm/Path
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(121.1, 191.4);
  ctx.bezierCurveTo(121.1, 191.4, 138.0, 191.6, 139.1, 217.3);
  ctx.bezierCurveTo(139.1, 217.3, 137.7, 233.3, 124.9, 252.5);
  ctx.bezierCurveTo(124.9, 252.5, 126.1, 266.7, 113.5, 268.9);
  ctx.bezierCurveTo(113.5, 268.9, 103.9, 269.6, 103.3, 261.8);
  ctx.bezierCurveTo(103.3, 261.8, 97.2, 272.2, 86.1, 266.3);
  ctx.bezierCurveTo(86.1, 266.3, 79.7, 260.7, 83.4, 254.4);
  ctx.bezierCurveTo(83.4, 254.4, 78.2, 266.3, 70.5, 263.4);
  ctx.bezierCurveTo(70.5, 263.4, 56.6, 256.2, 69.5, 244.7);
  ctx.bezierCurveTo(69.5, 244.7, 60.3, 250.8, 56.0, 244.8);
  ctx.bezierCurveTo(56.0, 244.8, 50.6, 236.8, 54.9, 230.6);
  ctx.lineTo(66.7, 218.1);
  ctx.bezierCurveTo(66.7, 218.1, 60.1, 209.9, 71.5, 198.9);
  ctx.bezierCurveTo(71.5, 198.9, 92.5, 180.0, 104.7, 181.8);
  ctx.bezierCurveTo(104.7, 181.8, 117.9, 183.7, 121.1, 191.4);
  ctx.closePath();
  ctx.fillStyle = "rgb(254, 254, 255)";
  ctx.fill();
  ctx.strokeStyle = "rgb(2, 2, 2)";
  ctx.stroke();

  // rightArms/Arm/Path
  ctx.beginPath();
  ctx.moveTo(99.6, 28.5);
  ctx.bezierCurveTo(99.6, 28.5, 76.4, 150.2, 80.4, 190.0);
  ctx.lineTo(153.9, 198.7);
  ctx.bezierCurveTo(153.9, 198.7, 158.4, 171.4, 159.1, 154.7);
  ctx.bezierCurveTo(159.1, 154.7, 182.1, 96.3, 168.2, -34.9);
  ctx.bezierCurveTo(168.2, -34.9, 139.1, -98.5, 108.7, -81.6);
  ctx.bezierCurveTo(108.7, -81.6, 105.8, -6.6, 99.6, 28.5);
  ctx.closePath();
  ctx.fillStyle = "rgb(9, 13, 12)";
  ctx.fill();
  ctx.strokeStyle = "rgb(112, 112, 112)";
  ctx.stroke();

  // rightArms/Arm/Path
  ctx.beginPath();
  ctx.moveTo(72.9, 232.7);
  ctx.bezierCurveTo(72.9, 232.7, 68.1, 230.0, 67.4, 224.1);
  ctx.strokeStyle = "rgb(2, 2, 2)";
  ctx.stroke();

  // rightArms/Arm/Path
  ctx.beginPath();
  ctx.moveTo(88.1, 243.2);
  ctx.bezierCurveTo(88.1, 243.2, 80.7, 245.1, 78.3, 238.2);
  ctx.stroke();

  // rightArms/Arm/Path
  ctx.beginPath();
  ctx.moveTo(100.0, 249.8);
  ctx.bezierCurveTo(100.0, 249.8, 93.6, 250.2, 91.6, 247.0);
  ctx.stroke();

  // rightArms/Arm/Path
  ctx.beginPath();
  ctx.moveTo(119.0, 251.4);
  ctx.bezierCurveTo(119.0, 251.4, 112.3, 254.1, 109.9, 250.5);
  ctx.stroke();
  ctx.restore();
  ctx.restore();
}

function leftArm(ctx) {

  // leftArm/Utencils
  ctx.save();

  // leftArm/Utencils/Path
  ctx.save();
  // This unsupported artwork has been rasterized
  ctx.drawImage(document.getElementById("image7"), -124.9, 220.3);

  // leftArm/Utencils/Path
  ctx.beginPath();
  ctx.moveTo(70.6, 237.8);
  ctx.bezierCurveTo(71.6, 238.9, 73.3, 238.9, 74.4, 237.9);
  ctx.bezierCurveTo(75.5, 236.9, 75.6, 235.2, 74.6, 234.1);
  ctx.bezierCurveTo(73.7, 233.1, 72.0, 233.1, 70.9, 234.1);
  ctx.bezierCurveTo(69.8, 235.1, 69.7, 236.8, 70.6, 237.8);
  ctx.closePath();
  ctx.fillStyle = "rgb(254, 254, 255)";
  ctx.fill();
  ctx.stroke();

  // leftArm/Utencils/Path
  ctx.beginPath();
  ctx.moveTo(72.4, 247.8);
  ctx.bezierCurveTo(73.4, 248.9, 75.1, 248.9, 76.2, 247.9);
  ctx.bezierCurveTo(77.3, 246.9, 77.4, 245.2, 76.4, 244.2);
  ctx.bezierCurveTo(75.5, 243.1, 73.8, 243.1, 72.7, 244.1);
  ctx.bezierCurveTo(71.6, 245.1, 71.5, 246.8, 72.4, 247.8);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // leftArm/Utencils/Path
  ctx.beginPath();
  ctx.moveTo(64.0, 234.6);
  ctx.bezierCurveTo(64.0, 234.6, 59.8, 243.8, 65.9, 248.4);
  ctx.bezierCurveTo(65.9, 248.4, 53.9, 244.2, 64.0, 234.6);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // leftArm/Utencils/Path
  // This unsupported artwork has been rasterized
  ctx.drawImage(document.getElementById("image8"), -95.6, 134.9);

  // leftArm/Utencils/Path
  ctx.beginPath();
  ctx.moveTo(109.8, 159.9);
  ctx.bezierCurveTo(107.9, 160.9, 107.1, 163.0, 107.9, 164.7);
  ctx.bezierCurveTo(108.8, 166.3, 111.0, 166.9, 112.9, 165.9);
  ctx.bezierCurveTo(114.8, 165.0, 115.6, 162.8, 114.8, 161.2);
  ctx.bezierCurveTo(113.9, 159.5, 111.7, 159.0, 109.8, 159.9);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgb(2, 2, 2)";
  ctx.stroke();

  // leftArm/Utencils/Path
  ctx.beginPath();
  ctx.moveTo(98.8, 172.0);
  ctx.bezierCurveTo(98.8, 172.0, 92.4, 171.5, 89.8, 165.7);
  ctx.lineTo(85.1, 168.1);
  ctx.bezierCurveTo(85.1, 168.1, 89.9, 173.0, 98.8, 172.0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // leftArm/Utencils/Path
  // This unsupported artwork has been rasterized
  ctx.drawImage(document.getElementById("image9"), -127.0, 177.7);

  // leftArm/Utencils/Path
  ctx.beginPath();
  ctx.moveTo(25.3, 288.4);
  ctx.bezierCurveTo(24.3, 288.7, 23.7, 289.8, 24.0, 290.9);
  ctx.bezierCurveTo(24.3, 292.1, 25.3, 292.8, 26.3, 292.5);
  ctx.bezierCurveTo(27.3, 292.3, 27.9, 291.2, 27.6, 290.0);
  ctx.bezierCurveTo(27.3, 288.9, 26.3, 288.2, 25.3, 288.4);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.stroke();

  // leftArm/Utencils/Path
  ctx.beginPath();
  ctx.moveTo(28.9, 280.0);
  ctx.bezierCurveTo(27.9, 280.3, 27.3, 281.4, 27.6, 282.5);
  ctx.bezierCurveTo(27.9, 283.7, 28.9, 284.4, 29.9, 284.2);
  ctx.bezierCurveTo(30.9, 283.9, 31.5, 282.8, 31.2, 281.6);
  ctx.bezierCurveTo(30.9, 280.5, 29.9, 279.8, 28.9, 280.0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // leftArm/Arm
  ctx.restore();

  // leftArm/Arm/Path
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(21.4, 286.3);
  ctx.bezierCurveTo(21.4, 286.3, 22.6, 280.6, 24.7, 278.6);
  ctx.bezierCurveTo(24.7, 278.6, 18.8, 281.7, 21.4, 286.3);
  ctx.closePath();
  ctx.fillStyle = "rgb(254, 254, 255)";
  ctx.fill();
  ctx.stroke();

  // leftArm/Arm/Path
  ctx.beginPath();
  ctx.moveTo(-46.0, 191.7);
  ctx.bezierCurveTo(-46.0, 191.7, -62.9, 191.9, -64.0, 217.6);
  ctx.bezierCurveTo(-64.0, 217.6, -62.6, 233.7, -49.8, 252.8);
  ctx.bezierCurveTo(-49.8, 252.8, -51.0, 267.0, -38.4, 269.3);
  ctx.bezierCurveTo(-38.4, 269.3, -28.9, 269.9, -28.2, 262.1);
  ctx.bezierCurveTo(-28.2, 262.1, -22.1, 272.6, -11.0, 266.7);
  ctx.bezierCurveTo(-11.0, 266.7, -4.6, 261.0, -8.3, 254.8);
  ctx.bezierCurveTo(-8.3, 254.8, -3.1, 266.6, 4.6, 263.7);
  ctx.bezierCurveTo(4.6, 263.7, 18.5, 256.5, 5.6, 245.1);
  ctx.bezierCurveTo(5.6, 245.1, 14.8, 251.2, 19.1, 245.1);
  ctx.bezierCurveTo(19.1, 245.1, 24.5, 237.1, 20.2, 231.0);
  ctx.lineTo(8.4, 218.4);
  ctx.bezierCurveTo(8.4, 218.4, 14.9, 210.3, 3.6, 199.2);
  ctx.bezierCurveTo(3.6, 199.2, -17.4, 180.4, -29.6, 182.1);
  ctx.bezierCurveTo(-29.6, 182.1, -42.8, 184.0, -46.0, 191.7);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgb(2, 2, 2)";
  ctx.stroke();

  // leftArm/Arm/Path
  ctx.beginPath();
  ctx.moveTo(-43.9, 251.8);
  ctx.bezierCurveTo(-43.9, 251.8, -37.2, 254.4, -34.8, 250.9);
  ctx.stroke();

  // leftArm/Arm/Path
  ctx.beginPath();
  ctx.moveTo(-24.9, 250.1);
  ctx.bezierCurveTo(-24.9, 250.1, -18.5, 250.6, -16.5, 247.3);
  ctx.stroke();

  // leftArm/Arm/Path
  ctx.beginPath();
  ctx.moveTo(-13.0, 243.6);
  ctx.bezierCurveTo(-13.0, 243.6, -5.6, 245.5, -3.2, 238.5);
  ctx.stroke();

  // leftArm/Arm/Path
  ctx.beginPath();
  ctx.moveTo(2.2, 233.1);
  ctx.bezierCurveTo(2.2, 233.1, 7.0, 230.4, 7.7, 224.4);
  ctx.stroke();

  // leftArm/Arm/Path
  ctx.beginPath();
  ctx.moveTo(-77.9, 28.8);
  ctx.bezierCurveTo(-77.9, 28.8, -101.1, 150.6, -97.1, 190.3);
  ctx.lineTo(-23.6, 199.0);
  ctx.bezierCurveTo(-23.6, 199.0, -19.0, 171.7, -18.4, 155.0);
  ctx.bezierCurveTo(-18.4, 155.0, 4.6, 96.6, -9.3, -34.6);
  ctx.bezierCurveTo(-9.3, -34.6, -15.7, -99.7, -68.7, -81.2);
  ctx.bezierCurveTo(-68.7, -81.2, -71.7, -6.3, -77.9, 28.8);
  ctx.closePath();
  ctx.fillStyle = "rgb(9, 13, 12)";
  ctx.fill();
  ctx.strokeStyle = "rgb(112, 112, 112)";
  ctx.stroke();
  ctx.restore();
  ctx.restore();
}

function panels(ctx) {

  // panels/Rectangle
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(612.0, 196.0);
  ctx.lineTo(0.0, 196.0);
  ctx.lineTo(0.0, 0.0);
  ctx.lineTo(612.0, 0.0);
  ctx.lineTo(612.0, 196.0);
  ctx.closePath();
  ctx.fillStyle = "rgb(133, 72, 71)";
  ctx.fill();

  // panels/Rectangle
  ctx.beginPath();
  ctx.moveTo(0.0, 596.0);
  ctx.lineTo(612.0, 596.0);
  ctx.lineTo(612.0, 792.0);
  ctx.lineTo(0.0, 792.0);
  ctx.lineTo(0.0, 596.0);
  ctx.closePath();
  ctx.fillStyle = "rgb(246, 242, 224)";
  ctx.fill();
  ctx.restore();
}

function draw(ctx) {

  // text/Select Your Utencil
  ctx.save();
  ctx.font = "Bold 48.0px 'Noteworthy'";
  ctx.fillStyle = "rgb(233, 176, 48)";
  ctx.fillText("Select Your Utensil", 126.1, 148.0);
  ctx.restore();
}
