import { Theme } from "@/types";
import { cobalt } from "./cobalt";
import { dracula } from "./dracula";
import { github } from "./github";
import { nightOwl } from "./night-owl";

export const MONACO_THEMES: Omit<Record<Theme, any>, Theme.Default> = {
    dracula,
    github,
    nightOwl,
    cobalt,
};
