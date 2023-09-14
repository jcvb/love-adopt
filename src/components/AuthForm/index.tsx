import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/authSlice";

import { Spacer, Button, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import React, { useState } from "react";

const AuthForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  const handleLogin = (event: any) => {
    event.preventDefault();
    dispatch(login({name, email})).catch((error: any) => {
      console.error("Error:", error);
    });
  };

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Spacer y={5} />
      <h1 className="w-full text-center font-bold text-xl">Log in</h1>
      <Spacer y={6} />
      <form onSubmit={handleLogin}>
        <div className="flex w-full">
          <Input
            onChange={handleNameChange}
            value={name}
            type="text"
            label="Name"
            isRequired
          />
        </div>
        <Spacer y={5} />
        <div className="flex w-full">
          <Input
            onChange={handleEmailChange}
            value={email}
            type="email"
            label="Email"
            isRequired
          />
        </div>
        <Spacer y={5} />
        <Button
          type="submit"
          className="bg-la-primary w-full uppercase text-white hover:bg-la-primary-dark"
        >
          Log in
        </Button>
      </form>

      <Spacer y={5} />
    </>
  );
};

export default AuthForm;
