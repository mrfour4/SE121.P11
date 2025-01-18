import { useEffect, useMemo, useState } from "react";

import { useRoom } from "@liveblocks/react/suspense";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";

import { YKeyValue } from "y-utility/y-keyvalue";
import * as Y from "yjs";

import {
    computed,
    createPresenceStateDerivation,
    createTLStore,
    defaultShapeUtils,
    InstancePresenceRecordType,
    react,
    TLAnyShapeUtilConstructor,
    TLInstancePresence,
    TLRecord,
    TLStoreWithStatus,
    transact,
} from "tldraw";

export function useYjsStore({
    shapeUtils = [],
    user,
}: Partial<{
    hostUrl: string;
    version: number;
    shapeUtils: TLAnyShapeUtilConstructor[];
    user: {
        id: string;
        color: string;
        name: string;
    };
}>) {
    const room = useRoom();

    const { yDoc, yStore, yProvider } = useMemo(() => {
        const yDoc = new Y.Doc({ gc: true });
        const yArr = yDoc.getArray<{ key: string; val: TLRecord }>(
            "tl_records",
        );
        const yStore = new YKeyValue(yArr);

        return {
            yDoc,
            yStore,
            yProvider: new LiveblocksYjsProvider(room, yDoc),
        };
    }, [room]);

    const [store] = useState(() => {
        const store = createTLStore({
            shapeUtils: [...defaultShapeUtils, ...shapeUtils],
        });
        return store;
    });

    const [storeWithStatus, setStoreWithStatus] = useState<TLStoreWithStatus>({
        status: "loading",
    });

    useEffect(() => {
        setStoreWithStatus({ status: "loading" });

        const unsubs: (() => void)[] = [];

        function handleSync() {
            if (yStore.yarray.length) {
                transact(() => {
                    store.clear();
                    const records = yStore.yarray
                        .toJSON()
                        .map(({ val }) => val);
                    store.put(records);
                });
            } else {
                yDoc.transact(() => {
                    for (const record of store.allRecords()) {
                        yStore.set(record.id, record);
                    }
                });
            }

            unsubs.push(
                store.listen(
                    function syncStoreChangesToYjsDoc({ changes }) {
                        yDoc.transact(() => {
                            Object.values(changes.added).forEach((record) => {
                                yStore.set(record.id, record);
                            });

                            Object.values(changes.updated).forEach(
                                ([_, record]) => {
                                    yStore.set(record.id, record);
                                },
                            );

                            Object.values(changes.removed).forEach((record) => {
                                yStore.delete(record.id);
                            });
                        });
                    },
                    { source: "user", scope: "document" },
                ),
            );

            const handleChange = (
                changes: Map<
                    string,
                    | { action: "delete"; oldValue: TLRecord }
                    | {
                          action: "update";
                          oldValue: TLRecord;
                          newValue: TLRecord;
                      }
                    | { action: "add"; newValue: TLRecord }
                >,
                transaction: Y.Transaction,
            ) => {
                if (transaction.local) return;

                const toRemove: TLRecord["id"][] = [];
                const toPut: TLRecord[] = [];

                changes.forEach((change, id) => {
                    switch (change.action) {
                        case "add":
                        case "update": {
                            const record = yStore.get(id)!;
                            toPut.push(record);
                            break;
                        }

                        case "delete": {
                            toRemove.push(id as TLRecord["id"]);
                            break;
                        }
                    }
                });

                store.mergeRemoteChanges(() => {
                    if (toRemove.length) {
                        store.remove(toRemove);
                    }
                    if (toPut.length) {
                        store.put(toPut);
                    }
                });
            };

            yStore.on("change", handleChange);
            unsubs.push(() => yStore.off("change", handleChange));

            const userPreferences = computed<{
                id: string;
                color: string;
                name: string;
            }>("userPreferences", () => {
                if (!user) {
                    throw new Error("Failed to get user");
                }
                return {
                    id: user.id,
                    color: user.color,
                    name: user.name,
                };
            });

            const self = room.getSelf();
            // @ts-ignore
            const yClientId = self?.presence.__yjs_clientid;
            const presenceId = InstancePresenceRecordType.createId(yClientId);

            const presenceDerivation = createPresenceStateDerivation(
                userPreferences,
                presenceId,
            )(store);

            yProvider.awareness.setLocalStateField(
                "presence",
                // @ts-ignore
                presenceDerivation.get() ?? null,
            );

            unsubs.push(
                react("when presence changes", () => {
                    const presence = presenceDerivation.get() ?? null;
                    requestAnimationFrame(() => {
                        yProvider.awareness.setLocalStateField(
                            "presence",
                            // @ts-ignore
                            presence,
                        );
                    });
                }),
            );

            const handleUpdate = (update: {
                added: number[];
                updated: number[];
                removed: number[];
            }) => {
                const states = yProvider.awareness.getStates() as Map<
                    number,
                    { presence: TLInstancePresence }
                >;

                const toRemove: TLInstancePresence["id"][] = [];
                const toPut: TLInstancePresence[] = [];

                for (const clientId of update.added) {
                    const state = states.get(clientId);
                    if (state?.presence && state.presence.id !== presenceId) {
                        toPut.push(state.presence);
                    }
                }

                for (const clientId of update.updated) {
                    const state = states.get(clientId);
                    if (state?.presence && state.presence.id !== presenceId) {
                        toPut.push(state.presence);
                    }
                }

                for (const clientId of update.removed) {
                    toRemove.push(
                        InstancePresenceRecordType.createId(
                            clientId.toString(),
                        ),
                    );
                }

                store.mergeRemoteChanges(() => {
                    if (toRemove.length > 0) {
                        store.remove(toRemove);
                    }
                    if (toPut.length > 0) {
                        store.put(toPut);
                    }
                });
            };

            yProvider.awareness.on("change", handleUpdate);
            unsubs.push(() => yProvider.awareness.off("change", handleUpdate));

            setStoreWithStatus({
                store,
                status: "synced-remote",
                connectionStatus: "online",
            });
        }

        if (yProvider.synced) {
            handleSync();
        } else {
            yProvider.on("synced", handleSync);
            unsubs.push(() => yProvider.off("synced", handleSync));
        }

        return () => {
            unsubs.forEach((fn) => fn());
            unsubs.length = 0;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [yProvider, yDoc, store, yStore]);

    return storeWithStatus;
}
