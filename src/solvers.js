/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {

  var board = new Board({n:n});

  for(var r=0;r<n;r++) {
    for(var c=0;c<n;c++) {
      // place rook
      var row = board.get(r);
      row[c] = 1;
      if(board.hasAnyRooksConflicts()) {
        row[c] = 0;
      } else {
        if(r === n-1) {
          return board.rows();
        }
      }
    }

  }


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n:n});
  var rows = board.rows();
  var index = 0;
  var zeros = function() {
    var arr =[];
    for(var z=0;z<n;z++) {
      arr.push(0);
    }
    return arr;
  }

  function recursiveCheck(index) {

    for(var c=0;c<n;c++) {

      board.togglePiece(index, c);
      if(board.hasAnyRooksConflicts()) {
        board.togglePiece(index, c);
      } else {
        // recursive -- pass copy of solution so far
        if (index === n-1) {
          solutionCount++;
          board.set(index,zeros());
          board.set(index-1,zeros());
          return;
        }
        recursiveCheck(index+1);
      }

      if(c === n-1) {
        board.set(index,zeros());
        board.set(index-1,zeros());
      }
    }
  };
  recursiveCheck(index);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  var solution = undefined; //fixme

  var board = new Board({n:n});
  var found = false;
  var rows = board.rows();
  var index = 0;
  var zeros = function() {
    var arr =[];
    for(var z=0;z<n;z++) {
      arr.push(0);
    }
    return arr;
  }

  function recursiveCheck(index) {
    if(found) return;
    for(var c=0;c<n;c++) {

      board.togglePiece(index, c);
      if(board.hasAnyQueensConflicts()) {
        board.togglePiece(index, c);
      } else {
        // recursive
        if (index === n-1) {
          solution = board.rows();
          found = true;
        }
        recursiveCheck(index+1);
      }

      if(c === n-1) {
        board.set(index,zeros());
        board.set(index-1,zeros());
      }
    }
  };
  recursiveCheck(index);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));





  if(solution === undefined) {
    var board = new Board({n:n});
    return board.rows();
  }

  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if(n===0) {
    return 1;
  }

  var solutionCount = 0; //fixme
  var board = new Board({n:n});
  var rows = board.rows();
  var index = 0;
  var zeros = function() {
    var arr =[];
    for(var z=0;z<n;z++) {
      arr.push(0);
    }
    return arr;
  }

  function recursiveCheck(index) {

    for(var c=0;c<n;c++) {

      board.togglePiece(index, c);
      if(board.hasAnyQueensConflicts()) {
        board.togglePiece(index, c);
      } else {
        // recursive
        if (index === n-1) {
          solutionCount++;
          board.set(index,zeros());
          board.set(index-1,zeros());
          return;
        }
        recursiveCheck(index+1);
      }

      if(c === n-1) {
        board.set(index,zeros());
        board.set(index-1,zeros());
      }
    }
  };
  recursiveCheck(index);


  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


/*
  var board = new Board({n:4});
  var solutionArray = [];
  index = 0;
  debugger;
  function recurseQueen(index, testArray) {
  // push value to first index
  for (i = 0; i < board.get('n'); i++) {

    while(index < board.get('n')) {
      var testArray = testArray.slice();
      testArray[i][index] = 1;
      if (!board.hasAnyRooksConflicts()) {
        index++;
        recurseQueen(index, testArray);
      }
    }
  }
  // run tests

  // if tests pass invoke function with concatenated array
};

  recurseQueen(index, board.rows());
  */
