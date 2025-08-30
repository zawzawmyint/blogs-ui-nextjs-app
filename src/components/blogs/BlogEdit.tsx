"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { logFormDataKeysValues } from "@/utils/helper";
import { createBlogValidationSchema } from "@/utils/validation-schema/BlogValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import DialogBtnWrapper from "../generic/DialogButtonWrapper";
import DialogCancelButton from "../generic/DialogCancelButton";
import SubmitButton from "../generic/SubmitButton";
import BlogRenderArea from "./BlogRenderArea";
import { addBlog, updateBlog } from "@/lib/actions/BlogApiActions";
import { Blog } from "@/utils/types/definitations/definitations";
const BlogEdit = ({
  blog,
  setIsOpenDialog,
}: {
  blog: Blog;
  setIsOpenDialog: (val: boolean) => void;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const BlogFormValidationSchema = createBlogValidationSchema();
  const form = useForm<z.infer<typeof BlogFormValidationSchema>>({
    resolver: zodResolver(BlogFormValidationSchema),
    mode: "onTouched",
    defaultValues: {
      name: blog.name || "",
      description: blog.description || "",
    },
  });

  const onBlogEditSubmit = async (
    data: z.infer<typeof BlogFormValidationSchema>
  ) => {
    startTransition(async () => {
      const { name, description } = data;

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description || "");

      // logFormDataKeysValues(formData);

      try {
        const result = await updateBlog(blog.id, formData);

        // check the result status
        // will throw exception if it is not success
        if (!result.success) {
          toast.error("ERROR", {
            description: result.message || "Failed to update blog",
          });
          return;
        }

        toast.success("SUCCESS", {
          description: "Blog updated successfully.",
        });
        setIsOpenDialog(false);
        router.refresh(); // This will trigger a refetch of tagged data
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
    <Card className="shadow-none border-0">
      <CardHeader>
        <CardTitle>Edit Blog</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onBlogEditSubmit)}>
            {/* blog render area  */}
            <BlogRenderArea form={form} />
            <DialogBtnWrapper>
              <DialogCancelButton />
              <SubmitButton isPending={isPending} />
            </DialogBtnWrapper>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BlogEdit;
