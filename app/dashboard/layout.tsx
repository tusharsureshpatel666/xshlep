import { ReactNode } from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashNav from "./components/DashNav";
import { LocationProvider } from "./store/[id]/components/LoactionProvider";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <div>
      <DashNav />

      <div className="max-w-7xl px-5 py-4 min-h-[90vh]  flex justify-center items-center mx-auto ">
        {children}
      </div>
    </div>
  );
}
