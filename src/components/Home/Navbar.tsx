import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import MyLink from "../utils/MyLink";
import Brand from "./Brand";
import Menu from "./Menu";
import content from "./content";

const MOBILE_SIZE = 900;

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
      className={`px-12 lg:px-40 py-4 z-20  transition-colors duration-500 ${
        active
          ? "sticky top-0 bg-wheat 2xl:rounded-bl-md 2xl:rounded-br-md animate-nav-active"
          : null
      } ${animation ? "animate-nav-deactive" : null}`}
      id="nav"
    >
      <div
        className={`flex mx-auto w-full max-w-screen-2xl  items-center ${
          mobile ? "justify-between" : null
        }  `}
      >
        <Brand />
        {mobile ? (
          <Menu />
        ) : (
          <div className="px-8 w-full flex items-center justify-around">
            <div className="flex justify-end space-x-4 w-2/3">
              {content.navbar.map((link) => (
                <MyLink key={`nav-link-${link.text}`} href={link.to} scroll>
                  <span
                    className={`font-semibold text-lg rounded-sm border-b-2 ${
                      router.asPath.substring(1) === link.to
                        ? "border-primary-100"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    {link.text}
                  </span>
                </MyLink>
              ))}
            </div>
            <div className="w-1/2 flex justify-end">
              <MyLink href="login">
                <Button
                  borderRadius="sm"
                  height="45px"
                  type="button"
                  variant="outlinePrimary"
                >
                  Sign in
                </Button>
              </MyLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
