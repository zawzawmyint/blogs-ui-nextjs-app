import { fetchAllBlogs, searchAllBlogs } from "@/services/blogEndpoints";
import React from "react";
import { BlogCard } from "./BlogCard";

const Blogs = async ({ search }: { search: string }) => {
  const isSearch = search !== "";
  const res = isSearch
    ? await searchAllBlogs({ search })
    : await fetchAllBlogs();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {res.data.map((item) => (
        <BlogCard key={item.id} blog={item} />
      ))}
      {!res.data.length && (
        <div className="text-lg font-medium text-destructive">
          {"No blogs found. ;("}
        </div>
      )}
    </div>
  );
};

export default Blogs;
