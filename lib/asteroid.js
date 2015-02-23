(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var utils = new Asteroids.Util();

  var Asteroid = Asteroids.Asteroid = function(objectParams){
    Asteroids.MovingObject.call(this,
      {pos: objectParams.pos,
       vel: utils.randomVec(10),
       color: Asteroid.COLOR,
       radius: Asteroid.RADIUS,
       game: objectParams.game});
  };
  Asteroid.COLOR = "#000";
  Asteroid.RADIUS = 10;


  utils.inherits(Asteroid, Asteroids.MovingObject);



})();
