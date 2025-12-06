import React from "react";

interface HeadingProps {
  title: string;
  description?: string; // optional
}

const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold">{title}</h1>
      {description && <p className="text-gray-500 text-base">{description}</p>}
    </div>
  );
};

export default Heading;
