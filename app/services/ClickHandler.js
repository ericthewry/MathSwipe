// Generated by CoffeeScript 1.9.3
var $, ClickHandler,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

$ = require('jquery');

ClickHandler = (function() {
  function ClickHandler(board1, two, clicked) {
    var cell, i, j, len, len1, ref, row;
    this.board = board1;
    this.clicked = clicked != null ? clicked : [];
    this.numClicked = this.clicked.length;
    if (this.board.cells == null) {
      return;
    }
    ref = this.board.cells;
    for (i = 0, len = ref.length; i < len; i++) {
      row = ref[i];
      if (row.length === 0) {
        break;
      }
      for (j = 0, len1 = row.length; j < len1; j++) {
        cell = row[j];
        if (cell.isSelected) {
          this.addToClicked(cell);
        }
      }
    }
  }

  ClickHandler.prototype.bindDefaultClick = function(board) {
    return $('body').click((function(_this) {
      return function(e) {
        e.preventDefault();
        return _this.resetClicked();
      };
    })(this));
  };

  ClickHandler.prototype.bindClickTo = function(cells) {
    var cell, i, j, len, len1, row;
    if (cells.bindClick != null) {
      cells.bindClick();
      return;
    }
    for (i = 0, len = cells.length; i < len; i++) {
      row = cells[i];
      if (row.bindClick != null) {
        row.bindClick();
        return;
      }
      for (j = 0, len1 = row.length; j < len1; j++) {
        cell = row[j];
        if (cell.bindClick != null) {
          cell.bindClick();
        } else {
          console.log('WARN: object not 2D arrays or simpler or no BindClick method');
        }
      }
    }
  };

  ClickHandler.prototype.addToClicked = function(cell) {
    if (cell.isDeleted) {
      return;
    }
    this.numClicked++;
    return this.clicked.push(cell);
  };

  ClickHandler.prototype.removeFromClicked = function(cell) {
    this.numClicked--;
    return this.clicked.pop();
  };

  ClickHandler.prototype.resetClicked = function() {
    var results;
    results = [];
    while (this.numClicked > 0) {
      results.push(this.unclickCell(this.lastClicked()));
    }
    return results;
  };

  ClickHandler.prototype.firstClicked = function() {
    return this.clicked[0];
  };

  ClickHandler.prototype.lastClicked = function() {
    return this.clicked[this.numClicked - 1];
  };

  ClickHandler.prototype.clickCell = function(cell) {
    var ref;
    if (this.numClicked === 0 || this.clicked.length === 0 || this.areAdjacent(cell, this.lastClicked())) {
      if (ref = this.cell, indexOf.call(this.clicked, ref) >= 0) {
        return;
      }
      cell.select();
      return this.addToClicked(cell);
    } else {
      this.resetClicked();
      return this.clickCell(cell);
    }
  };

  ClickHandler.prototype.areAdjacent = function(cell, otherCell) {
    return Math.abs(cell.row - otherCell.row) <= 1 && Math.abs(cell.col - otherCell.col) <= 1;
  };

  ClickHandler.prototype.unclickCell = function(cell) {
    var last;
    last = this.lastClicked();
    if (cell !== this.lastClicked()) {
      return null;
    }
    cell.unSelect();
    console.log(this.numClicked);
    this.removeFromClicked(cell);
    return console.log(this.numClicked);
  };

  return ClickHandler;

})();

module.exports = ClickHandler;
