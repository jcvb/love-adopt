import { NextUIProvider } from "@nextui-org/react";
import AuthService from "../../services/auth.service";

const AuthLayout = () => {
  AuthService.login("John", "email@example.com").then((response) => {
    console.log("response: ", response);
  });
  return (
    <>
      <NextUIProvider>Auth Layout</NextUIProvider>
    </>
  );
};

export default AuthLayout;
