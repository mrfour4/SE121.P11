import { useEffect, useState } from "react";

import { createViewerToken } from "@/actions/token";
import { jwtDecode, JwtPayload } from "jwt-decode";

import { toast } from "sonner";

type Payload = JwtPayload & {
    name?: string;
};

export const useViewerToken = (hostIdentity: string) => {
    const [token, setToken] = useState("");
    const [name, setName] = useState("");
    const [identity, setIdentity] = useState("");

    useEffect(() => {
        const createToken = async () => {
            try {
                const viewerToken = await createViewerToken(hostIdentity);
                setToken(viewerToken);

                const decodedToken = jwtDecode<Payload>(viewerToken);

                const name = decodedToken.name;
                const identity = decodedToken.sub;

                if (name) {
                    setName(name);
                }

                if (identity) {
                    setIdentity(identity);
                }
            } catch (error) {
                toast.error("Something went wrong");
            }
        };

        createToken();
    }, [hostIdentity]);

    return { token, name, identity };
};
