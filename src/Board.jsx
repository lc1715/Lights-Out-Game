import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/
//This is the parent component, Board =

function Board({ nrows, ncols, chanceLightStartsOn }) {
  // TODO: create array-of-arrays of true/false values
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  const [board, setBoard] = useState(createBoard());

  function createBoard() {
    let numOfArrs = Array.from({ length: nrows })

    let initialBoard = numOfArrs.map(undefined => [])

    for (let row of initialBoard) {
      for (let i = 1; i <= ncols; i++) {
        row.push(chanceLightStartsOn())
      }
    }
    return initialBoard
  }


  // TODO: check the board in state to determine whether the player has won.
  function hasWon() {
    return board.every(row => row.every(cell => !cell))
  }

  if (hasWon()) {
    return <div>You won the game!</div>
  }


  function flipCellsAround(yAndXCoordinates) {

    setBoard(oldBoard => {
      const [y, x] = yAndXCoordinates.split("-").map(Number);

      // if this coord is actually on board, flip it
      const flipCell = (y, x, boardCopy) => {
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      let boardCopy = [...oldBoard]

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy)
      flipCell(y + 1, x, boardCopy)
      flipCell(y - 1, x, boardCopy)
      flipCell(y, x + 1, boardCopy)
      flipCell(y, x - 1, boardCopy)

      return boardCopy
    });
  }

  // TODO: make table board
  return (
    < table >
      <tbody>
        {board.map((arr, y) => (
          <tr>{arr.map((val, x) => {
            const yAndXCoordinates = `${y}-${x}`
            return < Cell
              flipCellsAroundMe={flipCellsAround}
              isLit={val}
              coord={yAndXCoordinates}
              key={yAndXCoordinates}
            />
          })

          }
          </tr>
        ))}
      </tbody>
    </table >
  )
}

export default Board;
