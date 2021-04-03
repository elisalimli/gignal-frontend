/* eslint-disable react/no-array-index-key */
import React from "react";
import CustomDivider from "./CustomDivider";
import MyLink from "../utils/MyLink";
import content from "./content";

interface Props {}

const Footer = (props: Props) => {
  return (
    <footer
      style={{ background: "rgb(23, 23, 23)" }}
      className="py-16 px-20 mt-8 text-white flex justify-around flex-col md:flex-row space-y-16 md:space-y-0 "
    >
      <div>
        <MyLink href="/">
          <div className="font-semibold text-2xl mb-2 flex">
            <span>Gignal</span>

            <CustomDivider />
          </div>
        </MyLink>
        <p className="text-base font-medium">
          Welcome to Gignal! Join us to communicate fast and easy.
        </p>
      </div>
      <div>
        <div className="font-semibold text-2xl flex mb-2">
          Quick Links
          <CustomDivider />
        </div>
        <div className="flex flex-col">
          {content.footer.map((item, index) => (
            <MyLink key={`footer-link-${index}`} href={item.href}>
              <span className="text-gray-400 hover:underline">{item.text}</span>
            </MyLink>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
