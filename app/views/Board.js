// Generated by CoffeeScript 1.9.3
var Board,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Board = (function() {
  function Board(boardValues, scene, goals, symbols, goalContainer, isMobile, Cell, Colors, ClickHandler, SolutionService, BoardSolvedService, RunningSum) {
    this.boardValues = boardValues;
    this.scene = scene;
    this.goals = goals;
    this.symbols = symbols;
    this.goalContainer = goalContainer;
    this.isMobile = isMobile;
    this.Cell = Cell;
    this.Colors = Colors;
    this.ClickHandler = ClickHandler;
    this.SolutionService = SolutionService;
    this.BoardSolvedService = BoardSolvedService;
    this.RunningSum = RunningSum;
    this.createCells = bind(this.createCells, this);
    this.createEmptyCells = bind(this.createEmptyCells, this);
    this.createBoard = bind(this.createBoard, this);
    this.initializer = bind(this.initializer, this);
    this.dimension = this.boardValues.length;
    this.initialValues = this.copyValues(this.boardValues);
    this.initializer();
    this.getSuccessSVG();
  }

  Board.prototype.initializer = function() {
    var solutionService;
    solutionService = new this.SolutionService(this, this.goals);
    this.clickHandler = new this.ClickHandler(this, solutionService, this.goalContainer, this.isMobile, this.BoardSolvedService, this.RunningSum);
    this.createBoard();
    this.createEmptyCells(this.cellWidth - 5);
    this.createCells(this.cellWidth);
    this.clickHandler.bindDefaultMouseEvents();
    return this.scene.update();
  };

  Board.prototype.createBoard = function() {
    var offset;
    this.size = this.scene.height * .95;
    offset = this.size * .025;
    this.cellWidth = ((this.size - offset) / this.dimension) - offset;
    this.change = offset + this.cellWidth;
    this.x = this.scene.width / 2;
    this.y = this.scene.height / 2;
    this.y = this.y < this.size / 2 ? this.size / 2 : this.y;
    this.board = this.scene.makeRectangle(this.x, this.y, this.size, this.size);
    this.board.noStroke().fill = this.Colors.board;
    return this.board.visible = true;
  };

  Board.prototype.createEmptyCells = function(width) {
    var cell, col, i, ref, results, row;
    this.empty_cells = [];
    results = [];
    for (row = i = 0, ref = this.dimension; 0 <= ref ? i < ref : i > ref; row = 0 <= ref ? ++i : --i) {
      this.empty_cells.push([]);
      results.push((function() {
        var j, ref1, results1;
        results1 = [];
        for (col = j = 0, ref1 = this.dimension; 0 <= ref1 ? j < ref1 : j > ref1; col = 0 <= ref1 ? ++j : --j) {
          cell = new this.Cell(col, row, width, this.scene, this);
          cell.setColor(this.Colors.emptyCell);
          cell.setBorder(this.Colors.emptyCellBorder);
          results1.push(this.empty_cells[row].push(cell));
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  Board.prototype.createCells = function(width) {
    var cell, col, i, ref, results, row;
    this.cells = [];
    results = [];
    for (row = i = 0, ref = this.dimension; 0 <= ref ? i < ref : i > ref; row = 0 <= ref ? ++i : --i) {
      this.cells.push([]);
      results.push((function() {
        var j, ref1, results1;
        results1 = [];
        for (col = j = 0, ref1 = this.dimension; 0 <= ref1 ? j < ref1 : j > ref1; col = 0 <= ref1 ? ++j : --j) {
          cell = new this.Cell(col, row, width, this.scene, this, this.clickHandler, this.symbols[this.toIdx(this.boardValues[row][col])]);
          cell.setColor(this.Colors.cell);
          cell.setBorder(this.Colors.cellBorder);
          results1.push(this.cells[row].push(cell));
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  Board.prototype.deleteCells = function(solution) {
    var i, len, tuple;
    for (i = 0, len = solution.length; i < len; i++) {
      tuple = solution[i];
      this.deleteCellAt(tuple.x, tuple.y);
    }
    return this.pushAllCellsToBottom();
  };

  Board.prototype.deleteCellAt = function(x, y) {
    this.boardValues[y][x] = ' ';
    return this.cells[y][x]["delete"]();
  };

  Board.prototype.pushAllCellsToBottom = function() {
    var col, i, j, k, ref, ref1, ref2, row, up;
    for (row = i = ref = this.dimension - 1; ref <= 1 ? i <= 1 : i >= 1; row = ref <= 1 ? ++i : --i) {
      for (col = j = ref1 = this.dimension - 1; ref1 <= 0 ? j <= 0 : j >= 0; col = ref1 <= 0 ? ++j : --j) {
        if (this.cells[row][col].isDeleted) {
          for (up = k = ref2 = row - 1; ref2 <= 0 ? k <= 0 : k >= 0; up = ref2 <= 0 ? ++k : --k) {
            if (!this.cells[up][col].isDeleted) {
              this.swapCells(row, col, up, col);
              break;
            }
          }
        }
      }
    }
    return this.scene.update();
  };

  Board.prototype.swapCells = function(r1, c1, r2, c2) {
    var temp;
    this.cells[r1][c1].shiftTo(r2, c2);
    this.cells[r2][c2].shiftTo(r1, c1);
    temp = this.cells[r1][c1];
    this.cells[r1][c1] = this.cells[r2][c2];
    this.cells[r2][c2] = temp;
    temp = this.boardValues[r1][c1];
    this.boardValues[r1][c1] = this.boardValues[r2][c2];
    return this.boardValues[r2][c2] = temp;
  };

  Board.prototype.toIdx = function(val) {
    if (val.length !== 1) {
      return null;
    }
    switch (val) {
      case '+':
        return 10;
      case '-':
        return 11;
      case '*':
        return 12;
      default:
        return parseInt(val);
    }
  };

  Board.prototype.copyValues = function(source) {
    var col, dest, i, j, ref, ref1, row;
    dest = [];
    for (row = i = 0, ref = this.dimension; 0 <= ref ? i < ref : i > ref; row = 0 <= ref ? ++i : --i) {
      dest.push([]);
      for (col = j = 0, ref1 = this.dimension; 0 <= ref1 ? j < ref1 : j > ref1; col = 0 <= ref1 ? ++j : --j) {
        dest[row].push(source[row][col]);
      }
    }
    return dest;
  };

  Board.prototype.resetBoard = function() {
    this.boardValues = this.copyValues(this.initialValues);
    this.goalContainer.resetGoals();
    return this.initializer();
  };

  Board.prototype.getSuccessSVG = function() {
    this.successSVG = this.symbols[this.symbols.length - 1].clone();
    return this.successSVG.noStroke().fill = '#D1857F';
  };

  Board.prototype.successAnimation = function() {
    this.success = this.scene.makeGroup(this.successSVG);
    this.success.translation.set(this.scene.width / 2, this.scene.width / 2);
    this.success.scale = 0.001;
    return this.scene.bind('update', (function(_this) {
      return function(frameCount) {
        var delta;
        delta = (1 - _this.success.scale) * 0.05;
        _this.success.scale += delta;
        _this.success.rotation += delta * Math.PI * 2;
        if (_this.success.scale > 0.999) {
          return _this.success.scale = _this.success.rotation = 0;
        }
      };
    })(this)).play();
  };

  return Board;

})();

module.exports = Board;
