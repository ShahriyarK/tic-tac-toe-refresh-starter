const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);


    // Replace this with real commands
    Screen.addCommand('up', 'Moves the cursor one position up', this.cursor.up.bind(this.cursor));
    Screen.addCommand('down', 'Moves the cursor one position down', this.cursor.down.bind(this.cursor));
    Screen.addCommand('left', 'Moves the cursor one position left', this.cursor.left.bind(this.cursor));
    Screen.addCommand('right', 'Moves the cursor one position right', this.cursor.right.bind(this.cursor));
    Screen.addCommand('x', 'For marking an X', this.placeMove.bind(this, 'X'));
    Screen.addCommand('o', 'For marking an O', this.placeMove.bind(this, 'O'));
    this.cursor.setBackgroundColor()
    Screen.render();
  }

  placeMove(char) {
    Screen.setGrid(this.cursor.row, this.cursor.col, char);
    this.grid = Screen.grid;
    if (char === 'X') Screen.setMessage(`Its O's turn now.`)
    else Screen.setMessage(`Its X's turn now.`)
    const winner = TTT.checkWin(Screen.grid)
    TTT.endGame(winner);
    Screen.render();

  }

  static checkWin(grid) {
    const winnerHorizontal = getHorizontal();
    if (winnerHorizontal) return winnerHorizontal;

    const winnerVertical = getVertical();
    if (winnerVertical) return winnerVertical;

    const winnerInLeftDiagonal = getLeftDiagonal();
    if (winnerInLeftDiagonal) return winnerInLeftDiagonal;

    const winnerInRightDiagonal = getRightDiagonal();
    if (winnerInRightDiagonal) return winnerInRightDiagonal;

    if (grid.every(row => row.every(col => col === ' '))) return false;

    if (grid.every(row => row.every(col => col !== ' '))) return 'T';
    return false;

    function getHorizontal() {
      const winnerRow = grid.find(row => row.every(el => el === row[0] && row[0] !== ' '));
      if (winnerRow) return winnerRow[0];
    }

    function getVertical() {
      const width = grid[0].length;
      for (let col = 0; col < width; col++) {
        const winnerCol = grid.map(row => row[col]);
        const checkWinner = winnerCol.every(el => el === winnerCol[0] && winnerCol[0] !== ' ');
        if (checkWinner) return winnerCol[0];
      }
    }

    function getLeftDiagonal() {
      const leftDiagonal = grid.map((row, indx) => row[indx]);
      const checkWinner = leftDiagonal.every(el => el === leftDiagonal[0] && leftDiagonal[0] !== ' ');
      if (checkWinner) return leftDiagonal[0];
    }

    function getRightDiagonal() {
      const rightDiagonal = grid.map((row, indx) => row[row.length - 1 - indx])
      const checkWinner = rightDiagonal.every(el => el === rightDiagonal[0] && rightDiagonal[0] !== ' ');
      if (checkWinner) return rightDiagonal[0];
    }
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = TTT;
