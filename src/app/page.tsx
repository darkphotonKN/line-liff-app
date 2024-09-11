"use client";
import liff from "@line/liff";

import { useEffect, useState } from "react";

interface Profile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}

export default function Home() {
  console.log("LIFF ID:", process.env.NEXT_PUBLIC_LIFF_ID);

  // store user profile
  const [profile, setProfile] = useState<Profile | undefined>(undefined);

  const initLiff = async () => {
    try {
      await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID ?? "" });
      console.log("LIFF initialized");
      if (liff.isLoggedIn()) {
        const profile = await liff.getProfile();
        console.log("User Profile:", profile);

        setProfile(profile);

        await sendAddOAInvite(profile.userId);
      } else {
        liff.login();
      }
    } catch (error) {
      console.error("LIFF initialization failed", error);
    }
  };

  const sendAddOAInvite = async (userId: string) => {
    try {
      const res = await fetch("/api/sendInvite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();
      console.log("Invite sent:", data);
    } catch (error) {
      console.error("Failed to send OA invite:", error);
    }
  };

  useEffect(() => {
    initLiff();
  }, []);

  return (
    <div className="h-[100vh] flex flex-column gap-3 justify-center items-center">
      <div className="text-4xl">Line Liff Test</div>

      <div>{profile ? JSON.stringify(profile) : "Loading profile..."}</div>
    </div>
  );
}
