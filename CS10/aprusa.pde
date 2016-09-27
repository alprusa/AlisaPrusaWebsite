int look=0; // Position of Eyes
int dir=0; // Position of Blinky
color blinkycolor =  color(255, 0, 0); // Color of Blinky

void setup() {
  size(400, 200);
  noStroke();
}

// Create Blinky's Body
void draw() {
  background(0); // Color Set to Black
  fill(blinkycolor);        // Color Set to Red
  rect(50+dir, 70, 10, 90);   // End Left Bar
  rect(60+dir, 40, 10, 130);  // Second Left Bar
  rect(70+dir, 30, 10, 140);  // Third Left Bar
  rect(80+dir, 20, 10, 140);  // Fourth Left Bar
  rect(90+dir, 20, 10, 130);  // Fifth Left Bar
  rect(100+dir, 10, 10, 150); // End Left Center Bar
  rect(110+dir, 10, 10, 160); // Middle Left Center Bar
  rect(120+dir, 10, 10, 160); // Middle Right Center Bar
  rect(130+dir, 10, 10, 150); // End Right Center Bar
  rect(140+dir, 20, 10, 130); // Fifth Right Bar
  rect(150+dir, 20, 10, 140); // Fourth Right Bar
  rect(160+dir, 30, 10, 140); // Third Right Bar
  rect(170+dir, 40, 10, 130); // Second Right Bar
  rect(180+dir, 70, 10, 90);  // End Right Bar 
  // Create Blinky's Eyes
  fill(255);                          // Color Changed to White
  rect(60+dir+look*10, 50, 10, 30);   // Left Eye End Left Bar
  rect(70+dir+look*10, 40, 10, 50);   // Left Eye Middle Left Bar
  rect(80+dir+look*10, 40, 10, 50);   // Left Eye Middle Right Bar
  rect(90+dir+look*10, 50, 10, 30);   // Left Eye End Right Bar
  rect(120+dir+look*10, 50, 10, 30);  // Right Eye End Left Bar
  rect(130+dir+look*10, 40, 10, 50);  // Right Eye Middle Left Bar
  rect(140+dir+look*10, 40, 10, 50);  // Right Eye Middle Right Bar
  rect(150+dir+look*10, 50, 10, 30);  // Right Eye End Right Bar
  fill(0, 0, 255);                    // Color Change to Blue
  rect(60+dir+look*20, 60, 10, 20);   // Left Iris Left Bar
  rect(70+dir+look*20, 60, 10, 20);   // Left Iris Right Bar
  rect(120+dir+look*20, 60, 10, 20);  // Right Iris Left Bar
  rect(130+dir+look*20, 60, 10, 20);  // Right Iris Right Bar
  // Move Blinky's Position and Direction
  dir=120+look;  // Blinky's Body and Eye Positions
    if (dir < mouseX) {
    dir = 1+mouseX;
    look = 2;
  }
  else if(dir > mouseX) {
    dir = -1+mouseX;
    look = 0;
  }
  else {
    dir = 0+mouseX;
    look = 1;
  }
}

// Change Blinky's Color by Click
 void mousePressed() {
   if (blinkycolor == color(255, 0, 0)) {
     blinkycolor = color(255, 255, 0); // Color to Yellow
   }
   else {
     blinkycolor = color(255, 0, 0); // Color to Red
   }
  }
