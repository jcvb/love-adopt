import { Link } from "react-router-dom";

import { Spacer, Button, Image } from "@nextui-org/react";

import LogoLoveAdopt from "../../assets/images/logo-love-adopt.svg";
import { FaFacebookSquare, FaGoogle } from "react-icons/fa";
import AuthForm from "../../components/AuthForm";
import AuthLayout from "../../layouts/AuthLayout";

const Auth = () => {
  return (
    <>
      <AuthLayout>
        <div className="flex justify-center items-center p-5">
          <div className="bg-white w-full md:w-110 p-5 md:p-10 drop-shadow rounded-xl">
            <div className="flex justify-center">
              <Image width={300} alt="Logo Love Adopt" src={LogoLoveAdopt} />
            </div>
            <AuthForm />
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
            <div className="flex flex-col md:flex-row justify-around">
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
                to="/register"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};

export default Auth;
