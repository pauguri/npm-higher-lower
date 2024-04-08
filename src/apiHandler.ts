import { PackageType } from "./@types/types";

export const getPackages = async (): Promise<string[]> => {
  const response = await fetch('http://localhost:5000/packages?count=10');
  if (response.ok) {
    const data = await response.json();
    return data as string[];
  } else {
    console.log(response.statusText);
    return [];
  }
}

export const getPackage = async (name: string): Promise<PackageType | null> => {
  const response = await fetch(`http://localhost:5000/package/?` + new URLSearchParams({ name: name }));
  if (response.ok) {
    const data = await response.json();
    return data as PackageType;
  } else {
    console.log(response.statusText);
    return null;
  }
}