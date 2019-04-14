float a;
float b;
float c;
float randomColor = 0;

void setup() {
  size(600, 600);
  noStroke();
}

void draw() {
  fill(255, 30);
  rect(0, 0, 600, 600); 
  colorMode(HSB);

  if (mousePressed) {
    a = random(-20, 20);
    b = random(-20, 20);
    c = random(-20, 20);
    randomColor++;
  } else {
    a = 0;
    b = 0;
    c = 0;
  }
  
  if (randomColor == 255 ) {
    randomColor = 0;
  }


  fill(randomColor,map(randomColor,0,255,255,0),255,30);
  triangle(300+a, 100+a, 100+b, 500+b, 500+c, 500+c);
}
