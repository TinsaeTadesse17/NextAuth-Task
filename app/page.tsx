"use client";
import Landing from "@/app/Landing/page";
import { useSession } from "next-auth/react";
import Navbar from "./components/Navbar";
import Image from "next/image";
import loading from "../public/loading.png";

export default function Home() {
  const { data: session, status } = useSession();
  console.log(session);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <Image className="bg-center" src={loading} alt="Loading" />
      </div>
    );
  }

  return (
    <div>
      {status === "authenticated" ? (
        <Landing session={session.user} />
      ) : (
        <>
          <Navbar />
          <img src="/career.jpg" className="h-full w-full" alt="Career" />
        </>
      )}
    </div>
  );
}
