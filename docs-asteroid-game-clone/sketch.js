/**
 * * Commentary:
 * 
 * The task was to create a space-themed game using JavaScript and p5.js library. I had to implement various functionalities for the game, including spaceship movement, shooting bullets, destroying asteroids, avoiding collisions, and handling gravity and friction effects.

I completed the edges() function in bulletSystem.js to remove bullets that left the screen. In spaceship.js, I updated the interaction() and move() functions to control the spaceship's movement based on user input and limit its velocity using maxVelocity. I also simulated friction to prevent the spaceship from moving indefinitely in empty space.

In sketch.js, I implemented the isInside() function to detect collisions between objects, such as the spaceship and asteroids, and created the checkCollisions() function to handle various collision scenarios, such as spaceship-asteroid, asteroid-Earth, spaceship-Earth, and spaceship-atmosphere collisions.

As extra features, I added jet thrusters that appeared in red color when the spaceship moved, giving it a more realistic appearance. Additionally, I created a counter in the top-left corner to keep score of the asteroids I hit with the spaceship's bullets.

Overall, I successfully completed the task, and my additional features enhanced the game's visuals and playability, making it more enjoyable for players. I focused on managing object interactions, collision detection, and implementing gravity and score tracking, showcasing my abilities as a software developer.
 * 
 */





var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];

//////////////////////////////////////////////////
function setup() {
  createCanvas(1200,800);
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();

  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width/2, height*2.9);
  atmosphereSize = new createVector(width*3, width*3);
  earthLoc = new createVector(width/2, height*3.1);
  earthSize = new createVector(width*3, width*3);
}

//////////////////////////////////////////////////
function draw() {
  background(0);
  sky();

  spaceship.run(); // run the spaceship
  asteroids.run(); // run the asteroids

  drawEarth();

  checkCollisions(spaceship, asteroids); // function that checks collision between various elements

  // Display score
  fill(255);
  textSize(24);
  text("Score: " + spaceship.score, 20, 40);
  
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth(){
  noStroke();
  //draw atmosphere
  fill(0,0,255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
  //draw earth
  fill(100,255);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids){

  //spaceship-2-asteroid collisions
  
    for (var i = 0; i < asteroids.locations.length; i++) {
      var asteroidLoc = asteroids.locations[i];
      var asteroidDiam = asteroids.diams[i];

      if (isInside(spaceship.location, spaceship.size, asteroidLoc, asteroidDiam)) {
        console.log("collision spaceship and asteroid");
        gameOver();
        break;
      }
    }
  
    // for (var i = 0; i < asteroids.locations.length; i++) {
    //   var asteroidLoc = asteroids.locations[i];
    //   var asteroidDiam = asteroids.diams[i];
  
    //   var distance = p5.Vector.dist(spaceship.location, asteroidLoc);
    //   var minDistance = spaceship.size / 2 + asteroidDiam / 2;
  
    //   if (distance < minDistance) {
    //     gameOver();
    //     break;
    //   }
    // }

  //asteroid-2-earth collisions

  for (var i = 0; i < asteroids.locations.length; i++) {
    var asteroidLoc = asteroids.locations[i];
    var asteroidDiam = asteroids.diams[i];

    console.log("Asteroid almost collided with earth");
    if (isInside(asteroidLoc, asteroidDiam, earthLoc, earthSize.x)) {
      console.log("Asteroid collided with earth");
      gameOver();
      return; // Return early if asteroid-2-earth collision occurs
    }
  }

  // for (var i = 0; i < asteroids.length; i++) {
  //   if (isInside(asteroids.locations[i], asteroids.diams[i], earthLoc, earthSize)) {
  //     console.log("Asteroid collided with earth");
  //     gameOver();
  //     return;
  //   }
  // }
  

  //spaceship-2-earth
  
  if (isInside(spaceship.location, spaceship.size, earthLoc, earthSize.x)) {
    console.log("Spaceship collided with earth");
    gameOver();
    return; // Return early if spaceship-2-earth collision occurs
  }

  //spaceship-2-atmosphere

  if (isInside(spaceship.location, spaceship.size, atmosphereLoc, atmosphereSize.x)) {
    console.log("Spaceship collided with atmosphere");
    spaceship.setNearEarth();
    return; // Return early if spaceship-2-atmosphere collision occurs
  }
  

  //bullet collisions

  for (var i = 0; i < asteroids.locations.length; i++) {
    var asteroidLoc = asteroids.locations[i];
    var asteroidDiam = asteroids.diams[i];
  
    for (var j = 0; j < spaceship.bulletSys.bullets.length; j++) {
      var bullet = spaceship.bulletSys.bullets[j];
      var bulletLoc = createVector(bullet.x, bullet.y);
  
      if (isInside(bulletLoc, spaceship.bulletSys.diam, asteroidLoc, asteroidDiam)) {
        asteroids.destroy(i);
        spaceship.bulletSys.bullets.splice(j, 1);
        spaceship.score++;
        break;
      }
    }
  }

}

function isInside(locA, sizeA, locB, sizeB){ // locA and locB are vectors, sizeA and sizeB are diameters
  var distance = p5.Vector.dist(locA, locB);
  var radiusA = sizeA / 2;
  var radiusB = sizeB / 2;

  if (distance < (radiusA + radiusB)) {
    return true; // Circles overlap
  } else {
    return false; // Circles do not overlap
  }
  
}

//////////////////////////////////////////////////
function keyPressed(){ // if left or right arrow is pressed, move the spaceship
  if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
    spaceship.fire();
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
  console.log("Game over!");
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width/2, height/2)
  noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky(){
  push();
  while (starLocs.length<300){
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i=0; i<starLocs.length; i++){
    rect(starLocs[i].x, starLocs[i].y,2,2);
  }

  if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
  pop();
}
