import { Language, Theme } from "@/types";
import { parseAsStringEnum, useQueryStates } from "nuqs";

export const useEditor = () => {
    const [config, setConfig] = useQueryStates({
        theme: parseAsStringEnum<Theme>(Object.values(Theme)).withDefault(
            Theme.Default,
        ),
        language: parseAsStringEnum<Language>(
            Object.values(Language),
        ).withDefault(Language.JavaScript),
    });

    return {
        config,
        setConfig,
    };
};
