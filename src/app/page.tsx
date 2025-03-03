"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handleVideoLoaded = () => {
    console.log("Video loaded event triggered");
    setIsVideoLoaded(true);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!isVideoLoaded) {
        console.log("Backup timeout triggered");
        setIsVideoLoaded(true);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [isVideoLoaded]);

  return (
    <div className="relative flex flex-col bg-[#0e0e0e] h-screen overflow-hidden text-white">
      {!isVideoLoaded && (
        <div className="top-0 left-0 z-50 fixed flex justify-center items-center bg-[#0e0e0e] w-full h-full">
          <div className="loader">Loading...</div>
        </div>
      )}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={`top-0 left-0 absolute w-full h-screen object-cover ${isVideoLoaded ? "visible" : "invisible"}`}
        onLoadedMetadata={handleVideoLoaded}
        onCanPlay={handleVideoLoaded}
        onPlaying={handleVideoLoaded}
        onLoadedData={handleVideoLoaded}
      >
        <source src="/video/hero-1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <header
        style={{
          background:
            "linear-gradient(90deg, rgba(42,56,105,0.7273503151260504) 18%, rgba(0,0,0,0.7189469537815126) 66%, rgba(0,0,0,0.10830269607843135) 100%)",
        }}
        className={`relative flex justify-between items-center bg-transparent ${isVideoLoaded ? "visible" : "invisible"} backdrop-blur-md mx-auto mt-6 px-6 max-md:px-3 py-4 rounded-2xl w-full max-w-6xl`}
      >
        <div>
          <span className="text-xl">Analytics</span>
        </div>
        <nav className="hidden top-1/2 left-1/2 absolute sm:flex justify-between items-center gap-6 text-sm -translate-x-1/2 -translate-y-1/2">
          <Link href="https://github.com/Mihir2423/mail0">Github</Link>
          <Link href="https://x.com/mihir___dev">Twitter</Link>
          <Link href="https://mihircodes.in">Contact</Link>
        </nav>
      </header>
      <div
        className={`relative flex flex-1 items-center mx-auto max-w-6xl translate-y-[-80px] ${isVideoLoaded ? "visible" : "invisible"}`}
      >
        <div className="z-[2] relative flex flex-col gap-3 px-6 w-1/2 max-md:w-full">
          <h1 className="font-medium text-[56px] max-md:text-[32px] leading-[60px] max-md:leading-[36px]">
            Your open source analytics platform
          </h1>
          <p className="text-[#9B9B9B] text-[20px] max-md:text-[16px]">
            Connect and take control of your projects with an analytics section
            to get live insights of your project, metadata, page visits and many
            more.
          </p>
          <Button
            asChild
            className="relative flex justify-center items-center bg-white hover:bg-white mt-3 px-2 py-1 rounded-lg w-fit overflow-hidden text-black"
          >
            <Link
              href="/projects"
              className="flex justify-center items-center gap-2 w-fit text-lg transition-all duration-300 ease-in-out"
            >
              Get Started <ArrowUpRight size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
