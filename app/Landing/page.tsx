import { signOut } from "next-auth/react";
import React from "react";

const Landing = ({ session }: { session: any }) => {
  return (
    <div className="flex flex-col justify-start items-center min-h-screen gap-3 mt-auto">
      <img src="/hiring.jpg" className="h-80 w-80" alt="Hiring" />

      <button
        className="bg-blue-800 hover:bg-blue-500 px-4 rounded-[20px] py-2 text-white"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Landing;
