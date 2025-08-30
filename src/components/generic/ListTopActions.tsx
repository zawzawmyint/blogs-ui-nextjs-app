"use client";
import React, { useState } from "react";
import CardAddEditItemDialog from "./CardAddEditDialog";
import BlogAdd from "../blogs/BlogAdd";

const ListTopActions = () => {
  const [open, setOpen] = useState(false);
  return (
    <CardAddEditItemDialog isOpenDialog={open} setIsOpenDialog={setOpen}>
      <BlogAdd setIsOpenDialog={setOpen} />
    </CardAddEditItemDialog>
  );
};

export default ListTopActions;
