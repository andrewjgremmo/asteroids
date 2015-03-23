(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (objectParams) {
    this.pos = objectParams.pos;
    this.vel = objectParams.vel;
    this.radius = objectParams.radius;
    this.color = objectParams.color;
    this.game = objectParams.game;
  };

  MovingObject.prototype.draw = function(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2*Math.PI
    );

    ctx.fill();
  };

  MovingObject.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    if (this instanceof Asteroids.Asteroid || this instanceof Asteroids.Ship) {
      this.pos = game.wrap(this.pos);
    } else {
      if (this.pos[0] > Asteroids.DIM_X || this.pos[0] < 0 || this.pos[1] < 0 || 
          this.pos[1] > Asteroids.DIM_Y) {
        game.remove(this);
      }
    }
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {

    var dist = Math.sqrt(Math.pow(this.pos[0] - otherObject.pos[0], 2) +
                        Math.pow(this.pos[1] - otherObject.pos[1], 2));
    return (dist < (this.radius + otherObject.radius));
  };

  MovingObject.prototype.collideWith = function (otherObject) {
    // this.game.remove(otherObject);
    // this.game.remove(this);
  };

})();
