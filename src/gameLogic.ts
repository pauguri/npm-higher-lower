import { PackageType } from "./@types/types";

export class GameLogic {
  pkgList: string[] = [];

  init = async () => {
    this.pkgList = await this.getPackages();
  }

  private getPackages = async (): Promise<string[]> => {
    const response = await fetch('http://localhost:5000/packages?count=10');
    if (response.ok) {
      const data = await response.json();
      return data as string[];
    } else {
      console.log(response.statusText);
      return [];
    }
  }

  getPackage = async (): Promise<PackageType | null> => {
    // check if we have any packages left
    if (this.pkgList.length === 0) {
      this.pkgList = await this.getPackages();
    }

    const index = Math.floor(Math.random() * this.pkgList.length);
    const pkg = this.pkgList[index];
    this.pkgList.splice(index, 1);

    const response = await fetch(`http://localhost:5000/package/?` + new URLSearchParams({ name: pkg }));
    if (response.ok) {
      const data = await response.json();
      return data as PackageType;
    } else {
      console.log(response.statusText);
      return null;
    }
  }
}

export const gameLogicInstance: GameLogic = new GameLogic();