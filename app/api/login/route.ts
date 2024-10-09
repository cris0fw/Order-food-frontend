"use server";
import { signIn } from "@/auth";
import { Login } from "@/app/types/backend";

export const POST = async (req: Request) => {
  try {
    const data: Login = await req.json();
    const { email, password } = data;

    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });

    return Response.json(true);
  } catch (error) {
    console.log(error);
  }
};
