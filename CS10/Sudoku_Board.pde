boolean isWhite = true; // Set True
int cell_x;
int cell_y;
int x = 0;
int y = 0;
int s = 50;

void setup() {
  size(450, 450);
  background(255);
  cellarray(0, 0, 50, color(150)); // Build Cells as Grey
  cellarray(0, 0, 50, color(255)); // Build Cells as White
  board(0, 0, 50, color(0)); // Create Black Bars
 
}

void draw() {
  // Draw Red Ellipse
  if (mousePressed) {
    fill(255,0,0); // Color Red
    ellipse(x+s*cell_x+s/2, y+s*cell_y+s/2, s/4, s/4); // Make Ellipse
  }
}

// Single Rectangle
void cell(int x, int y, int s, color tinto) {
  fill(tinto);
  rect(x, y, s, s);
}

// Three Regtangles in a Across
void triple(int x, int y, int s, color tinto) {
  for (int i = 0; i < 3; i++) { // Three Across X
    cell(x+i*s, y, s, tinto);
  }
}

// Nine Rectangles in Set
void block(int x, int y, int s, color tinto) {
  for (int j = 0; j < 3; j++) { // Three Triples
    if (isWhite == false) { // Set Boolean to False
      tinto = color(255); // Tinto id White
    }
    else {
      tinto = color(150); // Tinto is Grey
    }
    triple(x, y+j*s, s, tinto);
  }
  isWhite = !isWhite; // Set Boolean to True
}

// Create Three sets of Blocks
void row(int x, int y, int s, color tinto) {
  for (int k = 0; k < 3; k++) { // Horizontal Block Set
    block(x+k*s*3, y, s, tinto);
  }
}

// 81 Rectangles
void cellarray(int x, int y, int s, color tinto) {
  for (int l = 0; l < 3; l++) { // Three Rows Vertical
    row(x, y+l*s*3, s, tinto);
  }
}

// Create Parimeter
void board(int x, int y, int s, color tinto) {
  isWhite = isWhite; // Boolean is True
  strokeWeight(6); // Stroke is 6
  line(x+3*s, y, x+3*s, y+9*s); // Line 1 Vertical
  line(x+6*s, y, x+6*s, y+9*s); // Line 2 Vertical
  line(x, y+3*s, x+9*s, y+3*s); // Line 1 Horizontal
  line(x, y+6*s, x+9*s, y+6*s); // Line 2 Horizontal
  strokeWeight(1); // Stroke is 1
}

// Set mousePressed Option
void mousePressed() {
  cell_x = mouseX/50;
  cell_y = mouseY/50;
}
