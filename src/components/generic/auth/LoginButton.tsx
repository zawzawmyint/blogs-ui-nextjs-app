import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const LoginButton = () => {
  return (
    <Button variant={"outline"}>
      <Link href={"/sign-in"}>Login</Link>
    </Button>
  );
};

export default LoginButton;
