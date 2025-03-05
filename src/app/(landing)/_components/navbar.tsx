"use client";

import AnimationContainer from "@/components/globals/animation-container";
import Wrapper from "@/components/globals/wrapper";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="top-0 z-50 absolute inset-x-0 w-full">
      <div
        className={cn(
          "flex bg-transparent self-start items-center justify-between py-4 rounded-full relative z-[50] mx-auto w-full"
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
                Weblytics
              </span>
            </Link>
          </motion.div>

          <AnimationContainer animation="fadeLeft" delay={0.1}>
            <div className="flex items-center gap-x-4">
              <Link
                href="https://github.com/Mihir2423/analytics"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  className="flex items-center gap-2 bg-gradient-to-b from-[#834747] via-[#a05151] to-[#893e3e] px-4 py-1 rounded-md text-white text-sm"
                >
                  <Github size={16} />
                  Star us on GitHub
                </button>
              </Link>
            </div>
          </AnimationContainer>
        </Wrapper>
      </div>
    </header>
  );
};

export default Navbar;
