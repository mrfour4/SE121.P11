import { DraftCode } from "@/types";
import { Monaco } from "@monaco-editor/react";

import { DRAFT_CODE_KEY } from "../constants";
import { MONACO_THEMES } from "../constants/themes";

export const defineMonacoThemes = (monaco: Monaco) => {
    Object.entries(MONACO_THEMES).forEach(([theme, themeData]) => {
        monaco.editor.defineTheme(theme, themeData);
    });
};

export const setDraftCode = (draft: DraftCode) => {
    if (!draft.code) return;

    localStorage.setItem(DRAFT_CODE_KEY, JSON.stringify(draft));
};

export const getDraftCode = () => {
    const draft = localStorage.getItem(DRAFT_CODE_KEY);
    return draft ? (JSON.parse(draft) as DraftCode) : null;
};
