import processing.core.*; 
import processing.xml.*; 

import java.applet.*; 
import java.awt.Dimension; 
import java.awt.Frame; 
import java.awt.event.MouseEvent; 
import java.awt.event.KeyEvent; 
import java.awt.event.FocusEvent; 
import java.awt.Image; 
import java.io.*; 
import java.net.*; 
import java.text.*; 
import java.util.*; 
import java.util.zip.*; 
import java.util.regex.*; 

public class Dexter extends PApplet {

// Jason Bao and Alisa Prusa
 int dir=0;
 int x=0;
 
 public void setup() {
   size(400, 500);
   smooth();
 }
 
 public void draw() {
   background(233, 0, 9); //Color Red
   fill(0, 0, 0, 70); // Make Transparent Black
   noStroke();
   ellipse(200, 450, 300, 60);
   stroke(0);
   strokeWeight(4);
   // Dexter's Feet
   fill(0); // Color Black
   beginShape(); // Shoes
   vertex(85+dir, 450+x); // Foot Toe Left 1
   vertex(120+dir, 402+x); // Go UP 2
   vertex(145+dir, 360+x); // Continue around 3
   vertex(270+dir, 365+x); // 4
   vertex(290+dir, 412+x); // 5
   vertex(320+dir, 460+x); // Foot Toe Right 6
   vertex(240+dir, 435+x); // 7
   vertex(227+dir, 415+x); // 8
   vertex(220+dir, 430+x); // 9
   vertex(180+dir, 430+x); // 10
   vertex(180+dir, 400+x); // 11
   vertex(170+dir, 435+x); // Left Heel 12
   vertex(85+dir, 450+x); // Foot Toe Left 13
   endShape();
   
   // Dexter's Torso
   fill(255); //Change to White
   beginShape(); // Torso
   vertex(105+dir, 360+x); // Shirt Point Left 1
   vertex(115+dir, 321+x); // GO UP 2
   vertex(120+dir, 300+x); // Continue around 3
   vertex(125+dir, 275+x); // 4
   vertex(90+dir, 260+x); // 5
   vertex(80+dir, 240+x); // 6
   vertex(110+dir, 230+x); // 7
   vertex(137+dir, 260+x); // 8
   vertex(160+dir, 290+x); // 9
   vertex(315+dir, 237+x); // 10
   vertex(377+dir, 275+x); // 11
   vertex(355+dir, 275+x); // 12
   vertex(340+dir, 300+x); // 13
   vertex(310+dir, 327+x); // 14
   vertex(310+dir, 370+x); // Right Shirt Point 15
   vertex(105+dir, 360+x); // Shirt Point Left 16
   endShape();
 
 //Dexter's Head
 fill(237, 195, 139); // Change to Pink
 beginShape(); // Head
 vertex(160+dir, 290+x); // Chin 1
 vertex(315+dir, 237+x); // Go Right 2
 vertex(340+dir, 105+x); // Continue Up and Around 3
 vertex(290+dir, 55+x); // 4
 vertex(257+dir, 37+x); // 5
 vertex(210+dir, 20+x); // 6
 vertex(170+dir, 16+x); // 7
 vertex(145+dir, 25+x); // 8
 vertex(125+dir, 36+x); // 9
 vertex(146+dir, 75+x); // 10
 vertex(90+dir, 200+x); // Cheek Left 11
 vertex(117+dir, 240+x); // 12
 vertex(160+dir, 290+x); // Chin 13
 endShape();
 
 //Dexter's Glove Left
 fill(124, 51, 222); // Change to Purple
 beginShape(); //Left Glove
 vertex(125+dir, 250+x); // Glove Top 1
 vertex(135+dir, 260+x); // 2
 vertex(125+dir, 275+x); // 3
 vertex(130+dir, 300+x); // 4
 vertex(115+dir, 321+x); // 5
 vertex(105+dir, 320+x); // 6
 vertex(87+dir, 310+x); // 7
 vertex(85+dir, 298+x); // 8
 vertex(100+dir, 277+x); // 9
 vertex(82+dir, 260+x); // 10
 vertex(125+dir, 250+x); // Glove Top 11
 endShape();
 
  // OverLap Glove Set
 beginShape(); // Left Top Glove
 vertex(125+dir, 275+x); // 1
 vertex(130+dir, 300+x); // 2
 vertex(115+dir, 321+x); // 3
 vertex(105+dir, 320+x); // 4
 vertex(87+dir, 310+x); // 5
 vertex(85+dir, 298+x); // 6
 vertex(100+dir, 277+x); // 7
 vertex(105+dir, 275+x); // 8
 vertex(125+dir, 275+x); // 9
 endShape();
 
 //Dexter's Glove Right
 beginShape(); // Right Glove
 vertex(330+dir, 255+x); // Top of Glove 1
 vertex(363+dir, 283+x); // 2
 vertex(340+dir, 300+x); // 3
 vertex(345+dir, 305+x); // 4
 vertex(340+dir, 310+x); // 5
 vertex(342+dir, 325+x); // 6
 vertex(330+dir, 342+x); // 7
 vertex(310+dir, 340+x); // 8
 vertex(283+dir, 325+x); // 9
 vertex(274+dir, 307+x); // 10
 vertex(300+dir, 275+x); // 11
 vertex(330+dir, 255+x); // Top of Glove 12
 endShape();
 
 //Dexter's Hair
 fill(232, 159, 40); // Change to Orange
 beginShape(); // Hair
 vertex(340+dir, 105+x); // Right point of Hair 1
 vertex(290+dir, 55+x); // 2
 vertex(257+dir, 37+x); // 3
 vertex(210+dir, 20+x); // 4
 vertex(170+dir, 16+x); // 5
 vertex(145+dir, 25+x); // 6
 vertex(125+dir, 36+x); // 7
 vertex(146+dir, 75+x); // 8
 vertex(170+dir, 83+x); // 9
 vertex(198+dir, 76+x); // 10
 vertex(215+dir, 95+x); // 11
 vertex(250+dir, 90+x); // 12
 vertex(280+dir, 110+x); // 13
 vertex(340+dir, 105+x); // Right point of Hair 14
 endShape();
 
 //Dexter's Glasses
 strokeWeight(6);
 fill(86, 225, 242); // Change to Black
 beginShape(); // Glasses
 vertex(305+dir, 150+x); // Top Right 1
 vertex(75+dir, 125+x); // 2
 vertex(70+dir, 130+x); // 3
 vertex(90+dir, 175+x); // 4
 vertex(125+dir, 186+x); // 5
 vertex(165+dir, 185+x); // 6
 vertex(183+dir, 160+x); // 7
 vertex(190+dir, 175+x); // 8
 vertex(220+dir, 200+x); // 9
 vertex(260+dir, 198+x); // 10
 vertex(300+dir, 175+x); // 11
 vertex(305+dir, 150+x); // Top Right 12
 vertex(345+dir, 150+x);
 endShape();
 line(190+dir, 140+x, 185+dir, 160+x); // Glasses Bridge
 
 //Dexter's Ear
 strokeWeight(4);
 fill(237, 195, 139); // Change to Pink
 beginShape(); // Right Ear
 vertex(330+dir, 155+x); // Left Top 1
 vertex(325+dir, 187+x); // 2
 vertex(340+dir, 190+x); // 3
 vertex(360+dir, 180+x); // 4
 vertex(363+dir, 150+x); // 5
 vertex(350+dir, 145+x); // 6
 vertex(330+dir, 155+x); // Left Top 7
 endShape();
 
 //Dexter's Eyes
 fill(0); // Change to Black
 arc(265+dir, 148+x, 60, 45, 0, radians(190));
 arc(163+dir, 137+x, 50, 45, 0, radians(190));
 
 //Dexter's Face
 fill(237, 195, 139); // Change to Pink
 beginShape(); //Face
 vertex(184+dir, 161+x); // Top Nose Bridge 1
 vertex(150+dir, 154+x); // 2
 vertex(175+dir, 180+x); // 3
 vertex(160+dir, 205+x); // 4
 vertex(210+dir, 190+x); // 5
 vertex(220+dir, 200+x); // 6
 vertex(185+dir, 210+x); // 7
 vertex(165+dir, 230+x); // 8
 vertex(170+dir, 235+x); // Mouth End 9
 endShape();
 
 //Dexter's Teeth
 fill(255);
 beginShape(); //Tooth Section
 vertex(177+dir, 200+x); // Line 1 Top 1
 vertex(207+dir, 190+x); // 2
 vertex(220+dir, 200+x); // 3
 vertex(180+dir, 215+x); // 4
 vertex(175+dir, 200+x); // Line 1 Top 5
 endShape();
 line(195+dir, 195+x, 200+dir, 205+x); // Teeth line 
 
 //Addons
 fill(0); //Change to Black
 line(340+dir, 105+x, 370+dir, 95+x); // Hair Strand 1
 line(340+dir, 105+x, 375+dir, 110+x); // Hair Strand 1
 line(260+dir, 257+x, 255+dir, 365+x); // Shirt Open
 ellipse(245+dir, 295+x, 10, 20); // Button 1
 ellipse(243+dir, 335+x, 10, 20); // Button 2
 beginShape(); // Glove Crease
 vertex(100+dir, 300+x); // Left Point 1
 vertex(115+dir, 295+x); // 2
 vertex(114+dir, 292+x); // 3
 vertex(125+dir, 290+x); // 4
 vertex(125+dir, 292+x); // 5
 vertex(100+dir, 300+x); // Left Point 1
 endShape();
 dir=mouseX;
 x=mouseY;
 //   if (dir < mouseX) {
 //   dir = 1+mouseX;
 // }
 // else if(dir > mouseX) {
 //   dir = -1+mouseX;
 // }
 // else {
  //  dir = 0+mouseX;
 // }
 }
  static public void main(String args[]) {
    PApplet.main(new String[] { "--present", "--bgcolor=#666666", "--stop-color=#cccccc", "Dexter" });
  }
}
