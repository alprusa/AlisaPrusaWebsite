// Jason Bao and Alisa Prusa
int i = 0;
int x =0;
int y = 200;
float angle = 0;
int n = 0;

void setup(){
  size(400,400);
  strokeWeight(4);
  background(0);
  frameRate(60);
}

void draw(){
  translate(200, 200);
  rotate(angle);
  println(frameCount);
  if (frameCount <= 199){
    background(0);
    fill(6, 105, 124);
    stroke(13, 142, 44);
    ellipse(0, 0, 250, 250);
    noFill();
    beginShape();
    vertex(125, 0);
    bezierVertex(250, 40, -250, 40, -125, 0);
    endShape();
  }
  if (frameCount == 200){
    background(0);
  }
  if (frameCount >= 201){
  frameRate(200);
  noStroke();
  fill(random(255), 0, 0);
  scale(random(20), random(20));
  shards();
  }
  else if (frameCount >= 250){
    scale((n/100)%10);
  }
  angle = angle + .01;
  n = 0;
}

void shards(){
  beginShape();
  vertex(0, 0);
  vertex(1, -1);
  vertex(2, 0);
  vertex(1, 1);
  vertex(4, 2);
  vertex(3, 5);
  vertex(2, 3);
  vertex(2, 4);
  vertex(1, 3);
  vertex(2, 1);
  vertex(0, 0);
  endShape();
}
