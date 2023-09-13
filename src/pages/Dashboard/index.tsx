import React, { useEffect } from "react";
import DashboardLayout from "../../layouts/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBreeds,
  fetchDataDogs,
} from "../../store/dogsSlice";

import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import DogList from "../../components/DogList";
import { AppDispatch } from "../../store/store";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const breeds = useSelector((state: any) => state.dogs.breeds);
  const selectedBreeds = useSelector((state: any) => state.dogs.selectedBreeds);

  useEffect(() => {
    console.log("dash");
    dispatch(fetchBreeds());
  }, [dispatch]);

  useEffect(() => {
    if (selectedBreeds.length) {
      dispatch(fetchDataDogs(selectedBreeds));
    }
  }, [selectedBreeds, dispatch]);
  return (
    <>
      <DashboardLayout>
        TEST
        {/* <Header />
        <div className="flex w-full md:max-w-screen-xl mx-auto bg-white">
          <div className="h-[calc(100vh-64px)] sticky top-0 w-64 border-r-1 p-5">
            <Sidebar />
          </div>
          <div className=" h-[calc(100vh-64px)] overflow-auto p-5">
            <DogList />
          </div>
        </div> */}
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
