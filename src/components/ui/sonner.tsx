"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import { X, Check } from "lucide-react";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="group toaster"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#1a1a1a] group-[.toaster]:text-[#ffffff] group-[.toaster]:border-[#333333] group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-[#a0a0a0]",
          actionButton:
            "group-[.toast]:bg-[#0070f3] group-[.toast]:text-[#ffffff] hover:bg-[#0061d6]",
          cancelButton:
            "group-[.toast]:bg-[#333333] group-[.toast]:text-[#a0a0a0] hover:bg-[#444444]",
          success: "group-[.toaster]:border-l-green-500",
          error: "group-[.toaster]:border-l-red-500",
        },
      }}
      icons={{
        success: (
          <div className="flex justify-center items-center bg-green-500 mr-1 rounded-full w-5 h-5">
            <Check className="w-3 h-3 text-black" />
          </div>
        ),
        error: (
          <div className="flex justify-center items-center bg-red-500 mr-1 rounded-full w-5 h-5">
            <X className="w-3 h-3 text-black" />
          </div>
        ),
      }}
      {...props}
    />
  );
};

export { Toaster };
