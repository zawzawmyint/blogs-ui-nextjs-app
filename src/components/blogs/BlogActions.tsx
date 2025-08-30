"use client";
import React, { useState, useTransition } from "react";
import { CardAction } from "../ui/card";
import { Blog } from "@/utils/types/definitations/definitations";
import { useRouter } from "next/navigation";
import { CardActionDelete } from "../generic/CardActionDelete";
import { deleteBlog } from "@/lib/actions/BlogApiActions";
import { toast } from "sonner";
import CardAddEditItemDialog from "../generic/CardAddEditDialog";
import BlogEdit from "./BlogEdit";

const BlogActions = ({
  blog,
  isDetails = true,
}: {
  blog: Blog;
  isDetails?: boolean;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        const result = await deleteBlog(blog.id);
        // check the result status
        // will throw exception if it is not success
        if (!result.success) {
          toast.error("ERROR", {
            description: "Failed to delete blog.",
          });
          return;
        }
        toast.success("SUCCESS", {
          description: "Blog deleted successfully.",
        });
        if (isDetails) {
          router.push("/blogs");
        } else {
          router.refresh();
        }
      } catch (error) {
        console.log(error);
        toast.error("ERROR", {
          description:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred",
        });
      }
    });
  };
  return (
    <CardAction className="flex items-center gap-2 flex-wrap">
      {isDetails ? (
        <>
          <CardAddEditItemDialog
            isOpenDialog={open}
            setIsOpenDialog={setOpen}
            isEdit
          >
            <BlogEdit blog={blog} setIsOpenDialog={setOpen} />
          </CardAddEditItemDialog>
          <CardActionDelete handleDelete={handleDelete} isPending={isPending} />
        </>
      ) : (
        <CardActionDelete handleDelete={handleDelete} isPending={isPending} />
      )}
    </CardAction>
  );
};

export default BlogActions;
