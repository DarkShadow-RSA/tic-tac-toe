import React, { useState } from "react";
import Table from "./Table";
const Play = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [turn, setTurn] = useState(0);
  const [isCrossNext, setCrossNext] = useState(true);
  const winner = Solution(history[turn]);
  const player = isCrossNext ? "X" : "O";
  const [playerX, setPlayerX] = useState(0);
  const [playerO, setplayerO] = useState(0);

  const handleClick = (i) => {
    const historyPoint = history.slice(0, turn + 1);
    const current = historyPoint[turn];
    const square = [...current];

    if (winner || square[i]) return;

    square[i] = player;
    setHistory([...historyPoint, square]);
    setTurn(historyPoint.length);
    setCrossNext(!isCrossNext);
  };

  const nextMoveHandler = (turn) => {
    setTurn(turn);
    setCrossNext(turn % 2 === 0);
    if (winner === "X") {
      setPlayerX(playerX + 1);
    }
    if (winner === "O") {
      setplayerO(playerO + 1);
    }
  };

  //solution
  function Solution(e) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (e[a] && e[a] === e[b] && e[a] === e[c]) {
        return e[a];
      }
    }
    return null;
  }

  const disableRstBtn = () => {
    if (turn === 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="maingame">
      <h1 className="headerStyle">
        {winner ? (
          <span>{"Winner: Player " + winner + " 🎉"}</span>
        ) : (
          "Player " + player + ", it's your turn!"
        )}
      </h1>
      <Table square={history[turn]} handleClick={handleClick} />

      <div className="turnBtn">
        <div>
          <ul>
            {history.map((e, i) => (
              <li key={i}>
                {i ? (
                  <button onClick={() => nextMoveHandler(i)}>{i}</button>
                ) : (
                  ""
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button
        className="restartBtn"
        disabled={disableRstBtn()}
        onClick={() => nextMoveHandler(0)}
      >
        Restart
      </button>
      <div className="scoreboardStyle">
        <h1>Scoreboard</h1>
        <h2>Player X: {playerX}</h2>
        <h2>player O: {playerO}</h2>
      </div>
    </div>
  );
};
export default Play;
