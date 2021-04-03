import React from "react";
import { HomeSectionProps } from "./LandingPage";
import Button from "../Button";

const Section4: React.FC<HomeSectionProps> = ({ extraClassname }) => {
  return (
    <section
      id="getstarted"
      className={`home-get-started bg-primary-200 h-64 flex flex-col items-center justify-center ${extraClassname}`}
    >
      <header className="px-4 mx-auto">
        <h1 className="text-3xl md:text-5xl text-white font-bold">
          Choose a better way to work
        </h1>
      </header>
      <Button
        arrow
        type="button"
        borderRadius="sm"
        extraClassName="mt-6 ml-1"
        variant="white"
      >
        Get started
      </Button>
    </section>
  );
};

export default Section4;
