import { createContext, useEffect, useRef, useState } from "react";
import { GameContextType, PackageType } from "../@types/types";

import Package from "../components/Package";
import { getPackage, getPackages } from "../apiHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { getHighScore, trySaveHighScore } from "../highScoreHandler";

import "./Game.css";
import GameOverModal from "../components/GameOverModal";

export const GameContext = createContext<GameContextType>({ guessCurrentPkg: null, startGame: null });

export default function Game({ loadingSetter: setLoading }: { loadingSetter: (loading: boolean) => void }) {

  const pkgList = useRef<string[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isNewHighScore, setIsNewHighScore] = useState(false);

  const [refPkg, setRefPkg] = useState<PackageType | null>(null);
  const [currentPkg, setCurrentPkg] = useState<PackageType | null>(null);
  const [revealCurrentDownloads, setRevealCurrentDownloads] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [transitionPkg, setTransitionPkg] = useState<PackageType | null>(null);

  const getRandomPackageName = async () => {
    // check if we have any packages left
    if (pkgList.current.length === 0) {
      pkgList.current = await getPackages();
    }

    const index = Math.floor(Math.random() * pkgList.current.length);
    const pkg = pkgList.current[index];
    pkgList.current.splice(index, 1);
    return pkg;
  }

  const startGame = async () => {
    console.log('Starting game...');
    //return;
    setLoading(true);
    setGameOver(false);
    setRefPkg(null);
    setCurrentPkg(null);
    setRevealCurrentDownloads(false);
    setScore(0);
    setHighScore(getHighScore());
    setIsNewHighScore(false);

    const refPkgName = await getRandomPackageName();
    const currentPkgName = await getRandomPackageName();
    const [refPkgData, currentPkgData] = await Promise.all([getPackage(refPkgName), getPackage(currentPkgName)]);

    setRefPkg(refPkgData);
    setCurrentPkg(currentPkgData);
    setLoading(false);
  }


  const guessCurrentPkg = (isHigher: boolean) => {
    if (refPkg && currentPkg && !revealCurrentDownloads) {

      // Reveal the current downloads
      setRevealCurrentDownloads(true);

      if (refPkg.downloads - currentPkg.downloads < 0 === isHigher || refPkg.downloads - currentPkg.downloads === 0) {
        console.log('Correct!');

        // get a new package
        const getNewPakgage = async () => {
          return await getPackage(await getRandomPackageName());
        }
        const timeout = new Promise(resolve => setTimeout(resolve, 2500));
        Promise.all([getNewPakgage(), timeout]).then(([newPkg]) => {
          // update score
          setScore(score + 1);
          const isHighScore = trySaveHighScore(score + 1);
          if (isHighScore) {
            setHighScore(score + 1);
            setIsNewHighScore(true);
          }

          // start transition
          setRevealCurrentDownloads(false);
          setTransitionPkg({ ...currentPkg });
          setCurrentPkg(newPkg);
        });
      } else {
        console.log('Incorrect!');

        setTimeout(() => {
          setGameOver(true);
        }, 2500);
      }
    }
  }

  const handleTransitionEnd = () => {
    // end transition
    setRefPkg(transitionPkg);
    setTransitionPkg(null);
  }

  // initialize the game
  useEffect(() => {
    startGame();
  }, []);

  return (
    <main className="text-white bg-dark-blue">
      <GameContext.Provider value={{ guessCurrentPkg, startGame }}>
        <GameOverModal score={score} highScore={highScore} isNewHighScore={isNewHighScore} active={gameOver} />
        {refPkg && currentPkg && (
          <section className="relative flex w-screen h-screen max-md:flex-col">
            <Package pkg={refPkg} showDownloads className="bg-dark-blue" />
            <Package pkg={currentPkg} showDownloads={revealCurrentDownloads} animateDownloads className="bg-dark-yellow" />

            {transitionPkg && (
              <div className="absolute bottom-0 z-10 w-full h-1/2 md:right-0 md:w-1/2 md:h-full transition-animation" onAnimationEnd={handleTransitionEnd}>
                <Package pkg={transitionPkg} showDownloads />
              </div>
            )}

            <div className="absolute z-20 text-3xl font-bold max-md:-translate-y-1/2 left-4 top-1/2 md:-translate-x-1/2 md:top-4 md:left-1/2">{score}</div>
            <div className={"absolute z-20 flex items-center justify-center gap-3 text-xl max-md:right-4 max-md:top-1/2 max-md:-translate-y-1/2 md:-translate-x-1/2 md:bottom-4 md:left-1/2 transition-colors" + (isNewHighScore ? ' text-yellow' : '')}>
              <FontAwesomeIcon icon={faCrown} />
              <span>{highScore}</span>
            </div>
          </section>
        )}
      </GameContext.Provider>
    </main>
  )
}
