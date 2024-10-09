import User from "@/models/User";
import mongoose from "mongoose";
import { UserTypes } from "@/app/types/backend";
import { isAdmin } from "@/auth";

export async function GET(req: Request) {
  try {
    mongoose.connect(process.env.MONGO_URI as string);

    if (await isAdmin()) {
      const user: UserTypes[] = await User.find();
      return Response.json(user);
    } else {
      return Response.json([]);
    }
  } catch (error) {
    console.log(error);
  }
}
