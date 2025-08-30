import Blogs from "@/components/blogs/Blogs";
import ListTopActions from "@/components/generic/ListTopActions";
import BaseContainer from "@/components/global/container/BaseContainer";
import PageTopSection from "@/components/global/page-top-section/PageTopSection";
import { Suspense } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import BlogsSkeleton from "@/components/generic/skeleton/BlogsSkeleton";

export default async function Page(props: {
  searchParams?: Promise<{
    search?: string;
    page?: string;
  }>;
}) {
  // search
  const searchParams = await props.searchParams;
  const search = searchParams?.search || "";
  const currentPage = Number(searchParams?.page) || 1;

  // session
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }
  return (
    <BaseContainer>
      <PageTopSection
        title="Blogs"
        description="A collection of blogs on various topics"
      >
        <ListTopActions />
      </PageTopSection>
      <Suspense
        key={"blogs"}
        fallback={
          <div>
            <BlogsSkeleton />
          </div>
        }
      >
        <Blogs search={search} />
      </Suspense>
    </BaseContainer>
  );
}
