import React, { useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Section1 from "./Section-1";
import Section2 from "./Section-2";

export interface HomeSectionProps {
  paddingClassname: string;
}

const LandingPage = () => {
  const paddingClassname = "px-24";

  return (
    <div className="min-h-screen bg-wheat">
      <div style={{ maxWidth: 1368 }} className="mx-auto">
        <Navbar />
        <div className="flex flex-col space-y-56">
          <Section1 paddingClassname={paddingClassname} />
          <Section2 paddingClassname={paddingClassname} />
          <section className="h-64 w-full bg-red-500"></section>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
