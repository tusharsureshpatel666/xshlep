import React from "react";
import Heading from "../components/heading";
import Image from "next/image";
import Findstore from "./Findstore";
import { LocationProvider } from "../store/[id]/components/LoactionProvider";

const page = () => {
  return (
    <div className="w-full">
      <LocationProvider />
      <Findstore />
    </div>
  );
};

export default page;
