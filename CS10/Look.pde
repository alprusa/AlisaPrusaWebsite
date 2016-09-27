int look=0; // Position of Eyes

void setup() {
  size(200, 200);
  noStroke();
}

// Create Blinky's Body
void draw() {
  background(0); // Color Set to Black
  fill(255, 0, 0);        // Color Set to Red
  rect(50, 70, 10, 90);   // End Left Bar
  rect(60, 40, 10, 130);  // Second Left Bar
  rect(70, 30, 10, 140);  // Third Left Bar
  rect(80, 20, 10, 140);  // Fourth Left Bar
  rect(90, 20, 10, 130);  // Fifth Left Bar
  rect(100, 10, 10, 150); // End Left Center Bar
  rect(110, 10, 10, 160); // Middle Left Center Bar
  rect(120, 10, 10, 160); // Middle Right Center Bar
  rect(130, 10, 10, 150); // End Right Center Bar
  rect(140, 20, 10, 130); // Fifth Right Bar
  rect(150, 20, 10, 140); // Fourth Right Bar
  rect(160, 30, 10, 140); // Third Right Bar
  rect(170, 40, 10, 130); // Second Right Bar
  rect(180, 70, 10, 90);  // End Right Bar 
  // Create Blinky's Eyes
  fill(255);                          // Color Changed to White
  rect(60+look*10, 50, 10, 30);   // Left Eye End Left Bar
  rect(70+look*10, 40, 10, 50);   // Left Eye Middle Left Bar
  rect(80+look*10, 40, 10, 50);   // Left Eye Middle Right Bar
  rect(90+look*10, 50, 10, 30);   // Left Eye End Right Bar
  rect(120+look*10, 50, 10, 30);  // Right Eye End Left Bar
  rect(130+look*10, 40, 10, 50);  // Right Eye Middle Left Bar
  rect(140+look*10, 40, 10, 50);  // Right Eye Middle Right Bar
  rect(150+look*10, 50, 10, 30);  // Right Eye End Right Bar
  fill(0, 0, 255);                    // Color Change to Blue
  rect(60+look*20, 60, 10, 20);   // Left Iris Left Bar
  rect(70+look*20, 60, 10, 20);   // Left Iris Right Bar
  rect(120+look*20, 60, 10, 20);  // Right Iris Left Bar
  rect(130+look*20, 60, 10, 20);  // Right Iris Right Bar
}
