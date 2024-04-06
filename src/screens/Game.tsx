import { useEffect, useState } from "react";
import { PackageType } from "../@types/types";

import { GameLogic, gameLogicInstance } from "../gameLogic";
import Package from "../components/Package";

export default function Game() {
  const [gameLogic] = useState<GameLogic>(gameLogicInstance);
  // const [refPkg, setRefPkg] = useState<PackageType | null>({
  //   package: "package",
  //   description: "[![NPM version](https://img.shields.io/npm/v/@aws-sdk/eventstream-serde-config-resolver/latest.svg)](https://www.npmjs.com/package/@aws-sdk/eventstream-serde-config-resolver) [![NPM downloads](https://img.shields.io/npm/dm/@aws-sdk/eventstream-serde-confi)](https://www.npmjs.com/package/@aws-sdk/eventstream-serde-config-resolver)",
  //   downloads: 200,
  //   start: "start",
  //   end: "end"
  // });
  // const [nextPkg, setNextPkg] = useState<PackageType | null>({
  //   package: "package",
  //   description: "description",
  //   downloads: 200,
  //   start: "start",
  //   end: "end"
  // });
  const [refPkg, setRefPkg] = useState<PackageType | null>(null);
  const [nextPkg, setNextPkg] = useState<PackageType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setRefPkg(null);
    setNextPkg(null);

    gameLogic.init()
      .then(async () => {
        const pkg1 = await gameLogic.getPackage();
        if (!pkg1) {
          throw new Error('Failed to get package');
        } else {
          setRefPkg(pkg1);
        }
        const pkg2 = await gameLogic.getPackage();
        if (!pkg2) {
          throw new Error('Failed to get package');
        } else {
          setNextPkg(pkg2);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [gameLogic]);

  return (
    <main className="text-white bg-dark-blue">
      {loading && <div>Loading...</div>}
      {refPkg && nextPkg && (
        <section className="flex w-screen h-screen max-md:flex-col">
          <Package pkg={refPkg} className="bg-dark-blue" />
          <Package pkg={nextPkg} className="bg-dark-yellow" guessable={true} />
        </section>
      )}
    </main>
  )
}
