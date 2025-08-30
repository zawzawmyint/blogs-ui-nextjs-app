import { auth } from "@/auth";
import LoginButton from "@/components/generic/auth/LoginButton";
import { ProfileDropDownMenu } from "@/components/generic/ProfileDropDownMenu";
import Link from "next/link";
import React, { Suspense } from "react";
import Search from "../search/Search";
import { FileSearch } from "lucide-react";
import Navs from "./Navs";
import Logo from "./Logo";
import { MenuDrawer } from "./MenuDrawer";

const Header = async () => {
  const session = await auth();

  return (
    <div className="sticky top-0 left-0 z-40 p-10 bg-background">
      <div className="flex justify-between items-center mx-auto max-w-7xl">
        <div className="flex gap-10 items-center flex-wrap">
          <Logo />
          {session?.user && (
            <div className="hidden sm:block">
              <Navs />
            </div>
          )}
        </div>
        <div className="flex gap-5 items-center ">
          <div className="hidden sm:block">
            <Suspense
              fallback={
                <div>
                  <FileSearch />
                </div>
              }
            >
              <Search placeholder="Search..." />
            </Suspense>
          </div>
          <div>
            {!session?.user ? <LoginButton /> : <ProfileDropDownMenu />}
          </div>
          <div className="sm:hidden">
            <MenuDrawer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
