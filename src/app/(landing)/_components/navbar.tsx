"use client";

import AnimationContainer from "@/components/globals/animation-container";
import Wrapper from "@/components/globals/wrapper";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
 motion,
 useMotionValueEvent,
 useScroll
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { RefObject, useRef, useState } from "react";

const Navbar = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  const { scrollY } = useScroll({
    target: ref as RefObject<HTMLDivElement>,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <header className="top-0 z-50 fixed inset-x-0 w-full">
      {/* Desktop */}
      <motion.div
        animate={{
          width: visible ? "40%" : "100%",
          y: visible ? 20 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 40,
        }}
        style={{
          minWidth: "800px",
        }}
        className={cn(
          "flex bg-transparent self-start items-center justify-between py-4 rounded-full relative z-[50] mx-auto w-full",
          visible &&
            "bg-background/60 py-2 border border-t-foreground/20 border-b-foreground/10 border-x-foreground/15 w-full"
        )}
      >
        <Wrapper className="flex justify-between items-center lg:px-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.svg" width={28} height={28} alt="Logo" />
              <span className="bg-clip-text bg-gradient-to-r from-white to-neutral-500 font-medium text-transparent text-xl">
                Analytics
              </span>
            </Link>
          </motion.div>

          <AnimationContainer animation="fadeLeft" delay={0.1}>
            <div className="flex items-center gap-x-4">
              <Link href="/projects">
                <Button size="sm" className="bg-[#C05D5D]">
                  Get started
                </Button>
              </Link>
            </div>
          </AnimationContainer>
        </Wrapper>
      </motion.div>
    </header>
  );
};

export default Navbar;
