import { useState } from "react"
import { Square } from "./components/Square"
import { TURNS } from "./constants";
import { checkEndGame, checkWinnerFrom } from "./logic/board";
import "./App.css"
import { WinnerModal } from "./components/WinnerModal";
import { BoardModal } from "./components/BoardModal";
import TurnModal from "./components/TurnModal";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.X);
  
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  }

  const updateBoard = (index) => {
    if (board[index] || winner)
      return;
    
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false); // Draw
    }
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reiniciar juego</button>
      <BoardModal board={board} updateBoard={updateBoard} />

      <TurnModal turn={turn} />

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App;