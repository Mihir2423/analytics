import React from "react";

type Props = {
  children: React.ReactNode;
};

export const ComponentWrapper = ({ children }: Props) => {
  return (
    <div className="bg-[#101011] max-md:mt-16 pb-5 border border-[#27282D] rounded-md md:h-[calc(100vh-16px)] min-h-[calc(100vh-84px)] md:overflow-y-scroll">
      {children}
    </div>
  );
};
