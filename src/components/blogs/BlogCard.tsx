"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Blog } from "@/utils/types/definitations/definitations";
import { formatDate, truncateString } from "@/utils/helper";
import Link from "next/link";
import BlogActions from "./BlogActions";
import { useSession } from "next-auth/react";
import { Eye, UserRound, View } from "lucide-react";
import BlogUserProfile from "./BlogUserProfile";

export function BlogCard({ blog }: { blog: Blog }) {
  const { data: session } = useSession();
  console.log("User session", session?.user?.id, blog.User.id);
  return (
    <Card className="w-full border-0 shadow-sm hover:border-1 hover:shadow-lg hover:translate-x-1 transition-all duration-500">
      <Link href={`/blogs/${blog.id}`}>
        <CardHeader>
          <BlogUserProfile name={blog.User.name} />
        </CardHeader>
        <CardContent>
          <div className="min-h-16 space-y-3">
            <CardTitle className="text-3xl font-bold truncate">
              {blog.name}
            </CardTitle>
            <CardDescription className="text-sm tracking-wide min-h-16">
              {truncateString(blog.description, 100)}
            </CardDescription>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="flex justify-between items-center gap-2">
        <CardDescription>{formatDate(blog.createdAt)}</CardDescription>
        <div className="flex gap-1 items-center">
          {session?.user?.id === blog.User.id && <BlogActions blog={blog} />}
          <Link href={`/blogs/${blog.id}`}>
            <Button variant={"ghost"}>
              <Eye />
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
