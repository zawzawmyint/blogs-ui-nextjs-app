"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { createRegisterValidationSchema } from "@/utils/validation-schema/AuthValidationSchema";
import { RegisterFormValues } from "@/utils/types/validation-types/ValidationTypes";
import SubmitButton from "@/components/generic/SubmitButton";
import { logIn, registerNewUser } from "@/lib/actions/AuthActions";
import { AuthRenderArea } from "../signin/AuthRenderArea";

export function Register() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const RegisterValidationSchema = createRegisterValidationSchema();
  const form = useForm<z.infer<typeof RegisterValidationSchema>>({
    resolver: zodResolver(RegisterValidationSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof RegisterValidationSchema>) {
    startTransition(async () => {
      const { name, email, password } = data;

      try {
        await registerNewUser(name, email, password);
        toast.success("SUCCESS", {
          description: "Signed up successfully",
        });
        router.push("sign-in");
      } catch (error) {
        console.log(error);
        toast.error("Error", {
          description:
            error instanceof Error ? error.message : "Registration failed",
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div>
          <AuthRenderArea<RegisterFormValues> form={form} isRegister />
        </div>
        <SubmitButton isPending={isPending} fullWidth />
      </form>
    </Form>
  );
}
