"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = ({ children }: { children?: React.ReactNode }) => {
  const path = usePathname();

  if (
    path === "/Signup" ||
    path === "/Login" ||
    path === "/Otp_verify/form.tsx"
  )
    return "";
  return (
    <div>
      <header className="gap-16 bg-blue-200 border border-b-2 h-14 border-gray-100 shadow-sm flex justify-end">
        <h1 className="font-bold text-[25pt] text-blue-900">Welcome to Akil</h1>

        <nav className="flex justify-between items-center gap-6 mx-2  text-blue-600">
          <div className=" flex items-center justify-center  gap-6">
            <Link className=" text-center text-white text-[14pt]" href="/Login">
              Login
            </Link>
            <Link
              className=" border  text-center  text-[13pt] text-gray-800"
              href="/Signup"
            >
              Sign Up
            </Link>
          </div>
          {children}
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
