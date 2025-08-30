"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Navs from "./Navs";
import Logo from "./Logo";
import { FileSearch, LucideMenu } from "lucide-react";
import Search from "../search/Search";

export function MenuDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size={"icon"}>
          <LucideMenu />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="space-y-2">
            <DrawerTitle>
              <Logo />
            </DrawerTitle>
            <DrawerDescription className="">
              Ignite Your Creative Journey
            </DrawerDescription>
            <React.Suspense
              fallback={
                <div>
                  <FileSearch />
                </div>
              }
            >
              <Search placeholder="Search..." />
            </React.Suspense>
          </DrawerHeader>
          <div className="p-4 h-44 text-center">
            <Navs />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
