// Generated by CoffeeScript 1.9.3
var Cell,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Cell = (function() {
  function Cell(col1, row1, size, two, board) {
    this.col = col1;
    this.row = row1;
    this.size = size;
    this.two = two;
    this.board = board;
    this.shiftTo = bind(this.shiftTo, this);
    this.getX = bind(this.getX, this);
    this.setBorder = bind(this.setBorder, this);
    this.setColor = bind(this.setColor, this);
    this.isDeleted = false;
    this.rect = this.two.makeRectangle(this.getX(), this.getY(), this.size, this.size);
    this.two.update();
  }

  Cell.prototype.setColor = function(c) {
    this.color = c;
    this.rect.fill = c;
    return this.two.update();
  };

  Cell.prototype.setBorder = function(c) {
    this.rect.stroke = c;
    this.rect.linewidth = 6;
    return this.two.update();
  };

  Cell.prototype.hide = function() {
    return this.rect.opacity = 0;
  };

  Cell.prototype.getX = function(col) {
    if (col == null) {
      col = this.col;
    }
    return this.board.x - (this.board.size + this.size) / 2 + (col + 1) * this.board.change;
  };

  Cell.prototype.getY = function(row) {
    if (row == null) {
      row = this.row;
    }
    return this.board.y - (this.board.size + this.size) / 2 + (row + 1) * this.board.change;
  };

  Cell.prototype.shiftTo = function(row, col) {
    var end, start;
    end = new Two.Vector(this.getX(col), this.getY(row));
    start = new Two.Vector(this.getX(), this.getY());
    return this.two.bind('update', (function(_this) {
      return function(frameCount) {
        var delta, dist;
        dist = start.distanceTo(end);
        if (dist < 1) {
          _this.rect.translation.set(_this.getX(col), _this.getY(row));
          _this.two.unbind('update');
        }
        delta = new Two.Vector(0, dist * .125);
        _this.rect.translation.addSelf(delta);
        return start = start.addSelf(delta);
      };
    })(this)).play();
  };

  Cell.prototype["delete"] = function() {
    this.hide();
    return this.isDeleted = true;
  };

  return Cell;

})();

module.exports = Cell;
