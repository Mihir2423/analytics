export function TailwindIndicator() {
  // Don't show in production
  if (process.env.NODE_ENV === "production") return null;
  return (
    <div className="right-[18px] bottom-[18px] z-[99999] fixed flex justify-center items-center bg-gray-800 rounded-full w-[28px] h-7 font-mono text-white text-xs">
      <div className="sm:hidden block m-0 p-0">xs</div>
      <div className="hidden md:hidden sm:block m-0 p-0">sm</div>
      <div className="hidden lg:hidden md:block m-0 p-0">md</div>
      <div className="hidden xl:hidden lg:block m-0 p-0">lg</div>
      <div className="hidden 2xl:hidden xl:block m-0 p-0">xl</div>
      <div className="hidden 2xl:block m-0 p-0">2xl</div>
    </div>
  );
}
