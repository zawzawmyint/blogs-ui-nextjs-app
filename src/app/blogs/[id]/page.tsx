import { auth } from "@/auth";
import { BlogDetails } from "@/components/blogs/BlogDetails";
import { CardSkeleton } from "@/components/generic/skeleton/CardSkeleton";
import BaseContainer from "@/components/global/container/BaseContainer";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  const { id } = await params;
  return (
    <BaseContainer>
      <Suspense
        key={"blog-details"}
        fallback={
          <div>
            <CardSkeleton />
          </div>
        }
      >
        <BlogDetails id={id} />
      </Suspense>
    </BaseContainer>
  );
}
