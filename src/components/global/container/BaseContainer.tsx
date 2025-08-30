import React from "react";

const BaseContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="max-w-7xl mx-auto p-6">{children}</div>;
};

export default BaseContainer;
