// gameMatrix[line][col] gives you the "value" of 'that' or a move.
function gameMatrix() {
  matrix = [];
  for (i = 0; i < 3 ; i++) {
    matrix[i] = [4,4,4];
  }
  return matrix;
}

function getLineCoordinates(lineNumber) {
  var lineArray = [];
  for ( i = 0; i < 3; i++ ) {
    lineArray[i] = [lineNumber, i];
  } return lineArray;
}

function getColumnCoordinates(columnNumber) {
  var columnArray = [];
  for ( i = 0; i < 3; i++ ) {
    columnArray[i] = [i, columnNumber]
  } return columnArray;
}

function getDiagonalTopLCoordinates() {
  var diagonalTopLArray = [];
  for ( i = 0; i < 3; i++ ) {
    diagonalTopLArray[i] = [i, i];
  } return diagonalTopLArray;
}

function getDiagonalBottomLCoordinates() {
  var diagonalBottomLArray = [];
  for (i = 2, j = 0; j < 3 ; i--, j++) {
    diagonalBottomLArray[i] = [i, j];
  } return diagonalBottomLArray;
}

//arrayOfCoordinates will be a "lineArray", "columnArray", or "diagonalArray"
function calculateSumCoordinates(gameMatrix, arrayOfCoordinates) {
  var sum = 0;
  for ( i = 0; i < 3; i++ ) {
    var line = arrayOfCoordinates[i][0];
    var col = arrayOfCoordinates[i][1];
    sum = sum + gameMatrix[line][col];
  } return sum;
}

//will use these functions to get 'x' & 'y' numbers from <td id='cellxy'> on move
function lineOfId(id) {
  return parseInt(id.charAt(4));
}
function colOfId(id) {
  return parseInt(id.charAt(5));
}

var game = gameMatrix();

$(document).on('ready', function() {
  var move = 1;
  $('td').on('click', function() {

    var self = $(this);

    var line = lineOfId(self.attr('id'));
    var col = colOfId(self.attr('id'));

    // set 'O' to 0
    if ( move % 2 === 1) {
      self.html('O');
      game[line][col] = 0;

    // set 'X' to 1
    } else {
      self.html('X');
      game[line][col] = 1;
    }

    move++;

    function checkWinner(arrayOfCoordinates) {
      var sum = calculateSumCoordinates(game, arrayOfCoordinates);
      // console.log(checkSum);

      function cellsToGreen(arrayOfCoordinates){
        var cellName = '#cell' + arrayOfCoordinates[0] + arrayOfCoordinates[1];
        $(cellName).css('background-color', 'green');
      }

      if ( sum === 0 || sum === 3 ) {
        arrayOfCoordinates.forEach(cellsToGreen);
        alert('WE HAVE A WINNER!');
        $('td').off('click')
      }
    }

    for ( var i = 0; i < 3; i++ ) {
      var coordinate = getLineCoordinates(i);
      // console.log('line:' + i);
      checkWinner(coordinate);
    }

    for ( var i = 0; i < 3; i++ ) {
      var coordinate = getColumnCoordinates(i);
      checkWinner(coordinate);
    }

    checkWinner(getDiagonalTopLCoordinates());

    checkWinner(getDiagonalBottomLCoordinates());

    self.off('click');
  });
})

// $('td').one('click', function() {...});
// How do it OOP Style?
// Prototype, Constructor...?
// Object: Grid
// Object: Game
// Object: Move
// Object: Winner?
