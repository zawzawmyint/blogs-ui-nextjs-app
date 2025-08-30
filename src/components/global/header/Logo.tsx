import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"}>
      <h1 className="font-bold text-4xl text-blue-800">B-LOG</h1>
    </Link>
  );
};

export default Logo;
