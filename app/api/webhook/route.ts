import Stripe from "stripe";
import { buffer } from "micro";
import { NextRequest } from "next/server";
import Order from "@/models/Order";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY as string, {
  apiVersion: "2024-06-20",
});

export const POST = async (req: NextRequest) => {
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    console.error("Missing stripe-signature header");
    return new Response("Missing stripe-signature header", { status: 400 });
  }

  let event;

  try {
    const reqBuffer = await req.text();
    const signSecret = process.env.STRIPE_SIGN_SECRET as string;
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);

    if (event.type === "checkout.session.completed") {
      const orderId = event?.data?.object.metadata?.orderId;
      const isPaid = event?.data?.object?.payment_status === "paid";

      if (isPaid) {
        await Order.updateOne({ _id: orderId }, { paid: true });
      }
    }

    return new Response("Webhook recibido con éxito", { status: 200 });
  } catch (error: any) {
    console.error("Error en la validación del webhook", error);
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }
};
