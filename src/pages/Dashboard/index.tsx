import React, { useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { fetchBreeds, fetchDataDogs } from "../../store/dogsSlice";

import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import DogList from "../../components/DogList";
import { AppDispatch } from "../../store/store";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedBreeds = useSelector((state: any) => state.dogs.selectedBreeds);
  const orderBy = useSelector((state: any) => state.dogs.orderBy);
  const filterBy = useSelector((state: any) => state.dogs.filterBy);
  const itemsPeerPage = useSelector((state: any) => state.dogs.itemsPeerPage);
  const page = useSelector((state: any) => state.dogs.page);
  const ageMin = useSelector((state: any) => state.dogs.ageMin);
  const ageMax = useSelector((state: any) => state.dogs.ageMax);
  const zipCode = useSelector((state: any) => state.dogs.zipCode);

  useEffect(() => {
    dispatch(fetchBreeds());
  }, [dispatch]);

  useEffect(() => {
    if (selectedBreeds.length) {
      dispatch(
        fetchDataDogs({
          selectedBreeds: selectedBreeds,
          orderBy: orderBy,
          filterBy: filterBy,
          itemsPeerPage,
          page,
          ageMin,
          ageMax
        })
      );
    }
  }, [ageMax, ageMin, dispatch, filterBy, itemsPeerPage, orderBy, page, selectedBreeds, zipCode]);
  return (
    <>
      <MainLayout>
        <Header />
        <div className="flex w-full md:max-w-screen-xl mx-auto bg-white">
          <div className="h-[calc(100vh-64px)] sticky top-0 w-64 border-r-1 p-5">
            <Sidebar />
          </div>
          <div className="w-full">
            <DogList />
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Dashboard;
