// gameMatrix[line][column]
function gameMatrix() {
  matrix = [];
  for (i = 0; i < 3 ; i++) {
    matrix[i] = [4,4,4];
  }
  return matrix;
}

function checkSumLine(gameMatrix, line) {
  var sum = 0;
  for (column = 0; column < 3 ; column++) {
    sum = sum + gameMatrix[line][column];
  } return sum;
}

function checkSumColumn(gameMatrix, column){
  var sum = 0;
  for (line = 0; line < 3 ; line++) {
    sum = sum + gameMatrix[line][column];
  } return sum;
}

function checkSumDiagonalTopL(gameMatrix) {
  var diagTopL = 0;
  for (i = 0; i < 3 ; i++)
  diagTopL = diagTopL + gameMatrix[i][i];
  return diagTopL;
}

function checkSumDiagonalBottomL(gameMatrix) {
  var diagBottomL = 0;
  for (i = 2, j = 0; j < 3 ; i--, j++)
  diagBottomL += gameMatrix[i][j];
  return diagBottomL;
}

var game = gameMatrix();

function columnOfId(id) {
  return parseInt(id.charAt(5));
}

function lineOfId(id) {
  return parseInt(id.charAt(4));
}

$(document).on('ready', function() {
  var move = 1;
  $('td').on('click', function() {

    var self = $(this);

    var col = columnOfId(self.attr('id'));
    var line = lineOfId(self.attr('id'));

    if ( move % 2 === 1) {
      self.html('O');
      game[line][col] = 0;

    } else {
      self.html('X');
      game[line][col] = 1;
    }

  move++;

  for ( i = 0; i < 3; i++ ) {
    var line = checkSumLine(game,i);
    checkWinner(line);
    // if ( line === 0 || line === 3 ) {
    //   alert ('We Have A Winner! *by checkSumLine*');
    //   $('td').off('click')
    // }
  }

  for ( i = 0; i < 3; i++ ) {
    var col = checkSumColumn(game,i);
    checkWinner(col);
    // if ( col === 0 || col === 3 ) {
    //   alert ('We Have A Winner! *by checkSumColumn*');
    //   $('td').off('click')
    // }
  }

  var diagTop = checkSumDiagonalTopL(game)
  checkWinner(diagTop);
  // if ( diagTop === 0 || diagTop === 3 ) {
  //   alert ('We Have A Winner! *by checkSumDiagonalTopL*');
  //   $('td').off('click')
  // }

  var diagBottom = checkSumDiagonalBottomL(game)
  checkWinner(diagBottom);
  // if ( diagBottom === 0 || diagBottom === 3 ) {
  //   alert ('We Have A Winner! *by checkSumDiagonalBottomL*');
  //   $('td').off('click')
  // }

  function checkWinner (checkSum) {
    if ( checkSum === 0 || checkSum === 3 ) {
      alert ('WE HAVE A WINNER!');
      $('td').off('click')
    }
  }

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
