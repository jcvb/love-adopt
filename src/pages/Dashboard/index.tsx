import { useEffect } from "react";
import DashboardLayout from "../../layouts/MainLayout";
import DogsService from "../../services/dogs.service";

const Dashboard = () => {
  useEffect(() => {
    DogsService.breeds().then(response => {
      console.log(response);
    })
  }, []);
  return (
    <>
      <DashboardLayout>TEST</DashboardLayout>
    </>
  );
};

export default Dashboard;
