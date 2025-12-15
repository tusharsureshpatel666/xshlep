import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth();
  console.log(session?.user?.id);

  return <div>{JSON.stringify(session)}</div>;
}
