import { createContext, useEffect, useRef, useState } from "react";
import { GameContextType, GuessablePackageType } from "../@types/types";

import Package from "../components/Package";
import { getPackage, getPackages } from "../apiHandler";

export const GameContext = createContext<GameContextType>({ guessCurrentPkg: null });

export default function Game() {

  const pkgList = useRef<string[]>([]);
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
          <section className="flex w-screen h-screen max-md:flex-col">
            <Package pkg={refPkg} className="bg-dark-blue" />
            <Package pkg={currentPkg} className="bg-dark-yellow" />
          </section>
        </GameContext.Provider>
      )}
    </main>
  )
}
