"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <header className="mx-auto flex w-full max-w-[540px] xl:max-w-[700px] items-center justify-between px-6 pt-12 pb-10 md:pt-[70px] md:pb-12">
      <h1 className="text-xl leading-none font-bold tracking-[0.4em] text-white md:text-[40px] md:tracking-[0.375em]">
        TODO
      </h1>

      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        disabled={!mounted}
        className="flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:h-[26px] md:w-[26px]"
      >
        {mounted && (
          <Image
            src={isDark ? "/icon-sun.svg" : "/icon-moon.svg"}
            alt=""
            width={26}
            height={26}
            className="h-5 w-5 md:h-[26px] md:w-[26px]"
          />
        )}
      </button>
    </header>
  );
}
