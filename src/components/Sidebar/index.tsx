import React, { useEffect } from "react";
import RangeSlider from "react-range-slider-input";

import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedBreeds,
  setOrderBy,
  setFilterBy,
  setAgeMin,
  setAgeMax,
  fetchDataDogs,
} from "../../store/dogsSlice";
import { Breed } from "../../types/Dogs";
import { Input, Select, SelectItem, Spacer } from "@nextui-org/react";
import { AppDispatch } from "../../store/store";

import AbstractService from "../../services/abstract.service";

const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const breeds = useSelector((state: any) => state.dogs.breeds);
  const selectedBreeds = useSelector((state: any) => state.dogs.selectedBreeds);
  const orderBy = useSelector((state: any) => state.dogs.orderBy);
  const filterBy = useSelector((state: any) => state.dogs.filterBy);
  const itemsPeerPage = useSelector((state: any) => state.dogs.itemsPeerPage);
  const page = useSelector((state: any) => state.dogs.page);
  const ageMin = useSelector((state: any) => state.dogs.ageMin);
  const ageMax = useSelector((state: any) => state.dogs.ageMax);

  const handleBreedChange = (e: any) => {
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

  const handleOrderByChange = (e: any) => {
    dispatch(setOrderBy(e.target.value));
  };

  const handleFilterByChange = (e: any) => {
    dispatch(setFilterBy(e.target.value));
  };

  const handleRange = (e: any) => {
    dispatch(setAgeMin(e[0]));
    dispatch(setAgeMax(e[1]));
  };

  useEffect(() => {
    dispatch(
      fetchDataDogs({
        selectedBreeds: selectedBreeds,
        orderBy: orderBy,
        filterBy: filterBy,
        itemsPeerPage,
        page,
        ageMin,
        ageMax,
      })
    );
  }, [
    ageMax,
    ageMin,
    dispatch,
    filterBy,
    itemsPeerPage,
    orderBy,
    page,
    selectedBreeds,
  ]);

  useEffect(() => {
    AbstractService.getZipCode().then((response) => {
      console.log("response", response);
    });
  }, []);

  return (
    <>
      <div className="flex flex-col w-56">
        <span className="font-bold text-lg">Filters</span>
        <Spacer y={3} />
        <Select
          label="Order by"
          className="max-w-xs"
          defaultSelectedKeys={["asc"]}
          onChange={handleOrderByChange}
        >
          <SelectItem key="asc" value="asc">
            Asc
          </SelectItem>
          <SelectItem key="desc" value="desc">
            Desc
          </SelectItem>
        </Select>
        <Spacer y={3} />
        <Select
          label="Filter by"
          className="max-w-xs"
          defaultSelectedKeys={["breed"]}
          onChange={handleFilterByChange}
        >
          <SelectItem key="breed" value="breed">
            Breed
          </SelectItem>
          <SelectItem key="name" value="name">
            Name
          </SelectItem>
          <SelectItem key="age" value="age">
            Age
          </SelectItem>
        </Select>

        <Spacer y={5} />
        <div className=" text-sm pl-1">
          From {ageMin} to {ageMax} age
        </div>
        <Spacer y={3} />
        <RangeSlider
          min={0}
          max={14}
          value={[ageMin, ageMax]}
          onInput={handleRange}
        />

        <Spacer y={8} />
        <Input type="text" label="Zip Code" placeholder="Enter your zip code" />
        <Spacer y={5} />
        <Select
          label="Select the breeds"
          onChange={handleBreedChange}
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

        {selectedBreeds[0] !== "" && selectedBreeds.length > 0 && (
          <>
            <h3 className="mt-3 text-sm font-bold">Breeds Selected</h3>
            <div className="h-32 overflow-x-auto">
              {selectedBreeds.map((breed: any) => (
                <span
                  className="inline-block bg-la-primary text-white py-1 px-2 mx-1 my-1 text-xs rounded"
                  key={breed.name}
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
