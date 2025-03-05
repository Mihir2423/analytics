import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/config/faq";
import AnimationContainer from "@/components/globals/animation-container";
import Wrapper from "@/components/globals/wrapper";
import SectionBadge from "@/components/ui/section-badge";
import React from "react";

const FAQ = () => {
  return (
    <Wrapper className="py-20 lg:py-32">
      <div className="flex flex-col items-center gap-4 text-center">
        <AnimationContainer animation="fadeUp" delay={0.2}>
          <SectionBadge title="FAQ" />
        </AnimationContainer>

        <AnimationContainer animation="fadeUp" delay={0.3}>
          <h2 className="bg-clip-text bg-gradient-to-b from-white to-neutral-400 font-medium text-transparent text-2xl md:text-4xl lg:text-5xl">
            Questions? <br /> {"We've"} got{" "}
            <span className="ml-2 font-subheading italic">answers.</span>
          </h2>
        </AnimationContainer>

        <AnimationContainer animation="fadeUp" delay={0.4}>
          <p className="mx-auto max-w-xl text-muted-foreground text-sm md:text-base lg:text-lg">
            Find answers to common questions about how our platform helps you
            analyze SEO data.
          </p>
        </AnimationContainer>
      </div>

      <div className="mx-auto pt-10 max-w-3xl">
        <Accordion type="single" collapsible className="space-y-4 w-full">
          {FAQS.map((item, index) => (
            <AnimationContainer
              key={index}
              animation="fadeUp"
              delay={0.5 + index * 0.1}
            >
              <AccordionItem
                value={`item-${index}`}
                className="bg-[#191919] px-6 border-none rounded-2xl"
              >
                <AccordionTrigger className="py-6 font-normal text-white text-base md:text-lg text-left hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#c1c1c1] text-left">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </AnimationContainer>
          ))}
        </Accordion>
      </div>
    </Wrapper>
  );
};

export default FAQ;
