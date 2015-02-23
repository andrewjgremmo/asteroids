(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var DIM_X = 800;
  var DIM_Y = 600;
  var NUM_ASTEROIDS = 10;

  var Game =  Asteroids.Game = function(){
    this.asteroids = []
    this.addAsteroids(NUM_ASTEROIDS);
  };

  Game.prototype.randomPosition = function(){
    x = Math.floor(DIM_X*Math.random());
    y = Math.floor(DIM_Y*Math.random());
    return [x,y];
  }

  Game.prototype.addAsteroids = function(number){
    for (var i = 0; i < number; i++){
      var pos = this.randomPosition();
      var ast = new Asteroids.Asteroid({pos: pos, game: this});
      this.asteroids.push(ast);
    };
  };

  Game.prototype.draw = function(ctx){
    ctx.clearRect(0, 0, DIM_X, DIM_Y);
    this.asteroids.forEach (function(asteroid) {
      asteroid.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.asteroids.forEach (function(asteroid) {
      asteroid.move();
    });
  };

  Game.prototype.wrap = function (pos) {
    var new_pos = pos.slice();
    if (pos[0] > DIM_X) {
      new_pos[0] -= DIM_X;
    } else if (pos[0] < 0) {
      new_pos[0] += DIM_X;
    } else if (pos[1] < 0) {
      new_pos[1] += DIM_Y;
    } else if (pos[1] > DIM_Y) {
      new_pos[1] -= DIM_Y;
    }
    
    return new_pos;
  }

})();
