import React from "react";
import { logout } from "../../store/authSlice";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Image,
  Button,
} from "@nextui-org/react";
import LogoLoveAdopt from "../../assets/images/logo-love-adopt.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then((result) => {
        if (result === 200) {
          navigate("/login");
        }
      })
      .catch((error: any) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="flex w-full md:max-w-screen-xl mx-auto">
        <Navbar
          maxWidth="full"
          isBlurred={true}
          className="drop-shadow bg-white"
        >
          <NavbarBrand>
            <Image width={250} alt="Logo Love Adopt" src={LogoLoveAdopt} />
          </NavbarBrand>
          <NavbarContent justify="end">
            <NavbarItem>
              <Button
                onClick={() => handleLogout()}
                color="primary"
                variant="flat"
              >
                Logout
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
