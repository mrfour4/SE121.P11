import { db } from "@/lib/db";
import { WebhookReceiver } from "livekit-server-sdk";
import { headers } from "next/headers";

const receiver = new WebhookReceiver(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_SECRET!,
);

export async function POST(req: Request) {
    const body = await req.text();
    const headerPayload = headers();
    const authorization = headerPayload.get("Authorization");

    if (!authorization) {
        return new Response("No authorization header", { status: 401 });
    }

    const event = await receiver.receive(body, authorization);

    if (event.event === "ingress_started") {
        await db.stream.update({
            where: { ingressId: event.ingressInfo?.ingressId },
            data: { isLive: true },
        });
        console.log("Ingress started", event);
    }

    if (event.event === "ingress_ended") {
        await db.stream.update({
            where: { ingressId: event.ingressInfo?.ingressId },
            data: { isLive: false },
        });
        console.log("Ingress ended", event);
    }

    return new Response("OK", { status: 200 });
}
