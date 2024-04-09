import { faCrown, faHome, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { GameContext } from "../screens/Game";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { GameContextType } from "../@types/types";

export default function GameOverModal({ score, highScore, active = false, isNewHighScore = false }: { score: number, highScore: number, active?: boolean, isNewHighScore?: boolean }) {
  const { startGame } = useContext<GameContextType>(GameContext);
  const navigate = useNavigate();

  const [localScore, setLocalScore] = useState(0);
  const [localHighScore, setLocalHighScore] = useState(0);
  const [localIsNewHighScore, setLocalIsNewHighScore] = useState(false);

  useEffect(() => {
    if (active) {
      setLocalScore(score);
      setLocalHighScore(highScore);
      setLocalIsNewHighScore(isNewHighScore);
    }
  }, [active, score, highScore, isNewHighScore]);

  const handleTryAgain = () => {
    if (startGame) {
      startGame();
    }
  }

  const handleBackToMenu = () => {
    navigate('/');
  }

  return (
    <div className={"absolute inset-0 z-30 flex items-center justify-center bg-black bg-opacity-70 transition-opacity" + (active ? ' opacity-100' : ' opacity-0 pointer-events-none')}>
      <div className="flex flex-col items-center w-full gap-4 p-8 m-4 max-w-[500px] md:p-12 rounded-3xl bg-dark-blue">
        <h2 className="text-3xl">Game Over</h2>
        <div className="flex flex-col items-center">
          <p className="text-xl text-yellow">score</p>
          <p className="text-[70px] leading-none font-bold text-yellow">{localScore}</p>
        </div>
        {localIsNewHighScore ?
          <p className="flex items-center gap-3 text-xl text-yellow">
            <FontAwesomeIcon icon={faCrown} />
            <span>New High Score!</span>
          </p> :
          <p className="flex items-center gap-3 text-xl">
            <span className="font-thin">High Score:</span>
            <span>{localHighScore}</span>
          </p>
        }
        <Button clickHandler={handleTryAgain} className="font-bold bg-green">
          <FontAwesomeIcon icon={faRotateRight} />
          <span>Try Again</span>
        </Button>
        <Button clickHandler={handleBackToMenu} className="bg-red">
          <FontAwesomeIcon icon={faHome} />
          <span>Back to Menu</span>
        </Button>
      </div>
    </div>
  )
}
