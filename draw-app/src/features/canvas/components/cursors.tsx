import { useOthersConnectionIds } from "@liveblocks/react/suspense";
import { Cursor } from "./cursor";

export const Cursors = () => {
    const ids = useOthersConnectionIds();
    return (
        <>
            {ids.map((connectionId) => (
                <Cursor key={connectionId} connectionId={connectionId} />
            ))}
        </>
    );
};
