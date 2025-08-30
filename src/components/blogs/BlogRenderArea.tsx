"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BlogFormValues } from "@/utils/types/validation-types/ValidationTypes";
import { LucideIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

const BlogRenderArea = ({ form }: { form: UseFormReturn<BlogFormValues> }) => {
  return (
    <div className="space-y-3">
      {/* name  */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder={"Name"} {...field} className="w-full" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* description  */}
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea placeholder={"Description"} {...field} rows={5} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default BlogRenderArea;
