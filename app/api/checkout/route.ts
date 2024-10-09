import mongoose from "mongoose";
import { InfoCheckout, LineItem, ExtraPrice } from "@/app/types/backend";
import Stripe from "stripe";
import { auth } from "@/auth";
import Order from "@/models/Order";
import MenuItem from "@/models/MenuItems";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY as string, {
  apiVersion: "2024-06-20",
});

export const POST = async (req: Request) => {
  try {
    mongoose.connect(process.env.MONGO_URI as string);
    const body: InfoCheckout = await req.json();

    const { items, address } = body;

    const session = await auth();
    const userEmail = session?.user?.email ?? undefined;

    if (!userEmail) {
      throw new Error(
        "User email is required for creating a checkout session."
      );
    }

    const orderDoc = await Order.create({
      userEmail,
      ...address,
      cartProducts: items,
      paid: false,
    });

    const stripeLineItems: LineItem[] = [];

    for (const item of items) {
      const productInfo = await MenuItem.findById(item._id);
      let productPrice = productInfo.basePrice;

      if (item.size) {
        const size = productInfo.sizes.find(
          (s: ExtraPrice) => s._id.toString() === item.size._id.toString()
        );
        productPrice += size.price;
      }
      if (item.extras?.length > 0) {
        for (const cartProductExtrathing of item.extras) {
          const productsExtras = productInfo.extraIngredientPrices;
          const extraThingInfo = productsExtras.find(
            (extra: ExtraPrice) =>
              extra._id.toString() === cartProductExtrathing._id.toString()
          );
          productPrice += extraThingInfo.price;
        }
      }
      const productName = item.name;
      const unitAmount = Math.round(productPrice * 100);

      stripeLineItems.push({
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: productName,
          },
          unit_amount: unitAmount,
        },
      });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      line_items: stripeLineItems,
      mode: "payment",
      customer_email: userEmail,
      success_url: `${
        process.env.NEXTAUTH_URL
      }/orders/${orderDoc._id.toString()}?clear-cart=1`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cart?canceled=1`,
      metadata: { orderId: orderDoc._id.toString() },
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: "Delivery fee",
            type: "fixed_amount",
            fixed_amount: { amount: 500, currency: "USD" },
          },
        },
      ],
    });

    return Response.json(stripeSession.url);
  } catch (error) {
    console.log(error);
  }
};
