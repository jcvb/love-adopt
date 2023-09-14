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
  getBestMatch,
} from "../../store/dogsSlice";
import { Breed } from "../../types/Dogs";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spacer,
  useDisclosure,
} from "@nextui-org/react";
import { AppDispatch } from "../../store/store";

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
  const favorites = useSelector((state: any) => state.dogs.favorites);
  const bestMatch = useSelector((state: any) => state.dogs.bestMatch);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

  const handleModal = () => {
    onOpen();
    dispatch(getBestMatch({ favorites }));
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

  return (
    <>
      <div className="flex flex-col w-56">
        <span className="font-bold text-lg">Filters</span>
        <Spacer y={3} />
        {favorites.length > 0 && (
          <>
            <span className="font-bold">{favorites.length} favorites dogs</span>
            <Spacer y={2} />
            <Button onPress={handleModal} color="primary" variant="shadow">
              Find your best match
            </Button>
            <Spacer y={6} />
          </>
        )}

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
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {" "}
                  Congratulations! 🐶🎉
                </ModalHeader>
                <ModalBody>
                  <Card
                    isFooterBlurred
                    className="w-full h-[400px] col-span-6 sm:col-span-5"
                  >
                    <CardHeader className="absolute z-10 top-1 flex-col items-start drop-shadow">
                      <div className="flex justify-between w-full">
                        <span className="text-white uppercase font-bold drop-shadow-lg">
                          {bestMatch.breed}
                        </span>
                      </div>
                      <h4 className=" text-white uppercase font-extrabold text-2xl drop-shadow-lg">
                        {bestMatch.name}
                      </h4>
                    </CardHeader>
                    <Image
                      removeWrapper
                      alt="Card example background"
                      className="z-0 w-full h-full  -translate-y-6 object-cover"
                      src={bestMatch.img}
                    />
                    <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                      <div className="flex justify-center items-center">
                        <div className="text-black font-bold">
                          Age {bestMatch.age}
                        </div>
                        <div className="text-black text-tiny ml-6 font-semibold">
                          Zip Code: {bestMatch.zip_code}
                        </div>
                      </div>
                      <Button
                        className=" bg-la-secondary uppercase font-bold text-white"
                        radius="full"
                        size="sm"
                      >
                        Adopt it
                      </Button>
                    </CardFooter>
                  </Card>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default Sidebar;
