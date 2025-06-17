import { Moon, Sun } from "lucide-react";
import { useState, type HTMLAttributes } from "react";

import cn from "classnames";
interface ThemeSwitcherProps extends HTMLAttributes<HTMLSpanElement> {}
export default function ThemeSwitcher({
  className,
  ...props
}: ThemeSwitcherProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  
  const switchTheme = () => {
    if (theme === "light") {
      document.querySelector("body")?.setAttribute("data-theme", "dark");
      setTheme("dark");
    } else {
      document.querySelector("body")?.removeAttribute("data-theme");
      setTheme("light");
    }
  };

  return (
    <span
      onClick={switchTheme}
      {...props}
      className={cn(className, "bg-purple rounded-[5px]")}>
      {theme == "light" ? (
        <Moon color="white" size={24} />
      ) : (
        <Sun color="white" size={24} />
      )}
    </span>
  );
}
