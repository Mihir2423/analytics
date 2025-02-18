import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowUpRight, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <header className="top-0 left-0 fixed flex justify-between items-center p-6 w-full">
        <div className="p-1 border border-r-4 border-b-4 border-black rounded-lg cursor-pointer">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
        </div>
        <Button className="flex justify-center items-center gap-2 w-fit transition-all duration-300 ease-in-out">
          Contact Us <MessageSquare size={18} />
        </Button>
      </header>
      <div className="flex flex-col justify-center items-center gap-2 w-full h-screen">
        <h1 className="font-bold text-black text-5xl">Analytics</h1>
        <p className="font-normal text-gray-500 text-lg text-center">
          A better and easy way to see your website analytics.
        </p>
        <Button asChild>
          <Link
            href="/dashboard"
            className="flex justify-center items-center gap-2 mt-2 w-fit text-lg transition-all duration-300 ease-in-out"
          >
            Get Started <ArrowUpRight size={18} />
          </Link>
        </Button>
      </div>
      <footer className="bottom-0 left-0 fixed flex justify-center pb-4 w-full text-center">
        © 2025 Analytics. All rights reserved.
      </footer>
    </div>
  );
}
