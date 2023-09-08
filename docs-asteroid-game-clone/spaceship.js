class Spaceship {

  constructor(){ // Initialize spaceship properties in the constructor
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width/2, height/2);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 5;
    this.bulletSys = new BulletSystem();
    this.size = 50;
    this.score = 0; // Initialize score to 0
    
  }

  run(){ // Run the functions below in the draw loop
    this.bulletSys.run();
    this.draw();
    this.move();
    this.edges();
    this.interaction();
  }

  draw(){ // Draw the spaceship on the canvas using p5 functions
    fill(125);
    triangle(this.location.x - this.size/2, this.location.y + this.size/2,
        this.location.x + this.size/2, this.location.y + this.size/2,
        this.location.x, this.location.y - this.size/2);
        
    // Jet thrusters
  if (this.velocity.x < 0) {
    // Left thruster
    fill(255, 0, 0); // Red color
    triangle(
      this.location.x + this.size / 2,
      this.location.y + this.size / 2,
      this.location.x + this.size / 2,
      this.location.y + this.size / 2 - 20,
      this.location.x + this.size / 2 + 10,
      this.location.y + this.size / 2 - 10
    );
  } else if (this.velocity.x > 0) {
    // Right thruster
    fill(255, 0, 0); // Red color
    triangle(
      this.location.x - this.size / 2,
      this.location.y + this.size / 2,
      this.location.x - this.size / 2,
      this.location.y + this.size / 2 - 20,
      this.location.x - this.size / 2 - 10,
      this.location.y + this.size / 2 - 10
    );
  }

  // Main body
  fill(125);
  triangle(
    this.location.x - this.size / 2,
    this.location.y + this.size / 2,
    this.location.x + this.size / 2,
    this.location.y + this.size / 2,
    this.location.x,
    this.location.y - this.size / 2
  );


  }

  move(){ // Move the spaceship by adding the velocity to the location (use the add function)
      // YOUR CODE HERE (4 lines)
      this.velocity.add(this.acceleration); //add acceleration to velocity (use the add function) 
      this.velocity.limit(this.maxVelocity); //limit the velocity to the maximum velocity (use the limit function) 
      this.location.add(this.velocity); //add velocity to location (use the add function) 
      this.acceleration.mult(0); //reset acceleration to 0 (use the mult function)
  }

  applyForce(f){ // Apply a force to the spaceship (use the add function) 
    this.acceleration.add(f);
  }

  interaction(){ // Check if the arrow keys are pressed and apply a force to the spaceship accordingly (use the applyForce function)
      if (keyIsDown(LEFT_ARROW)){ //if the left arrow is pressed, apply a force to the left (use the applyForce function)
        this.applyForce(createVector(-0.1, 0));
      }
      if (keyIsDown(RIGHT_ARROW)){ //if the right arrow is pressed, apply a force to the right (use the applyForce function)
      // YOUR CODE HERE (1 line)
        this.applyForce(createVector(0.1, 0));
      }
      if (keyIsDown(UP_ARROW)){ //if the up arrow is pressed, apply a force upwards (use the applyForce function)
      // YOUR CODE HERE (1 line)
        this.applyForce(createVector(0, -0.1));
      }
      if (keyIsDown(DOWN_ARROW)){ //if the down arrow is pressed, apply a force downwards (use the applyForce function)
      // YOUR CODE HERE (1 line)
        this.applyForce(createVector(0, 0.1));
      }
  }

  fire(){  // Fire a bullet from the spaceship (use the fire function in the BulletSystem class)
    this.bulletSys.fire(this.location.x, this.location.y);
  }

  edges(){ // Make the spaceship appear on the other side of the canvas when it reaches the edge
    if (this.location.x<0) this.location.x=width;
    else if (this.location.x>width) this.location.x = 0;
    else if (this.location.y<0) this.location.y = height;
    else if (this.location.y>height) this.location.y = 0;
  }

  setNearEarth(){ // Set the spaceship's color to red when it's near the earth (use the dist function) 
    //YOUR CODE HERE (6 lines approx)
  var gravity = createVector(0, 0.05); // Create a downwards-pointing gravity vector of strength 0.05
  this.applyForce(gravity); // Apply the gravity force to the spaceship

  var friction = this.velocity.copy(); // Create a friction force that's 30 times smaller than the velocity of the spaceship
  friction.mult(-0.03);
  this.applyForce(friction); // Apply the friction force to the spaceship
  }
  
}
