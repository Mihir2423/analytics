import localFont from "next/font/local";

export const satoshi = localFont({
  src: [
    {
      path: "./Satoshi-Black.otf",
      weight: "900",
      style: "black",
    },
    {
      path: "./Satoshi-Bold.otf",
      weight: "700",
      style: "bold",
    },
    {
      path: "./Satoshi-Medium.otf",
      weight: "500",
      style: "medium",
    },
    {
      path: "./Satoshi-Regular.otf",
      weight: "400",
      style: "regular",
    },
    {
      path: "./Satoshi-Light.otf",
      weight: "300",
      style: "light",
    },
  ],
});
