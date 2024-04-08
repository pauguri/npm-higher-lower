import { createContext, useEffect, useRef, useState } from "react";
import { GameContextType, GuessablePackageType } from "../@types/types";

import Package from "../components/Package";
import { getPackage, getPackages } from "../apiHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { getHighScore, trySaveHighScore } from "../highScoreHandler";

export const GameContext = createContext<GameContextType>({ guessCurrentPkg: null });

export default function Game() {

  const pkgList = useRef<string[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isNewHighScore, setIsNewHighScore] = useState(false);

  const [refPkg, setRefPkg] = useState<GuessablePackageType | null>(null);
  const [currentPkg, setCurrentPkg] = useState<GuessablePackageType | null>(null);
  const [loading, setLoading] = useState(false);

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
    if (refPkg && currentPkg && currentPkg.guessable) {

      // Disable guessing for the current package
      const currentPkgCopy = { ...currentPkg };
      currentPkgCopy.guessable = false;
      setCurrentPkg(currentPkgCopy);

      if (refPkg.package.downloads - currentPkg.package.downloads < 0 === isHigher || refPkg.package.downloads - currentPkg.package.downloads === 0) {
        console.log('Correct!');

        setScore(score + 1);
        setHighScore(score + 1);
        setIsNewHighScore(trySaveHighScore(score + 1));
      } else {
        console.log('Incorrect!');
      }
    }
  }

  // initialize the game
  useEffect(() => {
    setLoading(true);
    setRefPkg(null);
    setCurrentPkg(null);
    setScore(0);
    setHighScore(getHighScore());
    setIsNewHighScore(false);

    const init = async () => {
      pkgList.current = await getPackages();
      setRefPkg(await getPackage(await getRandomPackageName()));
      setCurrentPkg(await getPackage(await getRandomPackageName(), true));
    }
    init().finally(() => setLoading(false));
  }, []);

  return (
    <main className="text-white bg-dark-blue">
      {loading && <div>Loading...</div>}
      {refPkg && currentPkg && (
        <GameContext.Provider value={{ guessCurrentPkg }}>
          <section className="relative flex w-screen h-screen max-md:flex-col">
            <Package pkg={refPkg} className="bg-dark-blue" />
            <Package pkg={currentPkg} className="bg-dark-yellow" />
            <div className="absolute text-3xl font-bold max-md:-translate-y-1/2 left-4 top-1/2 md:-translate-x-1/2 md:top-4 md:left-1/2">{score}</div>
            <div className={"absolute flex items-center justify-center gap-3 text-xl max-md:right-4 max-md:top-1/2 max-md:-translate-y-1/2 md:-translate-x-1/2 md:bottom-4 md:left-1/2" + (isNewHighScore ? ' text-yellow' : '')}>
              <FontAwesomeIcon icon={faCrown} />
              <span>{highScore}</span>
            </div>
          </section>
        </GameContext.Provider>
      )}
    </main>
  )
}
