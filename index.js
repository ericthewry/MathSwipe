// Generated by CoffeeScript 1.9.3
var AdjacentCellsCalculator, DFS, ExpressionGenerator, GameGrid, InputSolver, Tuple, TupleSet, each, i, inputList, len, ref;

AdjacentCellsCalculator = require('./app/services/AdjacentCellsCalculator');

DFS = require('./app/services/DFS');

ExpressionGenerator = require('./app/services/ExpressionGenerator');

GameGrid = require('./app/models/GameGrid');

InputSolver = require('./app/services/InputSolver');

Tuple = require('./app/models/Tuple');

TupleSet = require('./app/models/TupleSet');

inputList = ['1', '22', '333', '4444', '55555', '666666', '7777777', '88888888', '999999999', '++++'];

this.grid = new GameGrid(7);

DFS.setEquationsOnGrid(this.grid, inputList, AdjacentCellsCalculator);

console.log('\n');

ref = this.grid.grid;
for (i = 0, len = ref.length; i < len; i++) {
  each = ref[i];
  console.log(each);
}
