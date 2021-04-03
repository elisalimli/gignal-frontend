/* eslint-disable react/no-array-index-key */
import React from "react";
import FastIcon from "../icons/FastIcon";
import Container from "./Container";
import { HomeSectionProps } from "./LandingPage";
import content from "./content";

const Section2: React.FC<HomeSectionProps> = ({
  paddingClassname,
  extraClassname,
}) => {
  return (
    <section
      id="services"
      className={`bg-secondary-200 text-white w-full mt-16 px-4 md:${paddingClassname} ${extraClassname} py-20`}
    >
      <Container>
        <header className="mb-8 px-2 md:px-0">
          <h2 className="text-secondary-100 font-bold text-2xl">Why Gignal</h2>
          <h1 className="font-bold text-4xl md:w-3/4">
            An app for chat with people realtime
          </h1>
        </header>
        <div className="w-full h-96 grid grid-cols-1 smormd:grid-cols-2 lg:grid-cols-4 gap-12">
          {content.features.map((item, index) => (
            <div key={`home-features-${index}`} className="smormd:mx-auto">
              <div className="mb-2">{item.icon}</div>
              <div className="pl-1">
                <h1 className="tracking-wide font-semibold mb-1">
                  <span className="title-line inline-block bg-secondary-100" />
                  {item.header}
                </h1>
                <div className="w-full text-gray-500">{item.text}</div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Section2;
