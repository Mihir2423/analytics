import { Features } from "@/config/features";
import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";
import AnimationContainer from "@/components/globals/animation-container";
import Wrapper from "@/components/globals/wrapper";
import SectionBadge from "@/components/ui/section-badge";

const FeaturesSection = () => {
  return (
    <Wrapper className="relative py-20 lg:py-32">
      <div className="flex flex-col items-center gap-4 text-center">
        <AnimationContainer animation="fadeUp" delay={0.2}>
          <SectionBadge title="Features" />
        </AnimationContainer>

        <AnimationContainer animation="fadeUp" delay={0.3}>
          <h2 className="bg-clip-text bg-gradient-to-b from-[#ffffff] to-neutral-400 font-medium text-transparent text-2xl md:text-4xl lg:text-5xl !leading-tight">
            Unlock Data-Driven Insights
            <br />
            with Cutting-Edge
            <span className="ml-2 font-subheading italic">Analytic</span>
          </h2>
        </AnimationContainer>

        <AnimationContainer animation="fadeUp" delay={0.4}>
          <p className="mx-auto max-w-2xl text-muted-foreground text-sm md:text-base lg:text-lg">
            Track user behavior, monitor key metrics, and optimize performance
            effortlessly with real-time analytics.
          </p>
        </AnimationContainer>
      </div>

      <div className="relative pt-10">
        <div className="hidden lg:block top-1/2 left-1/2 z-10 absolute w-full h-full -translate-x-1/2 -translate-y-1/2">
          <AnimationContainer animation="scaleUp" delay={0.5}>
            <Image
              src="/images/grid-lines.svg"
              alt="Plus"
              width={32}
              height={32}
              className="size-full"
            />
          </AnimationContainer>
        </div>

        <div className="z-20 relative grid grid-cols-2">
          {Features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center p-2 md:p-16",
                index % 2 === 0 ? "justify-end" : "justify-start",
              )}
            >
              <AnimationContainer
                animation={index % 2 === 0 ? "fadeRight" : "fadeLeft"}
                delay={0.2 * (index + 1)}
              >
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="flex justify-center items-center bg-neutral-900 rounded-lg lg:rounded-2xl size-12 lg:size-16">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={1024}
                      height={1024}
                      className="size-8 lg:size-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-white text-lg md:text-xl">
                      {feature.title}
                    </h3>
                    <p className="max-w-[250px] text-muted-foreground text-xs md:text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </AnimationContainer>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default FeaturesSection;
