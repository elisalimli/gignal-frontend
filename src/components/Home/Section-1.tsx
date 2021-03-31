import React from "react";
import ChatSvg from "../../assets/ChatSvg";
import Button from "../Button";

interface Props {}

const Section = (props: Props) => {
  return (
    <section className="mt-16" id="about">
      <div className="md:px-16">
        <div className="flex justify-between items-center flex-col lg:flex-row">
          <div className="w-3/4 md:w-full xl:w-2/3">
            <h1 className="fo nt-bold text-3xl md:text-5xl">
              This is your moment. Let’s reinvent work.
            </h1>
            <p className="font-semibold text-lg md:text-xl mt-2">
              The past year proved we can redefine the way we work. Let’s build
              a more connected, inclusive and flexible future together.
            </p>
            <Button
              arrow
              type="button"
              borderRadius="sm"
              extraClassName="mt-6 ml-1"
              variant="primary"
            >
              Get started
            </Button>
          </div>
          <div className="mt-8 md:mt-0">
            <ChatSvg />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
