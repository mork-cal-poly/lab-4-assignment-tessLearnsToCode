let babyY = 350;
let flightX = 500;
let flightY = 100;
let flightRot = -0.5;
let hatched = false;
let chirp = false;
let flying = true;

function setup() {
  // These lines are fitting our canvas
  // where we want in the DOM
  // so that we can manipulate its style
  // easier
  let myCanvas = createCanvas(400, 400);
  myCanvas.parent("canvas-parent");
}

function draw() {
  background('cadetblue');
  
  //foreground
  drawTree(0, 0, 0);
  drawNest(-80, 20, 1, 0);

  //clipping mask for nest
  beginClip();
    ellipse(width / 2 - 80, height * 4.75 / 7 + 20, 120, 40);
    rect(0,0, width, height*4.75/7 + 20);
    rect(width * 2 / 4, 0, height);
  endClip();

  if (hatched == true) {
    drawBabyBird(75, babyY, 0.5, 0);
    if (babyY > 285) {
      babyY -= 5;
    } else {
      chirp = true;
    }
  }

  if (chirp == true && flying == true) {
    drawBirdFlight(flightX, flightY, 0.45, flightRot);
    if (flightX > 150) {
      flightX -=4;
    }
    if (flightY < 275) {
      flightY +=2;
    } else {
      flying = false;
    }
    if (flightRot < 0) {
      flightRot += 0.008; 
    }
  }
  
  if (flying == false) {
    drawBirdRest(150, 325, 0.35);
  } 

}

function mouseClicked() {
  //hatched = true;
  if (mouseX > 35 && mouseX < 200 && mouseY < 325 && mouseY > 280) {
    hatched = true;
  }
}

function drawBirdRest(x, y, s) {
  
  push();
    translate(x, y);
    scale(s);
  
  //sets common fractions within function I didn't want to type
  const HF = 25 / 2;
  const TH = 25 / 3;

  //sets colors
  let birdBody = color('skyblue');
  let birdWing = color('skyblue');
  let birdBelly = color('white');
  let birdFace = color('gray');
  
  //removes stroke
  noStroke();
  
  //orange body
  fill(birdBelly);
  triangle(-50, -50, -(75 + HF), -100, -75, -150);
  quad(50, -(50 + HF), 50, -25, -50, -50, -75, -150);
  triangle(125 + HF, -50, 50, -25, 50, -(50 + HF));

  //blue body
  fill(birdBody);
  quad(0, -(175 + HF), 25 + HF, -150, -75, -150, -100, -(175 + HF));
  quad(75, -(75 + HF), 50, -(50 + HF), -75, -150, 25 + HF, -150);
  triangle(125 + HF, -50, 50, -(50 + HF), 75, -(75 + HF));

  //blue head
  ellipse(-50, -(175 + HF), 100, 50);

  //darker blue wings
  fill(birdWing);
  quad(25, -125, 75, -25, -(25 + TH), -(75 + HF), -(25 + HF), -(125 + HF));

  // //orange cheek
  // fill(birdBelly);
  // ellipse(-50, -175, 25 + HF, -TH);

  //grey eye, feet, and beak
  fill(birdFace);
  triangle(-75, -(150 + HF), -175, -175, -100, -(175 + HF));
  ellipse(-(50 + TH), -(175 + 2 * TH), 25, HF);
  quad(50, -25, 0 + HF, 0, -HF, 0, 0 + 2 * HF, -(25 + HF));
  arc(0, 0, 50, 25, (3 * PI) / 4, PI / 4);
  
  pop();
}

function drawBirdFlight(x, y, s, rot) {
  
  noStroke();
  
  push();
    translate(x, y);
    rotate(rot);
    scale(s);
  
  // //worm in mouth
  // fill('tan');
  // push();
  //   translate(-75, 10);
  //   rotate(0.3);
  // ellipse(0, 0, 9/2, 27);
  // pop();
  // push();
  //   translate(-68, 10);
  //   rotate(-0.3);
  // ellipse(0, 0, 9/2, 27);
  // pop();
  
  //head of bird, orgin at necks center
  fill('skyblue');
  quad(0, 0, -54, -9, -36, -27, 9, -27);
  fill('white');
  quad(0, 0, -9, 27, -63, 0, -54, -9);
  fill('grey');
  triangle(-54, -9, -63, 0, -81, 0);
  ellipse(-31.5, -13.5 ,9);
  
  //body of bird
  fill('white');
  quad(-9, 27, 9, -27, 108, 63, 81, 81);
  quad(9, -27, 63, -9, 117, 54, 108, 63);
  
  //feet of bird
  fill('grey');
  quad(63, 63, 45, 72, 45, 99, 36, 63);
  quad(72, 63, 63, 81, 72, 108, 54, 72);
  
  //tail
  fill('white');
  quad(117, 54, 189, 108, 144, 117, 108, 63);
  fill('skyblue');
  quad(63, -9, 99, 9, 153, 81, 117, 54);
  
  //wings
  triangle(9, -27, 0, -63, 90, -135);
  fill('white');
  quad(9, -27, 144, -207, 162, -117, 117, 9);
  
  pop();
}

function drawBabyBird(x, y, s, rot) {
  
  push();
    translate(x, y);
    rotate(rot);
    scale(s);
  
  noStroke();
  
  //inner mouth
  fill('maroon');
  triangle(63, 27, 9, 9, 27, 9);
  triangle(45, -9, 36, 27, 36, 18);
  
  //outer mouth
  fill('gold')
  triangle(63, 27, 36, 27, 36, 18);
  triangle(45, -9, 36, 18, 36, 0);
  
  //body
  fill('beige');
  rect(0, 0, 36, 63, 100, 0, 0, 0);
  
  //eye
  fill('grey')
  ellipse(22.5, 13.5, 9);
  
  pop();
}

function drawTree(x, y, rot) {
  
  push();
    translate(x, y);
    rotate(rot);
  
  noStroke();
  
  //tree
  //main branch
  fill('burlywood');
  quad(0, height * 5.5 / 7, width / 2, height * 5.25 / 7, width / 2, height * 6 / 7, 0, height * 6 / 7);
  quad(width / 2, height * 5.25 / 7, width, height * 4.75 / 7, width, height * 5.5 / 7, width / 2, height * 6 / 7);
  
  pop();
}

function drawNest(x, y, s, rot) {

  noStroke();

  push();
    translate(x, y);
    scale(s);
    rotate(rot);

  //nest
  //outer
  fill('#795548')
  ellipse(width / 2, height * 4.75 / 7, 160, 50);
  ellipse(width * 4 / 7, height * 5 / 7, 100, 40);
  ellipse(width * 3 / 7, height * 5 / 7, 100, 40);
  ellipse(width / 2, height * 5 / 7, 150, 60);
  
  //inner
  fill('#462A1F');
  ellipse(width / 2, height * 4.75 / 7, 120, 40);

  pop();
}

