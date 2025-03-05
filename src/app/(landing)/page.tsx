import React from "react";
import Hero from "./_components/hero";

const HomePage = () => {
  return (
    <div className="relative flex flex-col w-full overflow-x-hidden">
      <section className="w-full">
        <Hero />
      </section>
    </div>
  );
};

export default HomePage;
