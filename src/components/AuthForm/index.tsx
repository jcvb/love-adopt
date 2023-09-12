import AuthService from "../../services/auth.service";
import { AuthContext } from "../../contexts/AuthContext";

import { Spacer, Button, Input } from "@nextui-org/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const { setAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = () => {
    AuthService.login("John", "email@example.com")
      .then((response) => {
        setAuthenticated(true);
        navigate("/dashboard");
      })
      .catch((error) => {
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
