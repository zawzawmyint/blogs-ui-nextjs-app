import React from "react";
import { CardDescription } from "../ui/card";
import { UserRound } from "lucide-react";

const BlogUserProfile = ({ name }: { name: string }) => {
  return (
    <CardDescription className="flex gap-2 items-center font-bold text-primary/60">
      <UserRound />
      {name}
    </CardDescription>
  );
};

export default BlogUserProfile;
