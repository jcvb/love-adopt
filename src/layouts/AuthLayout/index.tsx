import AuthService from "../../services/auth.service";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect } from "react";
import {
  Spacer,
  Button,
  Input,
  NextUIProvider,
  Image,
} from "@nextui-org/react";

import LogoLoveAdopt from "../../assets/images/logo-love-adopt.svg";
import { FaFacebookSquare, FaGoogle } from "react-icons/fa";

const AuthLayout = () => {
  const { setAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    AuthService.login("John", "email@example.com")
      .then((response) => {
        console.log("response: ", response);
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
      });
  }, []);

  const handleLogin = () => {
    setAuthenticated(true);
    navigate("/dashboard");
  };

  return (
    <NextUIProvider className="md:h-screen overflow-auto md:pb-0">
      <div className="flex justify-center items-center p-5">
        <div className="bg-white w-full md:w-110 p-5 md:p-10 drop-shadow rounded-xl">
          <div className="flex justify-center">
            <Image
              width={300}
              alt="Logo Love Adopt"
              src={LogoLoveAdopt}
            />
          </div>

          <Spacer y={1} />
          <h1 className="w-full text-center font-bold text-xl">Log in</h1>
          <Spacer y={6} />
          <div className="flex w-full">
            <Input type="text" label="Name" />
          </div>
          <Spacer y={5} />
          <div className="flex w-full">
            <Input type="email" label="Email" />
          </div>
          <Spacer y={5} />
          <Button
            className="bg-la-primary w-full uppercase text-white hover:bg-la-primary-dark"
            onClick={() => {
              handleLogin();
            }}
          >
            Log in
          </Button>
          <Spacer y={5} />
          <div className="text-center">
            <Link
              className="underline text-la-primary hover:text-la-primary-dark"
              to="/forgot"
            >
              Forgot Password?
            </Link>
          </div>
          <Spacer y={5} />
          <div className="text-center">
            <span className="text-la-gray-dark md:hr-line-title">
              or login in with
            </span>
          </div>
          <Spacer y={5} />
          <div className="flex flex-col justify-around">
            <Button
              className="w-full md:w-40 mb-3 md:mb-0"
              color="primary"
              variant="bordered"
              startContent={<FaFacebookSquare />}
            >
              Facebook
            </Button>
            <Button
              className="w-full md:w-40"
              color="primary"
              variant="bordered"
              startContent={<FaGoogle />}
            >
              Google
            </Button>
          </div>
          <Spacer y={5} />
          <div className="w-full text-center">
            <span>Need an account?</span>
            <Link
              className=" px-2 underline text-la-primary hover:text-la-primary-dark"
              to="/forgot"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </NextUIProvider>
  );
};

export default AuthLayout;
