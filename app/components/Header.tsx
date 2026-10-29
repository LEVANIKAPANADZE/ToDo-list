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

  return (
    <header>
      <div>
        <h1>TODO</h1>
      </div>

      <button
        type="button"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        aria-label="Toggle theme"
        disabled={!mounted}
      >
        {mounted &&
          (resolvedTheme === "dark" ? (
            <Image src="/icon-moon.svg" alt="Moon" width={22} height={22} />
          ) : (
            <Image src="/icon-sun.svg" alt="Sun" width={22} height={22} />
          ))}
      </button>
    </header>
  );
}
