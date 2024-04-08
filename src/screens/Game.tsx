import { createContext, useEffect, useRef, useState } from "react";
import { GameContextType, GuessablePackageType, PackageType } from "../@types/types";

import Package from "../components/Package";
import { getPackage, getPackages } from "../apiHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { getHighScore, trySaveHighScore } from "../highScoreHandler";
import Loader from "../components/Loader";

import "./Game.css";

export const GameContext = createContext<GameContextType>({ guessCurrentPkg: null });

export default function Game() {

  const pkgList = useRef<string[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isNewHighScore, setIsNewHighScore] = useState(false);

  const [refPkg, setRefPkg] = useState<PackageType | null>(null);
  const [currentPkg, setCurrentPkg] = useState<PackageType | null>(null);
  const [revealCurrentDownloads, setRevealCurrentDownloads] = useState(false);
  const [loading, setLoading] = useState(false);

  const [transitionPkg, setTransitionPkg] = useState<PackageType | null>(null);
  const [animatingTransition, setAnimatingTransition] = useState(false);

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
        const timeout = new Promise(resolve => setTimeout(resolve, 3000));
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
          setTransitionPkg(currentPkg);
          setAnimatingTransition(true);

          // set new current package on a small delay to allow the transition to start
          setTimeout(() => {
            setCurrentPkg(newPkg);
          }, 100);
        });
      } else {
        console.log('Incorrect!');
      }
    }
  }

  const handleTransitionEnd = () => {
    // end transition
    setRefPkg(transitionPkg);
    setAnimatingTransition(false);
  }

  // initialize the game
  useEffect(() => {
    setLoading(true);
    setRefPkg(null);
    setCurrentPkg(null);
    setRevealCurrentDownloads(false);
    setScore(0);
    setHighScore(getHighScore());
    setIsNewHighScore(false);

    const init = async () => {
      pkgList.current = await getPackages();
      setRefPkg(await getPackage(await getRandomPackageName()));
      setCurrentPkg(await getPackage(await getRandomPackageName()));
    }
    init().finally(() => setLoading(false));
  }, []);

  return (
    <main className="text-white bg-dark-blue">
      <Loader active={loading} />
      {refPkg && currentPkg && (
        <GameContext.Provider value={{ guessCurrentPkg }}>
          <section className="relative flex w-screen h-screen max-md:flex-col">
            <Package pkg={refPkg} showDownloads className="bg-dark-blue" />
            <Package pkg={currentPkg} showDownloads={revealCurrentDownloads} animateDownloads className="bg-dark-yellow" />

            {animatingTransition && (
              <div className="!absolute right-0 z-10 w-1/2 h-full transition-animation" onAnimationEnd={handleTransitionEnd}>
                <Package pkg={currentPkg} showDownloads />
              </div>
            )}

            <div className="absolute z-20 text-3xl font-bold max-md:-translate-y-1/2 left-4 top-1/2 md:-translate-x-1/2 md:top-4 md:left-1/2">{score}</div>
            <div className={"absolute z-20 flex items-center justify-center gap-3 text-xl max-md:right-4 max-md:top-1/2 max-md:-translate-y-1/2 md:-translate-x-1/2 md:bottom-4 md:left-1/2 transition-colors" + (isNewHighScore ? ' text-yellow' : '')}>
              <FontAwesomeIcon icon={faCrown} />
              <span>{highScore}</span>
            </div>
          </section>
        </GameContext.Provider>
      )}
    </main>
  )
}
