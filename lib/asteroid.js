(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
    COLOR = "#000";
    RADIUS = 10;

  var Asteroid = Asteroids.Asteroid = function(pos){
    Asteroids.MovingObject.call(this, {pos: pos, vel: ####, color: COLOR, radius: RADIUS});
  }

  Asteroids.Util.inherits(this, Asteroids.MovingObject);



})();
