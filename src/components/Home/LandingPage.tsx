import React, { useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Section1 from "./Section-1";

interface Props {}

const LandingPage = (props: Props) => {
  return (
    <div className="min-h-screen bg-wheat">
      <div style={{ maxWidth: 1368 }} className="mx-auto">
        <Navbar />
        <div className="flex flex-col space-y-56">
          <Section1 />

          <section className="bg-secondary-200 w-full h-64">sadasfs</section>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
