import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/authSlice";

import { Spacer, Button, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { useEffect } from "react";

const AuthForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(login())
      .then(() => {
        if (isAuthenticated) {
          console.log(isAuthenticated);
          navigate("/dashboard");
        }
      })
      .catch((error: any) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Spacer y={5} />
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
    </>
  );
};

export default AuthForm;
