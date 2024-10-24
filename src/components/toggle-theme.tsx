import * as React from "react";
import { PiMoonFill, PiSunFill } from "react-icons/pi";

import { Button } from "@/components/button";

export function ToggleTheme() {
  const [theme, setThemeState] = React.useState<"theme-light" | "dark" | "system">("theme-light");

  function handleToggleTheme() {
    setThemeState(theme === "theme-light" ? "dark" : "theme-light");
  }

  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setThemeState(isDarkMode ? "dark" : "theme-light");
  }, []);

  React.useEffect(() => {
    const isDark =
      theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
  }, [theme]);

  return (
    <Button variant="default" size="icon" onClick={handleToggleTheme}>
      {theme === "theme-light" ? (
        <PiMoonFill className="h-4 w-4 text-accent-contrast" />
      ) : (
        <PiSunFill className="h-4 w-4 text-accent-contrast" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
