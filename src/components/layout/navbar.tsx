import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";

export const Navbar = () => {
  return (
    <nav className="top-0 left-0 z-[3] fixed flex justify-between items-center bg-black backdrop-blur-md px-6 pt-6 border-gray-800 border-b w-full">
      <Image src="/logo.png" alt="logo" width={40} height={40} />
      <div className="flex items-center gap-2">
        <Button className="flex justify-center items-center gap-2 bg-gray-900 hover:bg-gray-800 w-fit text-white transition-all duration-300 ease-in-out">
          <span className="max-md:hidden">Contact Us</span>
          <MessageSquare size={18} />
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-gray-800 text-gray-300"
            >
              <Menu size={24} />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-black p-0 border-gray-800 border-r w-64"
          >
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};
