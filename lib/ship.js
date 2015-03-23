(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (objectParams) {
    Asteroids.MovingObject.call(this, objectParams);
    this.shipImage = new Image();
    this.shipImage.src = "images/ship.png";
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

  Ship.prototype.draw = function(ctx){
    ctx.drawImage(
      this.shipImage,
      0,
      0,
      100,
      100,
      this.pos[0] - this.radius * 1.25,
      this.pos[1] - this.radius * 1.25,
      this.radius * 2.5,
      this.radius * 2.5
    );
  };

})();
