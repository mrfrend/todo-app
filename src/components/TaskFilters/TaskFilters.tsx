import cn from "classnames";
import { Input } from "../Input";
import { Dropdown } from "../Dropdown";
import { useEffect, useState, type ChangeEvent } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategory,
  setCategory,
  setQuery,
  type FilterCategories,
} from "../../store/filter/filtersSlice";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import type { AppDispatch } from "../../store/store";

export interface TaskFiltersProps {
  options: string[];
  className?: string;
}
export function TaskFilters({ className, options }: TaskFiltersProps) {
  const category = useSelector(selectCategory);
  const [search, setSearch] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    dispatch(setQuery(debouncedSearch));
  }, [debouncedSearch]);

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
        onChangeOption={(option: FilterCategories) =>
          dispatch(setCategory(option))
        }
      />
      <ThemeSwitcher className="p-2 basis-[50px] flex items-center justify-center" />
    </div>
  );
}
