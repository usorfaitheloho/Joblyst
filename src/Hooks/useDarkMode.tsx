import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

function useDarkMode(): [string, Dispatch<SetStateAction<string>>] {
  const [theme, setTheme] = useState<string>(localStorage.theme);
  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}

export default useDarkMode;
