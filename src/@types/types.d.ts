export type Package = {
  package: string;
  description: string;
  downloads: number;
  start: string;
  end: string;
};

export type Response = {
  status: number;
  data: any;
}