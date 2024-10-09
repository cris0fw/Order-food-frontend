import { CategoriesGet } from "@/app/types/backend";
import Category from "@/models/Category";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    mongoose.connect(process.env.MONGO_URI as string);
    const body: CategoriesGet = await req.json();
    const { name } = body;

    const categoryDoc = await Category.create({ name });

    return Response.json(categoryDoc);
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(req: Request) {
  mongoose.connect(process.env.MONGO_URI as string);

  try {
    const body: CategoriesGet = await req.json();
    const { _id, name } = body;

    if (!_id || !name) {
      return new Response("Missing required fields", { status: 400 });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      _id,
      { name },
      { new: true }
    );

    if (!updatedCategory) {
      return new Response("Category not found", { status: 404 });
    }

    return Response.json(true);
  } catch (error) {
    console.error("PUT request error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
export async function GET() {
  try {
    mongoose.connect(process.env.MONGO_URI as string);

    return Response.json(await Category.find());
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(req: Request) {
  try {
    mongoose.connect(process.env.MONGO_URI as string);
    const url = new URL(req.url);
    const _id = url.searchParams.get("_id");
    await Category.deleteOne({ _id });
    return Response.json(true);
  } catch (error) {
    console.log(error);
  }
}
