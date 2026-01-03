import Heading from "@/app/dashboard/components/heading";
import React from "react";

interface StepDescProps {
  description: string;
  setDescription: (value: string) => void;
}

const StepDesc = ({ description, setDescription }: StepDescProps) => {
  return (
    <div className="w-full flex flex-col items-center space-y-8">
      <Heading
        title="Describe your store"
        description="Share a few words about what you offer to customers."
        className="items-center"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Tell people what makes your store special"
        rows={6}
        className="
            w-full max-w-5xl
          text-2xl font-medium 
          bg-transparent
          
          border py-8 px-7 rounded-2xl outline-none
          resize-none
          placeholder:text-gray-400
          caret-black dark:caret-white
          dark:text-white
          focus:ring-0
        "
      />

      {/* Helper text */}
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-md">
        Example: Fresh bakery items, yoga classes, gaming zones, repairs, or
        professional services.
      </p>
    </div>
  );
};

export default StepDesc;
