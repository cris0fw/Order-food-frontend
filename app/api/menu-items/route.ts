import MenuItem from "@/models/MenuItems";
import mongoose from "mongoose";
import { MenuItemsTypes } from "@/app/types/backend";
import { isAdmin } from "@/auth";

export async function GET(req: Request) {
  mongoose.connect(process.env.MONGO_URI as string);

  try {
    const menuItems: MenuItemsTypes[] = await MenuItem.find();
    return Response.json(menuItems);
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req: Request) {
  try {
    mongoose.connect(process.env.MONGO_URI as string);
    const data: MenuItemsTypes = await req.json();

    if (await isAdmin()) {
      const menuItemDoc = await MenuItem.create(data);
      return Response.json(menuItemDoc);
    } else {
      return Response.json({});
    }
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(req: Request) {
  mongoose.connect(process.env.MONGO_URI as string);

  try {
    if (await isAdmin()) {
      const { _id, ...data } = await req.json();
      await MenuItem.findByIdAndUpdate(_id, data);
    }

    return Response.json(true);
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(req: Request) {
  try {
    mongoose.connect(process.env.MONGO_URI as string);
    const url = new URL(req.url);
    const _id = url.searchParams.get("_id");

    if (await isAdmin()) {
      await MenuItem.deleteOne({ _id });
      return Response.json(true);
    }
  } catch (error) {
    console.log(error);
  }
}
