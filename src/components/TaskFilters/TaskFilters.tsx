import cn from "classnames";
import { Input } from "../Input";
import { Dropdown } from "../Dropdown";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState, type ChangeEvent } from "react";
import type { Filters } from "../../lib/utils/filterTasks";
import { useDebounce } from "../../hooks/useDebounce";

export interface TaskFiltersProps {
  options: string[];
  className?: string;
  onChange: (filters: Filters) => void;
}
export function TaskFilters({
  className,
  options,
  onChange,
}: TaskFiltersProps) {
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<"all" | "complete" | "incomplete">(
    "all"
  );
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const debouncedSearch = useDebounce(search, 500);

  const switchTheme = () => {
    if (theme === "light") {
      document.querySelector("body")?.setAttribute("data-theme", "dark");
      setTheme("dark");
    } else {
      document.querySelector("body")?.removeAttribute("data-theme");
      setTheme("light");
    }
  };

  useEffect(() => {
    onChange({ search: debouncedSearch, category });
  }, [debouncedSearch, category]);

  return (
    <div className={cn(className, "flex gap-4 items-stretch")}>
      <Input
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
        className="flex-auto"
        placeholder="Search note..."
      />
      <Dropdown
        className="flex"
        buttonText={category}
        options={options}
        onChangeOption={setCategory}
      />
      <span
        onClick={switchTheme}
        className="p-2 basis-[50px] flex items-center justify-center bg-purple rounded-[5px]"
      >
        {theme == "light" ? (
          <Moon color="white" size={24} />
        ) : (
          <Sun color="white" size={24} />
        )}
      </span>
    </div>
  );
}
