import Image from "next/image";
import React from "react";
import Navbar from "./Navbar";
import Section1 from "./Section-1";
import Section2 from "./Section-2";

export interface HomeSectionProps {
  paddingClassname: string;
  extraClassname?: string;
}

const sectionProps = {
  extraClassname: "mt-32",
  paddingClassname: "px-24",
};

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <div style={{ maxWidth: 1368 }} className="mx-auto">
        <Navbar />
        <div>
          <Section1 {...sectionProps} />
          <Section2 {...sectionProps} />
          <section className="h-64 bg-white mt-32">
            <header>
              <h1 className="font-bold text-4xl mb-4 md:text-5xl text-center">
                Work happens faster in channels
              </h1>
              <img
                src="https://a.slack-edge.com/9b527/marketing/img/homepage/hp-prospect/channels/image/bring-your-team-together-in-channels.jpg"
                alt="channel pic"
                height={200}
                width="75%"
                className="mx-auto"
              />
            </header>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
