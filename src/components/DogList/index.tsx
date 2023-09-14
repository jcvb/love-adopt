import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Pagination,
} from "@nextui-org/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HeartIcon } from "../HeartIcon";

import {
  setItemsPeerPage,
  setPage,
  fetchDataDogs,
  setFavorites,
} from "../../store/dogsSlice";
import { AppDispatch } from "../../store/store";

const DogList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["9"]));

  const dataDogs = useSelector((state: any) => state.dogs.dataDogs);
  const total = useSelector((state: any) => state.dogs.total);

  const selectedBreeds = useSelector((state: any) => state.dogs.selectedBreeds);
  const orderBy = useSelector((state: any) => state.dogs.orderBy);
  const filterBy = useSelector((state: any) => state.dogs.filterBy);
  const itemsPeerPage = useSelector((state: any) => state.dogs.itemsPeerPage);
  const page = useSelector((state: any) => state.dogs.page);
  const ageMin = useSelector((state: any) => state.dogs.ageMin);
  const ageMax = useSelector((state: any) => state.dogs.ageMax);
  const favorites = useSelector((state: any) => state.dogs.favorites);

  const handlePagination = (e: any) => {
    dispatch(setPage(e));
  };

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const handleFavorite = (dog: any) => {
    let newFavorites = new Set(favorites);
    if (validateFavorites(dog.id)) {
      newFavorites.delete(dog.id);
    } else {
      newFavorites.add(dog.id);
    }
    const arrayFavorites = Array.from(newFavorites);
    dispatch(setFavorites(arrayFavorites));
  };

  const validateFavorites = (id: string) => {
    return favorites.includes(id);
  };

  useEffect(() => {
    dispatch(setItemsPeerPage(selectedValue));
  }, [dispatch, selectedValue]);

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
      <div className="sticky top-0 w-full flex flex-col md:flex-row items-center justify-between border-b-1 p-2 mb-2">
        <span className="font-bold">{total} Dogs</span>
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex flex-col md:flex-row items-center mr-5">
            <span className="mr-2 hidden md:inline-block">Dogs peer page:</span>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered" className="capitalize">
                  {selectedValue}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Single selection example"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys as any}
              >
                <DropdownItem key="9">9</DropdownItem>
                <DropdownItem key="18">18</DropdownItem>
                <DropdownItem key="27">27</DropdownItem>
                <DropdownItem key="36">36</DropdownItem>
                <DropdownItem key="45">45</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          <Pagination
            size="sm"
            isCompact
            onChange={handlePagination}
            total={Math.ceil(total / itemsPeerPage)}
            initialPage={1}
          />
        </div>
      </div>
      <div className="h-[calc(100vh-200px)] md:h-[calc(100vh-150px)] overflow-auto p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {dataDogs.map((dog: any) => (
            <div key={dog.id}>
              <Card
                isFooterBlurred
                className="w-full md:h-[400px] col-span-6 sm:col-span-5"
              >
                <CardHeader className="absolute z-10 top-1 flex-col items-start drop-shadow">
                  <div className="flex justify-between w-full">
                    <span className="text-white uppercase font-bold drop-shadow-lg">
                      {dog.breed}
                    </span>
                    <Button
                      isIconOnly
                      className="text-default-900 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                      radius="full"
                      variant="light"
                      onPress={() => handleFavorite(dog)}
                    >
                      <HeartIcon
                        className={
                          validateFavorites(dog.id)
                            ? "[&>path]:stroke-transparent"
                            : ""
                        }
                        fill={validateFavorites(dog.id) ? "#EA6A47" : "none"}
                      />
                    </Button>
                  </div>
                  <h4 className=" text-white uppercase font-extrabold text-2xl drop-shadow-lg">
                    {dog.name}
                  </h4>
                </CardHeader>
                <Image
                  removeWrapper
                  alt="Card example background"
                  className="z-0 w-full h-full  -translate-y-6 object-cover"
                  src={dog.img}
                />
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                  <div className="flex justify-center items-center">
                    <div className="text-black font-bold">Age {dog.age}</div>
                    <div className="text-black text-tiny ml-6 font-semibold">
                      Zip Code: {dog.zip_code}
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DogList;
