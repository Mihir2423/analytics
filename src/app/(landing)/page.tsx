import React from "react";
import Hero from "./_components/hero";

const HomePage = () => {
  return (
    <div className="relative flex flex-col w-full overflow-x-hidden">
      <div
        className="top-0 left-0 z-[10] absolute w-full h-[200px] rotate-[180deg]"
        style={{
          maskImage: "linear-gradient(transparent, black 85%)",
          backgroundColor: "#c05d5d65",
        }}
      />
      <section className="w-full">
        <Hero />
      </section>
    </div>
  );
};

export default HomePage;
