import { useCallback, useMemo, useState } from "react";
import debounce from "just-debounce-it";

export interface SearchInputProps {
  /** @default 300 */
  debounceMs?: number;
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ onChange, debounceMs, placeholder }: SearchInputProps) {
  const [value, setValue] = useState("");

  const debouncedOnChange = useMemo(() => debounce(onChange, debounceMs ?? 300), [onChange, debounceMs]);

  const onChangeCb = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      debouncedOnChange(e.target.value);
    },
    [setValue, debouncedOnChange]
  );

  return (
    <input
      type="text"
      placeholder={placeholder ?? "Search..."}
      className="input-bordered input-secondary input input-xs w-full sm:input-md"
      value={value}
      onChange={onChangeCb}
    />
  );
}
