import React from "react";
import { CardSkeleton } from "./CardSkeleton";

const BlogsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
};

export default BlogsSkeleton;
