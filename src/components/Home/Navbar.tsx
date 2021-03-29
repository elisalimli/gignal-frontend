import React from "react";
import MyLink from "../utils/MyLink";
import Button from "../Button";

const Navbar = () => {
  return (
    <div className="px-48 py-4 flex items-center" id="nav">
      <h2 className="text-2xl font-bold mr-4">gignal</h2>
      <div className="px-12 w-full flex items-center justify-around">
        <div className="flex justify-end space-x-4 w-1/2">
          {[
            {
              to: "#about",
              text: "About",
            },
            {
              to: "#discover",
              text: "Discover",
            },
            {
              to: "#services",
              text: "Services",
            },
            {
              to: "#signup",
              text: "Sign up",
            },
          ].map((link) => (
            <MyLink href={link.to} scroll>
              <span className="font-semibold text-lg">{link.text}</span>
            </MyLink>
          ))}
        </div>
        <div className="w-1/2 flex justify-end mr-2">
          <Button borderRadius="lg" type="button" variant="solid">
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
