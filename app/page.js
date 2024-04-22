"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [board, setBoard] = useState(Array(9).fill(null));

  const cells_in_lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 6, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const determineWinner = (board) => {
    for (let i = 0; i < cells_in_lines.length; i++) {
      const [x, y, z] = cells_in_lines[i];
      if (board[x] !== null && board[x] === board[y] && board[y] === board[z]) {
        //if all the values are match then the player is win
        return board[x];
      }
    }
    return null;
  };

  const Cell = ({ mark, disabled, onClick, styleProps }) => {
    return (
      <button className={styleProps} onClick={onClick} disabled={disabled}>
        {mark}
      </button>
    );
  };
  const winner = determineWinner(board);
  const getStatus = () => {
    if (winner !== null) {
      return `Player ${winner} wins`;
    };
    if(!board.includes(null)){
      return "It's a draw";
    }

    return `Player ${currentPlayer} turns`;
  };
  return (
    <div className={styles.App}>
      <h3>Tic Tac Toe</h3>
      <p>{getStatus()}</p>
      <div className={styles.board}>
        {Array(9)
          .fill(null)
          .map((_, index) => index) //it wil output [0,1,2,3,4,5,6,7,8]
          .map((cellIndex) => {
            return (
              <Cell
                key={cellIndex}
                onClick={() => {
                  const newBoard = [...board];
                  newBoard[cellIndex] = currentPlayer;
                  setBoard(newBoard);
                  setCurrentPlayer(currentPlayer === "X" ? "0" : "X");
                }}
                mark={board[cellIndex]}
                disabled={board[cellIndex] || winner}
                styleProps={styles.innerCell}
              />
            );
          })}
      </div>
      <button
        onClick={() => {
          setBoard(Array(9).fill(null));
          setCurrentPlayer("X");
        }}
      >
        {"Reset"}
      </button>
    </div>
  );
}
