int X;
void setup(){
  size(720, 480);
  smooth();
  background(64);
  strokeWeight(2);
  ellipseMode(RADIUS);
}

void draw(){
  background(64);
  //Neck
  stroke(0, 255,0);                 // Set stroke to green
  line(266+X, 257+X, 266+X, 162+X); // Left
  line(276+X, 257+X, 276+X, 162+X); // Middle
  line(286+X, 257+X, 286+X, 162+X); // Right

  //Antennae
  line(276+X, 155+X, 246+X, 112+X); // Small
  line(276+X, 155+X, 306+X, 56+X);  // Tall
  line(276+X, 155+X, 342+X, 170+X);   // Medium

  //Body
  noStroke();               // Diable stroke
  fill(230, 0, 230);        // Set to gray
  ellipse(264+X, 377+X, 33, 33);// Antigravity Orb
  fill(0, 30, 0);           // Set to black
  rect(219, 257, 90, 120);  // Main Body
  fill(102, 56, 93);        // Set back to gray
  rect(219, 274, 90,6);     // Gray stripe

  //Head
  fill(20, 20, 20);         // Set to black
  ellipse(276+X, 155+X, 45, 45);// Head
  fill(255, 255, 0);        // Set to white
  ellipse(288+X, 150+X, 14, 14);// Large eye
  fill(5, 0, 0);            // Set to black
  ellipse(288+X, 150+X, 3, 3);  // Pupil
  fill(153, 92, 0);         // Set to gray
  ellipse(263+X, 148+X, 5, 5);  // Small eye 1
  fill(6, 7, 5);            // Set color
  ellipse(296+X, 130+X, 4, 4);  // Small eye 2
  fill(45, 67, 2);          // Set color
  ellipse(305+X, 162+X, 3, 3);  // Small eye 3
  X=X+1;
}
