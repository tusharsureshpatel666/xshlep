import Heading from "@/app/dashboard/components/heading";
import React from "react";

interface PeopleDescProps {
  partnerDescription: string;
  setPartnerDescription: (value: string) => void;
}

const PeopleDesc = ({
  partnerDescription,
  setPartnerDescription,
}: PeopleDescProps) => {
  return (
    <div className="w-full flex flex-col items-center space-y-8">
      <Heading
        title="Describe your ideal store partner"
        description="Tell us who you’re looking to share your store with."
      />

      <textarea
        value={partnerDescription}
        onChange={(e) => setPartnerDescription(e.target.value)}
        placeholder="Describe the kind of partner you want"
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

      {/* Helper examples */}
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-md">
        Example: Looking for a bakery partner, yoga instructor, gaming setup,
        repair service, or any compatible business.
      </p>
    </div>
  );
};

export default PeopleDesc;
