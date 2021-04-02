import React from "react";
import { HomeSectionProps } from "./LandingPage";

const Section2: React.FC<HomeSectionProps> = ({
  paddingClassname,
  extraClassname,
}) => {
  return (
    <section
      className={`bg-secondary-200 text-white w-full px-4 md:${paddingClassname} ${extraClassname} py-20`}
    >
      <header className="mb-8 px-2 md:px-0">
        <h2 className="text-secondary-100 font-bold text-2xl">Why Gignal</h2>
        <h1 className="font-bold text-4xl md:w-3/4">
          An app for chat with people realtime
        </h1>
      </header>
      <div className="w-full h-96 grid grid-cols-1 smormd:grid-cols-2 lg:grid-cols-4 gap-12">
        {[
          {
            header: "Close to the metal",
            text:
              "We offer client and server libraries in everything from React and PHP to .NET and iOS.",
          },
          {
            header: "Close to the metal",
            text:
              "We offer client and server libraries in everything from React and PHP to .NET and iOS.",
          },
          {
            header: "Close to the metal",
            text:
              "We offer client and server libraries in everything from React and PHP to .NET and iOS.",
          },
          {
            header: "Close to the metal",
            text:
              "We offer client and server libraries in everything from React and PHP to .NET and iOS.",
          },
        ].map((item) => (
          <div className="smormd:mx-auto">
            <div className="mb-2">
              <svg
                className="w-12 h-12 text-secondary-100"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
                />
              </svg>
            </div>
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
    </section>
  );
};

export default Section2;
