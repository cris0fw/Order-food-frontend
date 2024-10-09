import { auth, isAdmin } from "@/auth";
import Order from "@/models/Order";
import UserInfo from "@/models/UserInfo";
import mongoose from "mongoose";

export const GET = async (req: Request) => {
  try {
    mongoose.connect(process.env.MONGO_URI as string);

    const session = await auth();
    const userEmail = session?.user?.email;

    const admin = await isAdmin();

    const url = new URL(req.url);
    const _id = url.searchParams.get("_id");

    if (_id) {
      return Response.json(await Order.findById(_id));
    }

    if (admin) {
      return Response.json(await Order.find());
    }

    if (userEmail) {
      return Response.json(await Order.find({ userEmail }));
    }
  } catch (error) {
    console.log(error);
  }
};
