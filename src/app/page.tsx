"use client";
import liff from "@line/liff";
import { useEffect } from "react";

export default function Home() {
  const initLiff = async () => {
    try {
      await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID ?? "" });
      console.log("LIFF initialized");
      if (liff.isLoggedIn()) {
        const profile = await liff.getProfile();
        console.log("User Profile:", profile);
      } else {
        liff.login();
      }
    } catch (error) {
      console.error("LIFF initialization failed", error);
    }
  };

  useEffect(() => {
    initLiff();
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="text-4xl">Line Liff Test</div>
    </div>
  );
}
