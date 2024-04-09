export type PackageType = {
  package: string;
  description: string;
  downloads: number;
  start: string;
  end: string;
};

export type GameContextType = {
  guessCurrentPkg: ((isHigher: boolean) => void) | null;
  startGame: (() => void) | null;
}

// export type Response = {
//   status: number;
//   data: any;
// }