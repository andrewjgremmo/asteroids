(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (objectParams) {
    this.pos = objectParams.pos;
    this.vel = objectParams.vel;
    this.radius = objectParams.radius;
    this.game = objectParams.game;
    this.srcX = objectParams.srcX || 0;
    this.srcY = objectParams.srcY || 0;
  };

  MovingObject.prototype.draw = function(ctx){
    ctx.drawImage(
      this.image,
      this.srcX,
      this.srcY,
      this.imageWidth,
      this.imageHeight,
      this.pos[0] - this.radius * 1.25,
      this.pos[1] - this.radius * 1.25,
      this.radius * 2.5,
      this.radius * 2.5
    );
  };

  MovingObject.prototype.move = function (callback) {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    if (this instanceof Asteroids.Asteroid || this instanceof Asteroids.Ship ||
        this instanceof Asteroids.EnemyShip ||
        this instanceof Asteroids.MirrorShip) {
      this.pos = game.wrap(this.pos, this);
    } else {
      if (this.pos[0] > Asteroids.DIM_X || this.pos[0] < 0 || this.pos[1] < 0 || 
          this.pos[1] > Asteroids.DIM_Y) {
        game.remove(this);
      }
    }
    if (callback) {
      callback();
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
