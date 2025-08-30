import { Button } from "@/components/ui/button";
import { Calendar, Trash } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchBlogDetails } from "@/services/blogEndpoints";
import { formatDate } from "@/utils/helper";
import BlogActions from "./BlogActions";
import { auth } from "@/auth";
import BlogUserProfile from "./BlogUserProfile";

export async function BlogDetails({ id }: { id: string }) {
  const session = await auth();

  const res = await fetchBlogDetails(id);
  return (
    <Card className="w-full shadow-none border-0">
      <CardHeader>
        <CardTitle className="text-5xl">{res.data.name}</CardTitle>
        <div className="flex gap-6 items-center mt-5">
          <CardDescription className="font-medium ">
            <BlogUserProfile name={res.data.User.name} />
          </CardDescription>{" "}
          /
          <CardDescription className="font-medium flex items-center gap-2">
            <Calendar />
            {formatDate(res.data.createdAt)}
          </CardDescription>
        </div>
        {session?.user?.id === res.data.User.id && (
          <BlogActions blog={res.data} isDetails />
        )}
      </CardHeader>
      <CardContent>
        <div>
          <CardDescription className="text-base">
            {res.data.description}
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  );
}
