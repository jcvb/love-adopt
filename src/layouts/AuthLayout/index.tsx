import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect } from "react";
import {
  Card,
  Spacer,
  Button,
  Input,
  NextUIProvider,
} from "@nextui-org/react";

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
    <NextUIProvider>
      <div>
        <Card>
          <span>Love Adopt</span>
          <div className="flex w-full flex-wrap md:flex-nowrap">
            <Input type="text" label="Name" />
          </div>
          <Spacer y={1} />
          <div className="flex w-full flex-wrap md:flex-nowrap">
            <Input type="email" label="Email" />
          </div>
          <Spacer y={1} />
          <Button
            onClick={() => {
              handleLogin();
            }}
          >
            Sign in
          </Button>
        </Card>
      </div>
    </NextUIProvider>
  );
};

export default AuthLayout;
