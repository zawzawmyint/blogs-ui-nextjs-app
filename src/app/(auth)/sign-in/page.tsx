import { auth } from "@/auth";
import { Login } from "@/components/auth/signin/Login";
import BaseContainer from "@/components/global/container/BaseContainer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (session?.user) {
    redirect("/blogs");
  }
  return (
    <BaseContainer>
      <div className="max-w-md mx-auto border-1 p-8 rounded-2xl space-y-2">
        <h1 className="text-3xl font-bold mb-5">Sign in</h1>
        <h1 className="text-sm font-medium mb-5">
          Please Login to your account.
        </h1>
        <Separator className="mb-5" />
        <Login />
        <div className=" text-center mt-4">
          <Button variant={"link"} asChild>
            <Link href={`/sign-up`}>Register</Link>
          </Button>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Page;
