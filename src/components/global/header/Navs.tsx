import Link from "next/link";
import React from "react";

const Navs = () => {
  return (
    <nav>
      <Link href={"/blogs"}>
        <h1 className="font-medium text-lg">Blogs</h1>
      </Link>
    </nav>
  );
};

export default Navs;
