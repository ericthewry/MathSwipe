// Generated by CoffeeScript 1.9.3
var $, ClickHandler, Tuple;

$ = require('jquery');

Tuple = require('../models/Tuple');

ClickHandler = (function() {
  function ClickHandler(board, solutionService, goalContainer, isMobile, BoardSolvedService, RunningSum) {
    this.board = board;
    this.solutionService = solutionService;
    this.goalContainer = goalContainer;
    this.isMobile = isMobile;
    this.BoardSolvedService = BoardSolvedService;
    this.RunningSum = RunningSum;
    this.clicked = [];
    this.mouseDown = false;
  }

  ClickHandler.prototype.setMouseAsDown = function() {
    return this.mouseDown = true;
  };

  ClickHandler.prototype.setMouseAsUp = function() {
    if (!this.isMobile) {
      this.checkForSolution();
      this.unselectAll();
      if (this.BoardSolvedService.isCleared(this.board)) {
        this.board.successAnimation();
      }
    }
    return this.mouseDown = false;
  };

  ClickHandler.prototype.isMouseDown = function() {
    return this.mouseDown;
  };

  ClickHandler.prototype.isOnMobile = function() {
    return this.isMobile;
  };

  ClickHandler.prototype.bindDefaultMouseEvents = function() {
    var body;
    body = $('body');
    body.click((function(_this) {
      return function(e) {
        e.preventDefault();
        return _this.unselectAll();
      };
    })(this));
    body.mousedown((function(_this) {
      return function(e) {
        return e.preventDefault();
      };
    })(this));
    return body.mouseup((function(_this) {
      return function(e) {
        e.preventDefault();
        return _this.setMouseAsUp();
      };
    })(this));
  };

  ClickHandler.prototype.onSelect = function(cell) {
    if (!this.isSelected(cell)) {
      if (!this.isAdjacentToLast(cell)) {
        this.unselectAll();
      }
      this.setMouseAsDown();
      this.clicked.push(cell);
      cell.select();
      this.solutionService.initialize(this.clicked);
      this.RunningSum.display(this.solutionService.solution, this.solutionService.value);
      if (this.isMobile && this.checkForSolution()) {
        this.unselectAll();
        if (this.BoardSolvedService.isCleared(this.board)) {
          this.board.successAnimation();
        }
      }
    }
    return false;
  };

  ClickHandler.prototype.onUnselect = function(cell) {
    if (this.isSelected(cell)) {
      if (this.clicked[this.clicked.length - 1] === cell) {
        cell.unselect();
        return this.clicked.pop();
      } else {
        this.unselectAll();
        throw "Last item in 'clicked' was not the given cell";
      }
    }
  };

  ClickHandler.prototype.isSelected = function(cell) {
    var iterCell, j, len, ref;
    ref = this.clicked;
    for (j = 0, len = ref.length; j < len; j++) {
      iterCell = ref[j];
      if (cell === iterCell) {
        return true;
      }
    }
    return false;
  };

  ClickHandler.prototype.unselectAll = function() {
    var i, j, ref;
    this.RunningSum.display('');
    if (this.clicked.length < 1) {
      return;
    }
    for (i = j = ref = this.clicked.length - 1; ref <= 0 ? j <= 0 : j >= 0; i = ref <= 0 ? ++j : --j) {
      this.clicked[i].unselect();
    }
    return this.clicked = [];
  };

  ClickHandler.prototype.checkForSolution = function() {
    if (this.solutionService.isSolution()) {
      this.RunningSum.display('');
      this.goalContainer.deleteGoal(this.solutionService.valueIndex);
      this.board.deleteCells(this.clickedToTuples());
      return true;
    }
    return false;
  };

  ClickHandler.prototype.isAdjacentToLast = function(cell) {
    var last;
    if (this.clicked.length < 1) {
      return true;
    }
    last = this.clicked[this.clicked.length - 1];
    return Math.abs(cell.row - last.row) <= 1 && Math.abs(cell.col - last.col) <= 1;
  };

  ClickHandler.prototype.clickedToTuples = function() {
    var cell, j, len, ref, tuples;
    tuples = [];
    ref = this.clicked;
    for (j = 0, len = ref.length; j < len; j++) {
      cell = ref[j];
      tuples.push(new Tuple(cell.col, cell.row));
    }
    return tuples;
  };

  return ClickHandler;

})();

module.exports = ClickHandler;
