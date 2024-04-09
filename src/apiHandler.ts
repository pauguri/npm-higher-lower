import { PackageType } from "./@types/types";

const API_URL = 'https://npm-higher-lower-api.onrender.com';

export const getPackages = async (): Promise<string[]> => {
  const response = await fetch(API_URL + '/packages?count=10');
  if (response.ok) {
    const data = await response.json();
    return data as string[];
  } else {
    console.log(response.statusText);
    return [];
  }
}

export const getPackage = async (name: string): Promise<PackageType | null> => {
  const response = await fetch(API_URL + '/package/?' + new URLSearchParams({ name: name }));
  if (response.ok) {
    const data = await response.json();
    return data as PackageType;
  } else {
    console.log(response.statusText);
    return null;
  }
}