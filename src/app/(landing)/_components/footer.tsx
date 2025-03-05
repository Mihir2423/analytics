import AnimationContainer from "@/components/globals/animation-container";
import React from "react";

const Footer = () => {
  return (
    <AnimationContainer delay={0.5} className="relative mt-12 lg:mt-20 pb-8 w-full">
      <div className="md:flex justify-center md:items-center mt-8 w-full footer">
        <p className="mt-8 md:mt-0 text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Weblytics. All rights reserved.
        </p>
      </div>
    </AnimationContainer>
  );
};

export default Footer;
