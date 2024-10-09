"use server";
import { Register } from "@/app/types/backend";
import connectDB from "@/libs/db";
import User from "@/models/User";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";

export const POST = async (req: Request) => {
  try {
    const data: Register = await req.json();
    mongoose.connect(process.env.MONGO_URI as string);
    const { name, email, password } = data;

    console.log(name, email, password);

    if (!name || !email || !password) {
      return Response.json({
        message: "Name,  Email y password estan vacios",
      });
    }

    if (password.length < 5) {
      return Response.json({
        message: "La contraseña tiene que tener mas de 5 caracteres",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return Response.json({
        message: "Este usuario ya existe en mongodb",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);

    await User.create({ name, email, password: hash });

    return Response.json({
      message: "Usuario registrado",
    });
  } catch (error) {
    console.log(error);
  }
};
