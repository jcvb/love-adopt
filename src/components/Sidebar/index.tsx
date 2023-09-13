import { Select, SelectItem, Spacer } from "@nextui-org/react";
import React, { useContext } from "react";
import {
  DogsBreedsContext,
  DogsSelectedBreedsContext,
} from "../../contexts/DogsContext";
import { Breed } from "../../types/Dogs";

const Sidebar = () => {
  const { breeds } = useContext(DogsBreedsContext);
  const { selectedBreeds, setSelectedBreeds } = useContext(
    DogsSelectedBreedsContext
  );

  const handleSelectionChange = (e: any) => {
    const selectedBreeds: Array<Breed> = [];
    const newSelectedItem: Array<any> = e.target.value.split(",");
    newSelectedItem.forEach((breed: any) => {
      selectedBreeds.push({
        name: breed.replaceAll("_", " "),
        key: breed,
      });
    });
    setSelectedBreeds(selectedBreeds);
  };

  return (
    <>
      <div className="flex flex-col">
        <span className="font-bold text-lg">Filters</span>
        <Spacer y={3} />
        <h3 className=" text-center uppercase font-bold">Breeds</h3>
        <Select
          label="Select the breeds"
          onChange={handleSelectionChange}
          placeholder="Any"
          selectionMode="multiple"
          className="max-w-xs"
        >
          {breeds.map((breed) => (
            <SelectItem
              aria-label={breed.name}
              key={breed.key}
              value={breed.name}
            >
              {breed.name}
            </SelectItem>
          ))}
        </Select>
        {(selectedBreeds.length > 0 && selectedBreeds[0].key != "") && (
          <>
            <h3 className="mt-3 text-sm font-bold">Breeds Selected</h3>
            <div>
              {selectedBreeds.map((breed) => (
                <span
                  className="inline-block bg-la-gray-light py-1 px-2 mx-1 my-1 text-xs rounded"
                  key={breed.key}
                >
                  {breed.name}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Sidebar;
