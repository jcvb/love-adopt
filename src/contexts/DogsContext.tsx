import { createContext, ReactNode, useState, useMemo } from "react";
import { Breed, IBreedContext, ISelectedBreedContext } from "../types/Dogs"; // Asumiendo que tienes ISelectedBreedContext definido

type Props = {
  children?: ReactNode;
};

const initialValueBreeds = {
  breeds: [],
  setBreeds: () => {},
};

const initialValueSelectedBreeds = {
  selectedBreeds: [],
  setSelectedBreeds: () => {},
};

const DogsBreedsContext = createContext<IBreedContext>(initialValueBreeds);
const DogsSelectedBreedsContext = createContext<ISelectedBreedContext>(initialValueSelectedBreeds);

const DogsProvider = ({ children }: Props) => {
  const [breeds, setBreeds] = useState<Breed[]>(initialValueBreeds.breeds);
  const [selectedBreeds, setSelectedBreeds] = useState<Breed[]>(initialValueSelectedBreeds.selectedBreeds);

  const contextValueBreeds = useMemo(() => {
    return { breeds, setBreeds };
  }, [breeds]);

  const contextValueSelectedBreeds = useMemo(() => {
    return { selectedBreeds, setSelectedBreeds };
  }, [selectedBreeds]);

  return (
    <DogsBreedsContext.Provider value={contextValueBreeds}>
      <DogsSelectedBreedsContext.Provider value={contextValueSelectedBreeds}>
        {children}
      </DogsSelectedBreedsContext.Provider>
    </DogsBreedsContext.Provider>
  );
};

export { DogsBreedsContext, DogsSelectedBreedsContext, DogsProvider };
