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
import { addBlog } from "@/lib/actions/BlogApiActions";
const BlogAdd = ({
  setIsOpenDialog,
}: {
  setIsOpenDialog: (val: boolean) => void;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const BlogFormValidationSchema = createBlogValidationSchema();
  const form = useForm<z.infer<typeof BlogFormValidationSchema>>({
    resolver: zodResolver(BlogFormValidationSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onBlogAddSubmit = async (
    data: z.infer<typeof BlogFormValidationSchema>
  ) => {
    startTransition(async () => {
      const { name, description } = data;

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description || "");

      // logFormDataKeysValues(formData);

      try {
        const result = await addBlog(formData);

        // check the result status
        // will throw exception if it is not success
        if (!result.success) {
          toast.error("ERROR", {
            description: result.message || "Failed to update blog",
          });
          return;
        }

        toast.success("SUCCESS", {
          description: "Blog added successfully.",
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
        <CardTitle>Add Blog</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onBlogAddSubmit)}>
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

export default BlogAdd;
