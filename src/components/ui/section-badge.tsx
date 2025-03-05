import React from "react";

interface Props {
  title: string;
}

const SectionBadge = ({ title }: Props) => {
  return (
    <div className="flex justify-center items-center gap-2 bg-neutral-800 px-2.5 py-1 rounded-full">
      <div className="relative flex justify-center items-center bg-primary/40 rounded-full w-1.5 h-1.5">
        <div className="flex justify-center items-center bg-primary/60 rounded-full w-2 h-2 animate-ping">
          <div className="flex justify-center items-center bg-primary/60 rounded-full w-2 h-2 animate-ping"></div>
        </div>
        <div className="top-1/2 left-1/2 absolute flex justify-center items-center bg-primary rounded-full w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      <span className="bg-clip-text bg-gradient-to-r from-primary to-orange-300 font-medium text-transparent text-xs">
        {title}
      </span>
    </div>
  );
};

export default SectionBadge;
