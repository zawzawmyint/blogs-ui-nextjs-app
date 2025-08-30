"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "../ui/button";
import { LogOut, LogOutIcon, UserCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { signOut } from "@/auth";
import { userLogout } from "@/lib/actions/AuthActions";
import BlogUserProfile from "../blogs/BlogUserProfile";

export function ProfileDropDownMenu() {
  const { data: session } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="cursor-pointer">
          <BlogUserProfile name={session?.user?.name as string} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-30">
        <DropdownMenuLabel className="flex justify-between items-center gap-4">
          User Profile
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Button
              variant={"ghost"}
              onClick={userLogout}
              className="w-full text-destructive"
            >
              <LogOutIcon color="red" /> Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
