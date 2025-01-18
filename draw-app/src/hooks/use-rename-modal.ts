import { parseAsString, useQueryStates } from "nuqs";

type State = {
    id: string;
    title: string;
};

export const useRenameModal = () => {
    const [state, setState] = useQueryStates({
        id: parseAsString.withDefault(""),
        title: parseAsString.withDefault(""),
    });

    const isOpen = state.id !== "";

    const onOpen = (value: State) => setState(value);
    const onClose = () => setState({ id: "", title: "" });

    return { isOpen, initialValues: state, onOpen, onClose };
};
