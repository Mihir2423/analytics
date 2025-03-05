"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/config/nav";
import { useClickOutside } from "@/hooks/use-click-outside";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { MenuIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { RefObject, useRef, useState } from "react";
import AnimationContainer from "@/components/globals/animation-container";
import Wrapper from "@/components/globals/wrapper";

const Navbar = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState<boolean>(false);

  const mobileMenuRef = useClickOutside(() => {
    if (open) setOpen(false);
  });

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
          "hidden lg:flex bg-transparent self-start items-center justify-between py-4 rounded-full relative z-[50] mx-auto w-full backdrop-blur",
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
              {/* <Icons.logo className="-mt-1 w-max h-6" /> */}
            </Link>
          </motion.div>

          <div className="hidden absolute inset-0 lg:flex flex-row flex-1 justify-center items-center gap-x-2 mx-auto w-max font-medium text-muted-foreground text-sm">
            <AnimatePresence>
              {NAV_LINKS.map((link, index) => (
                <AnimationContainer
                  key={index}
                  animation="fadeDown"
                  delay={0.1 * index}
                >
                  <div className="relative">
                    <Link
                      href={link.link}
                      className="hover:bg-accent px-4 py-2 rounded-md hover:text-foreground transition-all duration-500"
                    >
                      {link.name}
                    </Link>
                  </div>
                </AnimationContainer>
              ))}
            </AnimatePresence>
          </div>

          <AnimationContainer animation="fadeLeft" delay={0.1}>
            <div className="flex items-center gap-x-4">
              <Link href="/projects">
                <Button size="sm">Get started</Button>
              </Link>
            </div>
          </AnimationContainer>
        </Wrapper>
      </motion.div>

      {/* Mobile */}
      <motion.div
        animate={{
          y: visible ? 20 : 0,
          borderTopLeftRadius: open ? "0.75rem" : "2rem",
          borderTopRightRadius: open ? "0.75rem" : "2rem",
          borderBottomLeftRadius: open ? "0" : "2rem",
          borderBottomRightRadius: open ? "0" : "2rem",
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 50,
        }}
        className={cn(
          "flex relative flex-col lg:hidden w-full justify-between items-center mx-auto py-4 z-50",
          visible && "bg-neutral-950 w-11/12 border",
          open && "border-transparent"
        )}
      >
        <Wrapper className="flex justify-between items-center lg:px-4">
          <div className="flex justify-between items-center gap-x-4 w-full">
            <AnimationContainer animation="fadeRight" delay={0.1}>
              <Link href="/">{/* <Icons.icon className="w-max h-6" /> */}</Link>
            </AnimationContainer>

            <AnimationContainer animation="fadeLeft" delay={0.1}>
              <div className="flex justify-center items-center gap-x-4">
                <Button size="sm">
                  <Link href="/signup" className="flex items-center">
                    Get started
                  </Link>
                </Button>
                {open ? (
                  <XIcon
                    className="text-black dark:text-white"
                    onClick={() => setOpen(!open)}
                  />
                ) : (
                  <MenuIcon
                    className="text-black dark:text-white"
                    onClick={() => setOpen(!open)}
                  />
                )}
              </div>
            </AnimationContainer>
          </div>
        </Wrapper>

        <AnimatePresence>
          {open && (
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="top-16 z-50 absolute inset-x-0 flex flex-col justify-start items-start gap-2 bg-neutral-950 shadow-neutral-950 shadow-xl px-4 py-8 rounded-b-xl w-full"
            >
              {NAV_LINKS.map((navItem, idx: number) => (
                <AnimationContainer
                  key={`link=${idx}`}
                  animation="fadeRight"
                  delay={0.1 * (idx + 1)}
                  className="w-full"
                >
                  <Link
                    href={navItem.link}
                    onClick={() => setOpen(false)}
                    className="relative hover:bg-neutral-800 px-4 py-2 rounded-lg w-full text-neutral-300"
                  >
                    <motion.span>{navItem.name}</motion.span>
                  </Link>
                </AnimationContainer>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
};

export default Navbar;
