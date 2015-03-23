(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (objectParams) {
    Asteroids.MovingObject.call(this, objectParams);
    this.image = new Image();
    this.image.src = "images/ship.png";
    this.imageWidth = 100;
    this.imageHeight = 100;
  };

  Ship.RADIUS = 15;
  Ship.COLOR = "#ff0000";

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomShipPosition();
    this.vel = [0,0];
  };

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.fireBullet = function () {
    var ship = this;
    game.bullets.push(new Asteroids.Bullet({
      pos: this.pos.slice(0),
      vel: this.vel.slice(0),
      color: "#ff0000",
      radius: 5,
      game: this.game
    }));
  };

})();
