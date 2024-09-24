import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import ParticleBackground from "@/components/ParticlesBackground/ParticlesBackground";

type Player = "X" | "O" | null;

function GamePage() {
  const location = useLocation();
  const [board, setBoard] = useState<Player[][]>([]);
  const [winner, setWinner] = useState<Player>(null);
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const { gridSize, winStreak } = location.state as {
    gridSize: number;
    winStreak: number;
  };

  // Function to initialize/reset the game board
  const startGame = () => {
    const newBoard = Array(gridSize)
      .fill(null)
      .map(() => Array(gridSize).fill(null));
    setBoard(newBoard);
    setWinner(null);
    setCurrentPlayer("X");
  };

  const handleClick = (row: number, col: number) => {
    // If the cell is already filled or there's a winner, do nothing
    if (board[row][col] || winner) return;

    const newBoard = board.map((r) => [...r]); // Creates a shallow copy of the board
    newBoard[row][col] = currentPlayer; // Marks the current cell with the player's symbol (X or O)
    setBoard(newBoard); // Updates the board with the new move

    if (checkWinner(newBoard, row, col)) {
      setWinner(currentPlayer); // If a winning condition is met, set the current player as the winner
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X"); // Switch the turn to the other player
    }
  };

  // Function to check if there's a winner after each move
  const checkWinner = (
    board: Player[][],
    row: number,
    col: number
  ): boolean => {
    // Directions to check for a win: horizontal, vertical, diagonal, and anti-diagonal
    const directions = [
      [0, 1], // horizontal
      [1, 0], // vertical
      [1, 1], // diagonal
      [1, -1], // anti-diagonal
    ];

    return directions.some(([dx, dy]) => {
      let count = 1;
      let r = row + dx;
      let c = col + dy;

      // Check in one direction (e.g., right or down)
      while (
        r >= 0 && // Ensure the row is within bounds
        r < gridSize && // Ensure the row does not exceed grid size
        c >= 0 && // Ensure the column is within bounds
        c < gridSize && // Ensure the column does not exceed grid size
        board[r][c] === currentPlayer // Check if the cell matches the current player's symbol
      ) {
        count++; // Increment the count if a match is found
        r += dx; // Move in the current direction
        c += dy; // Move in the current direction
      }

      // Reset and check in the opposite direction (e.g., left or up)
      r = row - dx;
      c = col - dy;

      while (
        r >= 0 &&
        r < gridSize &&
        c >= 0 &&
        c < gridSize &&
        board[r][c] === currentPlayer
      ) {
        count++;
        r -= dx;
        c -= dy;
      }

      return count >= winStreak;
    });
  };

  useEffect(() => {
    startGame();
  }, [gridSize]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent p-8">
      <ParticleBackground />
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          {winner ? `Winner: ${winner}` : `Current Player: ${currentPlayer}`}
        </h2>

        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
        >
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <Button
                key={`${rowIndex}-${colIndex}`} // Unique key for each cell
                onClick={() => handleClick(rowIndex, colIndex)} // Handle cell click
                className="w-12 h-12 text-xl font-bold md:w-20 md:h-20" // Button size for small and medium screens
                variant={cell ? "default" : "outline"} // Button style: filled if clicked, outline otherwise
                disabled={!!cell || !!winner} // Disable button if cell is filled or a winner exists
              >
                {cell} {/* Display either X or O */}
              </Button>
            ))
          )}
        </div>

        <Link to="/">
          <Button className="mt-4 w-full hover:bg-black hover:text-white">
            New Game
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default GamePage;
