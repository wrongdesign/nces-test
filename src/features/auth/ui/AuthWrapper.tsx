"use client";

import type { PropsWithChildren } from "react";

import Image from "next/image";

const AuthWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="authPage">
        <div className="flex flex-col p-6 border border-[--defaultBorder] rounded-2xl items-center ">
          <Image
            loading="eager"
            alt={"Logo"}
            height={"75"}
            src={"/logo.webp"}
            width={100}
            style={{ height: "auto", width: "auto" }}
          />
          {children}
        </div>
      </main>
    </div>
  );
};

export default AuthWrapper;
