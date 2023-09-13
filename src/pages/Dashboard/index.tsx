import { useContext, useEffect } from "react";
import DashboardLayout from "../../layouts/MainLayout";
import DogsService from "../../services/dogs.service";
import {
  DogsBreedsContext,
  DogsSelectedBreedsContext,
} from "../../contexts/DogsContext";
import { Breed } from "../../types/Dogs";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import DogList from "../../components/DogList";

const Dashboard = () => {
  const { setBreeds } = useContext(DogsBreedsContext);
  const { selectedBreeds, setSelectedBreeds } = useContext(DogsSelectedBreedsContext);

  useEffect(() => {
    DogsService.getDogsIds(selectedBreeds.map(breed => breed.name)).then((response: any) => {
      console.log(response);
    });
  }, [selectedBreeds, setSelectedBreeds]);

  useEffect(() => {
    DogsService.breeds().then((response: Array<Breed>) => {
      setBreeds(response);
    });
  }, [setBreeds]);
  return (
    <>
      <DashboardLayout>
        <Header />
        <div className="flex w-full md:max-w-screen-xl mx-auto bg-white">
          <div className="h-[calc(100vh-64px)] sticky top-0 w-64 border-r-1 p-5">
            <Sidebar />
          </div>
          <div className=" h-[calc(100vh-64px)] overflow-auto p-5">
            <DogList />
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
