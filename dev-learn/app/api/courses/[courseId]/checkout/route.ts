import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

type Params = {
    params: { courseId: string };
};

export async function POST(req: Request, { params }: Params) {
    try {
        const user = await currentUser();

        if (!user || !user.id || !user.emailAddresses[0].emailAddress) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { courseId } = params;

        const course = await db.course.findUnique({
            where: {
                id: courseId,
                isPublished: true,
            },
        });

        if (!course) {
            return new NextResponse("Not found", { status: 404 });
        }

        const purchase = await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId: user.id,
                    courseId,
                },
            },
        });

        if (purchase) {
            return new NextResponse("Already purchased", { status: 400 });
        }

        let stripeCustomer = await db.stripeCustomer.findUnique({
            where: {
                userId: user.id,
            },
            select: {
                stripeCustomerId: true,
            },
        });

        if (!stripeCustomer) {
            const customer = await stripe.customers.create({
                email: user.emailAddresses[0].emailAddress,
            });

            stripeCustomer = await db.stripeCustomer.create({
                data: {
                    userId: user.id,
                    stripeCustomerId: customer.id,
                },
            });
        }

        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
            {
                quantity: 1,
                price_data: {
                    currency: "USD",
                    product_data: {
                        name: course.title,
                        description: course.description!,
                    },
                    unit_amount: Math.round(course.price! * 100),
                },
            },
        ];

        const session = await stripe.checkout.sessions.create({
            customer: stripeCustomer.stripeCustomerId,
            line_items,
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${courseId}?success=1`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${courseId}?canceled=1`,
            metadata: {
                courseId,
                userId: user.id,
            },
        });

        console.log("🚀 ~ POST ~ session:", session);

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.log("🚀 ~ POST ~ CHECKOUT ~ error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
