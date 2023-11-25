"use client";
import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  className?: string;
}
const Header: React.FC<Props> = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-emerald-800 p-6`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Header;
