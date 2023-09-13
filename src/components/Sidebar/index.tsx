import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedBreeds } from "../../store/dogsSlice";
import { Breed } from "../../types/Dogs";
import { Select, SelectItem, Spacer } from "@nextui-org/react";

const Sidebar = () => {
  const dispatch = useDispatch();
  const breeds = useSelector((state: any) => state.dogs.breeds);
  const selectedBreeds = useSelector((state: any) => state.dogs.selectedBreeds);

  const handleSelectionChange = (e: any) => {
    const newSelectedBreeds: Array<Breed> = [];
    const newSelectedItem: Array<any> = e.target.value.split(",");
    newSelectedItem.forEach((breed: any) => {
      newSelectedBreeds.push({
        name: breed.replaceAll("_", " "),
        key: breed,
      });
    });
    dispatch(setSelectedBreeds(newSelectedBreeds));
  };

  return (
    <>
      <div className="flex flex-col w-56">
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
          {breeds.map((breed: any) => (
            <SelectItem
              aria-label={breed.name}
              key={breed.key}
              value={breed.name}
            >
              {breed.name}
            </SelectItem>
          ))}
        </Select>

        <h3 className="mt-3 text-sm font-bold">Breeds Selected</h3>
        <div>
          {selectedBreeds.map((breed: any) => (
            <span
              className="inline-block bg-la-primary text-white py-1 px-2 mx-1 my-1 text-xs rounded"
              key={breed.name}
            >
              {breed.name}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
