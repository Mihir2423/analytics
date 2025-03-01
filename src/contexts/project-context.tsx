"use client";

import React, { createContext, useContext } from "react";

type ProjectContextType = {
  favIcon: string;
  setFavIcon: (favIcon: string) => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favIcon, setFavIconState] = React.useState<string>("");

  const setFavIcon = (favIcon: string) => {
    setFavIconState(favIcon);
  };

  return (
    <ProjectContext.Provider value={{ favIcon, setFavIcon }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};
