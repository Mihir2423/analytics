import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Sidebar } from "./sidebar";

export const Navbar = () => {
  return (
    <nav className="top-0 left-0 z-[3] fixed flex justify-between items-center bg-black backdrop-blur-md px-6 pt-3 pb-3 border-gray-800 border-b w-full">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.svg" width={28} height={28} alt="Logo" />
        <span className="bg-clip-text bg-gradient-to-r from-white to-neutral-500 font-medium text-transparent text-xl">
          Weblytics
        </span>
      </Link>
      <div className="flex items-center gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              className="md:hidden bg-[#C05D5D] hover:bg-[#c05d5dcb] text-gray-300"
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
