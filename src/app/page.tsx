import { auth } from "@/auth";
import BaseContainer from "@/components/global/container/BaseContainer";
import { Button } from "@/components/ui/button";
import { ArrowRightSquare } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <BaseContainer>
      <div className="max-w-5xl mx-auto h-[500px] p-2 flex flex-col justify-center items-center text-center gap-6">
        <h1 className="text-5xl sm:text-8xl font-bold tracking-wide">
          Ignite Your Creative Journey
        </h1>
        <p className="font-medium">
          Discover insights, inspiration, and innovative ideas to fuel your
          writing passion. Join our community of thinkers, storytellers, and
          knowledge seekers.
        </p>
        <Link href={`${session?.user ? "/blogs" : "/sign-in"}`}>
          <Button className="w-30 rounded-4xl cursor-pointer">
            Join <ArrowRightSquare />
          </Button>
        </Link>
      </div>
    </BaseContainer>
  );
}
