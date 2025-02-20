"use client";

import React, { useEffect, useRef } from "react";

const FlashlightWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const flashlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      let mouseX, mouseY;

      if (e instanceof TouchEvent) {
        mouseX = e.touches[0].pageX;
        mouseY = e.touches[0].pageY;
      } else {
        mouseX = e.pageX;
        mouseY = e.pageY;
      }

      if (flashlightRef.current) {
        flashlightRef.current.style.setProperty("--Xpos", `${mouseX}px`);
        flashlightRef.current.style.setProperty("--Ypos", `${mouseY}px`);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleMouseMove);
    };
  }, []);

  return (
    <div id="flashlight" ref={flashlightRef}>
      {children}
    </div>
  );
};

export default FlashlightWrapper;
