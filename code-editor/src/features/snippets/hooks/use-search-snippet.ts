import { parseAsString, useQueryStates } from "nuqs";

export const useSearchSnippet = () => {
    const [searchQuery, setSearchQuery] = useQueryStates({
        search: parseAsString.withDefault(""),
        selectedLanguage: parseAsString.withDefault(""),
    });

    return {
        searchQuery,
        setSearchQuery,
    };
};
