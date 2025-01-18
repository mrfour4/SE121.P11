import Mux from "@mux/mux-node";
import { AssetCreateParams } from "@mux/mux-node/resources/video/assets.mjs";

const { video } = new Mux({
    tokenId: process.env.MUX_TOKEN_ID,
    tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export async function muxDeleteAsset(assetId: string) {
    // !ignore with MUX premium
    // !Because MUX asset will auto delete data after 24h
    try {
        await video.assets.delete(assetId);
    } catch (err) {
        console.log("muxDeleteAsset: ", err);
    }
}

export async function muxCreateAsset(params: AssetCreateParams) {
    return await video.assets.create(params);
}
