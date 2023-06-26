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
    const height = grid.length;
    // let checkGrid = false
    let rowStart = 0;
    let colEnd = grid[0].length - 1;
    let leftDiagonal = [];
    let rightDiagonal = [];
    // let tie = true;

    for (let row = 0; row < height; row++) {
      const width = grid[row].length;
      let horizontal = [];
      let vertical = [];

      rightDiagonal.push(grid[rowStart][colEnd]);
      rowStart++;
      colEnd--;
      for (let col = 0; col < width; col++) {
        horizontal.push(grid[row][col]);
        vertical.push(grid[col][row]);
        if (col === row) leftDiagonal.push(grid[row][col]);
        // if (grid[row][col] !== ' ') {
        //   checkGrid = true;
        // } else {tie = false}
      }
      if (getWinner(horizontal)) return getWinner(horizontal);
      if (vertical.filter(char => char === 'O').length === height) return 'O';
      if (getWinner(vertical)) return getWinner(vertical);
    }
    if (grid.every(row => row.every(col => col === ' ')) === true) return false;
    // if (!checkGrid) return checkGrid;
    if (getWinner(leftDiagonal)) return getWinner(leftDiagonal);
    if (getWinner(rightDiagonal)) return getWinner(rightDiagonal);
    if (grid.every(row => row.every(col => col !== ' ')) === true) return 'T';

    return false;
    function getWinner(array) {
      if (array.filter(char => char === 'X').length === height) return 'X';
      if (array.filter(char => char === 'O').length === height) return 'O';
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
