import React from "react";
import clsx from "clsx";

interface HeadingProps {
  title: string;
  description?: string;
  className?: string; // ✅ allow extra classes
}

const Heading: React.FC<HeadingProps> = ({ title, description, className }) => {
  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      <h1 className="text-2xl font-semibold">{title}</h1>
      {description && <p className="text-gray-500 text-base">{description}</p>}
    </div>
  );
};

export default Heading;
