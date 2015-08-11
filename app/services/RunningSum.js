// Generated by CoffeeScript 1.9.3
var $, RunningSum;

$ = require('jquery');

RunningSum = (function() {
  function RunningSum() {}

  RunningSum.display = function(solution, value) {
    var expression;
    if (solution === '') {
      expression = '';
    } else if (isNaN(value)) {
      expression = 'Invalid Expression';
    } else if (this.isCompleteExpression(solution)) {
      expression = (this.addParens(solution)) + '=' + value;
    } else {
      expression = solution;
    }
    return $('#running-sum').html(this.format(expression));
  };

  RunningSum.isCompleteExpression = function(solution) {
    return solution.search(/-?\d+[-+\*]\d+/g) === 0;
  };

  RunningSum.addParens = function(solution) {
    var char, first, index, lastOpIndex;
    if (solution.length < 3) {
      return solution;
    }
    lastOpIndex = solution.search(/\d[-+\*]/g) + 1;
    index = lastOpIndex;
    while (index < solution.length) {
      char = solution[index];
      if (lastOpIndex < index && (char === '+' || char === '-' || char === '*')) {
        first = '(' + (solution.substring(0, index)) + ')';
        lastOpIndex = first.length;
        solution = first + (solution.substring(index));
      }
      index++;
    }
    return solution;
  };

  RunningSum.format = function(input) {
    return input.replace(/\*/g, ' x ').replace(/\+/g, ' + ').replace(/(\d+|\))-/g, '$1 - ').replace(/\=/g, ' = ');
  };

  return RunningSum;

})();

module.exports = RunningSum;
