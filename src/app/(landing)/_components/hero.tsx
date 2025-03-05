import Image from "next/image";
import Link from "next/link";
import React from "react";
import AnimationContainer from "@/components/globals/animation-container";
import Wrapper from "@/components/globals/wrapper";
import Images from "@/components/globals/images";
import { Button } from "@/components/ui/button";
import Marquee from "@/components/ui/marquee";
import SectionBadge from "@/components/ui/section-badge";

const Hero = () => {
  const companies = [
    Images.comp1,
    Images.comp2,
    Images.comp3,
    Images.comp4,
    Images.comp5,
    Images.comp6,
  ];

  return (
    <Wrapper className="relative flex-1 pt-20 lg:pt-32 w-full h-full min-h-screen">
      <div className="z-[11] flex lg:flex-row flex-col lg:gap-16 w-full h-full">
        <div className="flex flex-col items-start gap-10 py-8 w-full">
          <div className="flex flex-col items-start gap-4">
            <AnimationContainer animation="fadeUp" delay={0.2}>
              <SectionBadge title="Trusted by 10,000+ Users" />
            </AnimationContainer>

            <AnimationContainer animation="fadeUp" delay={0.4}>
              <h1 className="bg-clip-text bg-gradient-to-r from-white to-neutral-500 font-medium text-transparent text-5xl lg:text-6xl !leading-tight">
                {"Unlock Your Website’s Potential"}
              </h1>
            </AnimationContainer>

            <AnimationContainer animation="fadeUp" delay={0.6}>
              <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
                Unlock powerful insights with ease. Track visitor behavior,
                monitor key metrics, and optimize performance effortlessly with
                our intuitive analytics platform.
              </p>
            </AnimationContainer>
          </div>

          <AnimationContainer animation="fadeUp" delay={0.8}>
            <div className="w-full">
              <Link href="/">
                <Button className="bg-[#C05D5D] w-full md:w-auto">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </AnimationContainer>

          <AnimationContainer animation="fadeUp" delay={1}>
            <div className="flex flex-col items-start gap-4 py-4">
              <p className="text-muted-foreground text-sm md:text-base">
                Trusted by Industry Leaders
              </p>
              <div className="relative w-full max-w-[calc(100vw-2rem)] lg:max-w-lg">
                <Marquee className="select-none [--duration:40s] [--gap:2rem]">
                  {[...Array(10)].map((_, index) => (
                    <div
                      key={index}
                      className="flex justify-center items-center h-16 text-muted-foreground"
                    >
                      {companies[index % companies.length]({
                        className: "w-auto h-5",
                      })}
                    </div>
                  ))}
                </Marquee>
                <div className="-right-1 z-40 absolute inset-y-0 bg-gradient-to-l from-[#101010] w-1/3 pointer-events-none"></div>
                <div className="-left-1 z-40 absolute inset-y-0 bg-gradient-to-r from-[#101010] w-1/3 pointer-events-none"></div>
              </div>
            </div>
          </AnimationContainer>
        </div>

        <AnimationContainer
          animation="fadeRight"
          delay={0.4}
          className="z-[12]"
        >
          <div className="relative flex flex-col justify-start items-start w-full h-min overflow-visible">
            <div className="relative w-full lg:w-[1024px] lg:h-[auto,760px] lg:aspect-[1.3884514435695539/1]">
              <div className="hidden lg:block right-1/4 z-50 absolute inset-y-0 bg-gradient-to-l from-black w-1/3 h-full pointer-events-none"></div>
              <div className="lg:absolute lg:inset-0">
                <Image
                  src="/bg/hero-1.png"
                  alt="hero"
                  sizes="1000px"
                  width={1024}
                  height={1024}
                  className="shadow-[#9b6d6d30] shadow-md border border-[#c05d5d65] rounded-xl lg:rounded-2xl min-w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </AnimationContainer>
      </div>
      <AnimationContainer
        animation="scaleUp"
        delay={1.2}
        className="-top-[8%] left-1/4 z-[10] absolute w-2/3 h-auto"
      >
        <Image
          src="/bg/hero-gradient.svg"
          alt="hero"
          width={1024}
          height={1024}
          className="z-[10] w-full h-auto object-cover"
        />
      </AnimationContainer>
    </Wrapper>
  );
};

export default Hero;
