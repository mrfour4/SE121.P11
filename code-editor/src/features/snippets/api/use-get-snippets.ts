import { usePaginatedQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

type Props = {
    search?: string;
    selectedLanguage?: string;
};

export const useGetSnippets = ({ search, selectedLanguage }: Props) => {
    return usePaginatedQuery(
        api.snippets.getSnippets,
        { search, selectedLanguage },
        { initialNumItems: 5 },
    );
};
