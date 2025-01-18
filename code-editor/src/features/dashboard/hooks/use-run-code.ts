import { parseAsBoolean, useQueryState } from "nuqs";

export const useRunCode = () => {
    const [isRunning, setIsRunning] = useQueryState(
        "isRunning",
        parseAsBoolean.withDefault(false),
    );

    return {
        isRunning,
        setIsRunning,
    };
};
