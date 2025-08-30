"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface AuthRenderAreaProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  isRegister?: boolean;
}
export function AuthRenderArea<T extends FieldValues>({
  form,
  isRegister = false,
}: AuthRenderAreaProps<T>) {
  return (
    <div className="space-y-6">
      {isRegister && (
        <FormField
          control={form.control}
          name={"name" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={"Name..."} {...field} autoComplete="off" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <FormField
        control={form.control}
        name={"email" as Path<T>}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder={"Email..."} {...field} autoComplete="off" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={"password" as Path<T>}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder={"Password..."} type="password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
