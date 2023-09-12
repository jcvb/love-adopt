import { NextUIProvider } from "@nextui-org/react";
import React from "react";

type Props = {
  children: string | React.JSX.Element | React.JSX.Element[] 
}

const DashboardLayout = ({children} : Props) => {
  return (
    <NextUIProvider className="md:h-screen overflow-auto md:pb-0">
      {children}
    </NextUIProvider>
  );
};

export default DashboardLayout;
