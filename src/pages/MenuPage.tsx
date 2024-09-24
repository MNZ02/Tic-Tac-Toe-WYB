import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import ParticleBackground from "@/components/ParticlesBackground/ParticlesBackground";

function MenuPage() {
  const navigate = useNavigate();

  const [gridSize, setGridSize] = useState(3);
  const [winStreak, setWinStreak] = useState(3);

  const handleClick = () => {
    navigate("/game", { state: { gridSize, winStreak } });
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-transparent p-4">
        <ParticleBackground />
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Tic-Tac-Toe for WYB</h1>
          <div className="space-y-4">
            <div>
              <Label htmlFor="gridSize">Grid Size (n x n)</Label>
              <Input
                id="gridSize"
                type="number"
                min="3"
                max="10"
                value={gridSize}
                onChange={(e) =>
                  setGridSize(
                    Math.max(3, Math.min(10, parseInt(e.target.value)))
                  )
                }
              />
            </div>
            <div>
              <Label htmlFor="winStreak">Win Streak</Label>
              <Input
                id="winStreak"
                type="number"
                min="3"
                max={gridSize}
                value={winStreak}
                onChange={(e) =>
                  setWinStreak(
                    Math.max(3, Math.min(gridSize, parseInt(e.target.value)))
                  )
                }
              />
            </div>
            <Button
              onClick={handleClick}
              className="w-full hover:bg-black hover:text-white"
            >
              Start Game
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuPage;
