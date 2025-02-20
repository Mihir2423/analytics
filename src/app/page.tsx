import FlashlightWrapper from "@/components/globals/flashlight-wrapper";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-col bg-[#0e0e0e] h-screen overflow-hidden text-white">
      <video
        autoPlay
        muted
        loop
        className="top-0 left-0 absolute w-full h-screen object-cover"
      >
        <source src="/video/hero-1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <header
        style={{
          background:
            "linear-gradient(90deg, rgba(42,56,105,0.7273503151260504) 18%, rgba(0,0,0,0.7189469537815126) 66%, rgba(0,0,0,0.10830269607843135) 100%)",
        }}
        className="relative flex justify-between items-center bg-transparent backdrop-blur-md mx-auto mt-6 px-6 max-md:px-3 py-4 rounded-2xl w-full max-w-6xl"
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
      <div className="relative flex flex-1 items-center mx-auto max-w-6xl translate-y-[-80px]">
        <div className="top-1/2 left-0 absolute w-[500px] h-[500px] -translate-y-1/2">
          <FlashlightWrapper>
            <Image
              src="/bg/hero.png"
              alt="Mail0"
              width={1200}
              height={700}
              className="w-full h-full object-cover"
            />
          </FlashlightWrapper>
        </div>
        <div className="z-[2] relative flex flex-col gap-3 w-1/2">
          <h1 className="font-medium text-[56px] leading-[60px]">
            Your open source analytics platform
          </h1>
          <p className="text-[#9B9B9B] text-[20px]">
            Connect and take control of your projects with an anlytics section
            to get live insights of your project, metadata, page visits and many
            more.
          </p>
          <Button
            asChild
            className="relative flex justify-center items-center bg-white hover:bg-white mt-3 px-2 py-1 rounded-lg w-fit overflow-hidden text-black"
          >
            <Link
              href="/dashboard"
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
