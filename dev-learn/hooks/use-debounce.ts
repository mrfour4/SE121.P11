import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 500): T {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => {
            clearTimeout(timerId);
        };
    }, [value, delay]);

    return debounceValue;
}
