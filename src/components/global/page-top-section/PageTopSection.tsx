import React from "react";

const PageTopSection = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) => {
  return (
    <section className="flex justify-between items-center gap-4 flex-wrap mb-7">
      <div className="space-y-3">
        <h1 className="font-bold text-2xl ">{title}</h1>
        <p>{description}</p>
      </div>
      {children}
    </section>
  );
};

export default PageTopSection;
