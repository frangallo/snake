(function () {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var SnakeView = SnakeGame.SnakeView = function ($el) {
    this.board = new SnakeGame.Board(15);
    console.log(this.board.snake);
    this.$el = $el;
    this.bindEvents();
    this.setupBoard();
    this.render();
    this.run();
  }

  SnakeView.prototype.run = function () {
    var that = this;
    if (this.board.snake.segments.length > 0) {
      setInterval(function (){
        that.board.snake.move();
        that.render();
      }, 300);
    } else {
      alert("You lose!");
    }
  };

  SnakeView.prototype.bindEvents = function () {
    var that = this;
    this.$el.on("keydown", function(event) {
      console.log(event)
      that.handleKeyEvent(event.keyCode);
    });
  };

  SnakeView.prototype.handleKeyEvent = function (key) {
    console.log(key)
    switch (key) {
      case 38:
        this.board.snake.turn("N");
        break;
      case 37:
        this.board.snake.turn("W");
        break;
      case 40:
        this.board.snake.turn("S");
        break;
      case 39:
        this.board.snake.turn("E");
        break;
    }
  };

  SnakeView.prototype.setupBoard = function () {
    for (var i = 0; i < this.board.size; i++) {
      this.$el.append($("<div></div>").addClass("row").attr("data-row-number", i));
    }
  };

  SnakeView.prototype.render = function () {
    $(".snake").remove();
    $(".tile").remove();
    $(".apple").remove();
    $("br").remove();

    this.board.createApples(4);

    for (var i = 0; i < this.board.size; i++){
      var $row = $($(".row")[i])
      for (var j = 0; j < this.board.size; j++) {
        if (this.board.snake.isInSnake(i, j)) {
          $row.append($("<div></div>").addClass("snake"));
        } else if (this.board.isApple(i, j)) {
          $row.append($("<div></div>").addClass("apple"));
        } else {
          $row.append($("<div></div>").addClass("tile"));
        }
      }
      $row.append($("<br></br>"));
    }
  };

})();
