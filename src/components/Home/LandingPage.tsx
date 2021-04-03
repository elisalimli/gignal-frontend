import Image from "next/image";
import React from "react";
import Navbar from "./Navbar";
import Section1 from "./Section-1";
import Section2 from "./Section-2";
import Section3 from "./Section-3";
import Button from "../Button";
import Section4 from "./Section-4";
import Footer from "./Footer";

export interface HomeSectionProps {
  paddingClassname: string;
  extraClassname?: string;
}

const sectionProps = {
  extraClassname: "py-32",
  paddingClassname: "px-24",
};

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      {/* <div className="max-w-screen-2xl mx-auto"> */}
      <Section1 {...sectionProps} />
      <Section2 {...sectionProps} />
      <Section3 {...sectionProps} />
      <Section4 {...sectionProps} />
      {/* </div> */}
      <Footer />
    </div>
  );
};

export default LandingPage;
