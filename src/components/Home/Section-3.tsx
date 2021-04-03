import React from "react";
import { HomeSectionProps } from "./LandingPage";

const Section3: React.FC<HomeSectionProps> = ({
  paddingClassname,
  extraClassname,
}) => {
  return (
    <section id="discover" className={`bg-white ${extraClassname}`}>
      <header>
        <h1 className="text-gray-950 font-bold text-4xl mb-4 md:text-5xl text-center">
          Work happens faster in channels
        </h1>
      </header>
      <div className="mx-auto h-1/2  w-3/4">
        <img
          src="https://a.slack-edge.com/9b527/marketing/img/homepage/hp-prospect/channels/image/bring-your-team-together-in-channels.jpg"
          alt="channel pic"
        />
      </div>
    </section>
  );
};

export default Section3;
