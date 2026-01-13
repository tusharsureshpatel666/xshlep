"use client";

import FormSetup from "./components/formsetup/FormSetup";
import SearchBox from "./components/Main";

export default function Dashboard() {
  return (
    <div>
      <SearchBox />
      <FormSetup />
    </div>
  );
}
