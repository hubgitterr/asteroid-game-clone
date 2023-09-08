class BulletSystem {

  constructor(){ //constructor function to initialize the object with default values (if no arguments are given) or with user defined values (if arguments are given)
    this.bullets = []; //array to store all bullets
    this.velocity = new createVector(0, -5); //velocity of the bullets
    this.diam = 10; //diameter of the bullets
  }

  run(){
      this.move(); //update the location of all bullets
      this.draw(); //draw all bullets
      this.edges();  //check if bullets leave the screen and remove them from the array
  }

  fire(x, y){ //function to add a new bullet to the array of bullets at the given location
    this.bullets.push(createVector(x,y));
  }

  //draws all bullets
  draw(){
    fill(255);
    for (var i=0; i<this.bullets.length; i++){ //loop through all bullets in the array and draw them
      ellipse(this.bullets[i].x, this.bullets[i].y, this.diam, this.diam); //draw the bullet at the location stored in the array
    }
  }

  //updates the location of all bullets
  move(){
    for (var i=0; i<this.bullets.length; i++){ //loop through all bullets in the array and update their location by adding the velocity to the location
      this.bullets[i].y += this.velocity.y;
    }
  }

  //check if bullets leave the screen and remove them from the array
  edges(){
      // YOUR CODE HERE (3 lines approx)
      for (var i = this.bullets.length - 1; i >= 0; i--) { //loop through all bullets in the array and check if they leave the screen (y < 0)
        if (this.bullets[i].y < 0) { //if the bullet leaves the screen, remove it from the array (use splice) 
          this.bullets.splice(i, 1); //remove the bullet from the array 
        }
      }
  }
}
