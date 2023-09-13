export interface Breed  {
  name: string;
  key: string;
};

export interface IBreedContext {
  breeds: Array<Breed>;
  setBreeds: (newState: Array<Breed>) => void;
};

export interface ISelectedBreedContext {
  selectedBreeds: Array<Breed>;
  setSelectedBreeds: (newState: Array<Breed>) => void;
}