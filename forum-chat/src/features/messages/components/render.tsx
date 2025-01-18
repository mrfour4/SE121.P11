import { isEmptyText } from "@/lib/utils";
import Quill from "quill";
import { useEffect, useRef, useState } from "react";

type Props = {
    value: string;
};

const Render = ({ value }: Props) => {
    const [isEmpty, setIsEmpty] = useState(false);
    const renderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!renderRef.current) return;

        const container = renderRef.current;

        const quill = new Quill(document.createElement("div"), {
            theme: "snow",
        });

        quill.enable(false);

        const contents = JSON.parse(value);
        quill.setContents(contents);

        const isEmpty = isEmptyText(quill.getText());
        setIsEmpty(isEmpty);

        container.innerHTML = quill.root.innerHTML;

        return () => {
            if (container) {
                container.innerHTML = "";
            }
        };
    }, [value]);

    return <div ref={renderRef} className="ql-editor ql-renderer"></div>;
};

export default Render;
