// Generated by CoffeeScript 1.9.3
var $, AdjacentCellsCalculator, Board, Cell, ClickHandler, Colors, DFS, ExpressionGenerator, GameGrid, InputSolver, MathSwipeController, Tuple,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

InputSolver = require('../services/InputSolver');

DFS = require('../services/DFS');

ExpressionGenerator = require('../services/ExpressionGenerator');

AdjacentCellsCalculator = require('../services/AdjacentCellsCalculator');

ClickHandler = require('../services/ClickHandler');

Tuple = require('../models/Tuple');

GameGrid = require('../models/GameGrid');

Board = require('../views/Board');

Cell = require('../views/Cell');

Colors = require('../views/Colors');

$ = require('jquery');

MathSwipeController = (function() {
  function MathSwipeController() {
    this.testDFS = bind(this.testDFS, this);
    this.testInputSolver = bind(this.testInputSolver, this);
    this.testCellDelete = bind(this.testCellDelete, this);
    this.testExpGen = bind(this.testExpGen, this);
    this.tests = bind(this.tests, this);
    var symbols, two;
    this.gridModel = [['1', '2', '3'], ['+', '5', '6'], ['0', '8', '9']];
    two = this.createTwo();
    symbols = this.getSymbols(two);
    this.board = new Board(this.gridModel, two, Cell, Colors, ClickHandler, symbols);
    this.tests();
  }

  MathSwipeController.prototype.createTwo = function() {
    var two;
    two = new Two({
      fullscreen: true,
      autostart: true
    }).appendTo(document.getElementById('game'));
    return two;
  };

  MathSwipeController.prototype.getSymbols = function(two) {
    var i, k, len, s, svgs, symbols;
    svgs = $('#assets svg');
    symbols = [];
    for (i = k = 0, len = svgs.length; k < len; i = ++k) {
      s = svgs[i];
      symbols.push(two.interpret(s));
      symbols[i].visible = false;
    }
    two.update();
    return symbols;
  };

  MathSwipeController.prototype.tests = function() {
    return this.testCellDelete();
  };

  MathSwipeController.prototype.testExpGen = function() {
    var expression, k, length, results;
    results = [];
    for (length = k = 1; k <= 30; length = ++k) {
      expression = ExpressionGenerator.generate(length);
      results.push(console.log(length, expression, InputSolver.compute(expression)));
    }
    return results;
  };

  MathSwipeController.prototype.testCellDelete = function() {
    var solution;
    solution = [new Tuple(0, 0), new Tuple(1, 1), new Tuple(0, 2)];
    return this.board.deleteCells(solution);
  };

  MathSwipeController.prototype.testInputSolver = function() {
    return console.log(InputSolver.compute('1+2*3'));
  };

  MathSwipeController.prototype.testDFS = function() {
    var each, inputList, j, k, l, len, len1, line, ref, results;
    inputList = ['abcde', 'fghij', 'klmno', 'pqrst', 'uvwxy'];
    DFS.setEquationsOnGrid(this.gridModel, inputList, AdjacentCellsCalculator);
    console.log('\n');
    ref = this.gridModel.grid;
    results = [];
    for (k = 0, len = ref.length; k < len; k++) {
      each = ref[k];
      line = '';
      for (l = 0, len1 = each.length; l < len1; l++) {
        j = each[l];
        line += j.value + '\t';
      }
      results.push(console.log(line));
    }
    return results;
  };

  return MathSwipeController;

})();

module.exports = MathSwipeController;
