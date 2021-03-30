import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import MyLink from "../utils/MyLink";
import Brand from "./Brand";
import Menu from "./Menu";

const MOBILE_SIZE = 900;

export const navbarLinks = [
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
];

const Navbar = () => {
  const [mobile, setMobile] = useState(false);
  const [active, setActive] = useState(false);
  const [animation, setAnimation] = useState(false);
  const router = useRouter();

  const handleScrollPage = () => {
    if (window.scrollY > 200) {
      setAnimation(false);
      setTimeout(() => {
        setActive(true);
      }, 100);
    } else {
      setAnimation(true);
      setTimeout(() => {
        setActive(false);
      }, 100);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollPage);
    return () => {
      window.removeEventListener("scroll", handleScrollPage);
    };
  }, []);

  const handleResize = (e) => {
    const { innerWidth } = e.target as Window;
    if (innerWidth > MOBILE_SIZE) setMobile(false);
    else setMobile(true);
  };

  useEffect(() => {
    if (window.innerWidth < MOBILE_SIZE) setMobile(true);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      onScroll={(e) => {
        console.log(e);
      }}
      className={`px-12 lg:px-40 py-4 flex items-center transition-colors duration-500 ${
        mobile ? "justify-between" : null
      } ${active ? "sticky top-0  bg-white nav-active" : null} ${
        animation ? "nav-deactive" : null
      }`}
      id="nav"
    >
      <Brand />
      {mobile ? (
        <Menu />
      ) : (
        <div className="px-8 w-full flex items-center justify-around">
          <div className="flex justify-end space-x-4 w-2/3">
            {navbarLinks.map((link) => (
              <MyLink key={`nav-link-${link.text}`} href={link.to} scroll>
                <span
                  className={`font-semibold text-lg ${
                    router.asPath.substring(1) === link.to
                      ? "border-b-2 rounded-sm border-purple-400"
                      : null
                  }`}
                >
                  {link.text}
                </span>
              </MyLink>
            ))}
          </div>
          <div className="w-1/2 flex justify-end">
            <MyLink href="login">
              <Button borderRadius="lg" type="button" variant="solid">
                Sign in
              </Button>
            </MyLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
