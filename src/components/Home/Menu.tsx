import React, { useState } from "react";
import MenuIcon from "../icons/MenuIcon";
import MyIcon from "../utils/MyIcon";
import CloseIcon from "../icons/CloseIcon";
import Brand from "./Brand";
import { navbarLinks } from "./Navbar";
import MyLink from "../utils/MyLink";

interface Props {}

const Menu = (props: Props) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(!open);
  return (
    <div>
      <MyIcon onClick={handleClick} borderRadius="full" className="home-icon">
        <MenuIcon />
      </MyIcon>
      <div
        style={{ left: open ? 0 : "100%" }}
        className="fixed min-h-screen min-w-full  transition-all duration-700 top-0  bg-white p-6"
      >
        <div className="overflow-y-auto">
          <div className="flex justify-between">
            <Brand />
            <MyIcon
              onClick={handleClick}
              borderRadius="full"
              className="home-icon"
            >
              <CloseIcon />
            </MyIcon>
          </div>
          <div className="flex flex-col space-y-4 mt-8">
            {navbarLinks.map((link) => (
              <button
                key={`nav-menu-link-${link.text}`}
                type="button"
                className="flex justify-start"
                onClick={handleClick}
              >
                <MyLink href={link.to} scroll>
                  <span className="font-semibold text-lg border-b-2 rounded-sm hover:border-purple-400">
                    {link.text}
                  </span>
                </MyLink>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
