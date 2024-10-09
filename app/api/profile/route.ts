import mongoose from "mongoose";
import { auth } from "@/auth";
import { UserProfile } from "@/app/types/backend";
import User from "@/models/User";
import UserInfo from "@/models/UserInfo";

//CON METODO AUTH
// export const PUT = auth(function GET(req) {
//   if (req.auth) return NextResponse.json(req.auth);

//   console.log(req.auth);

//   return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
// });

//VERSION 1
export const PUT = async (req: Request) => {
  try {
    mongoose.connect(process.env.MONGO_URI as string);

    const body: UserProfile = await req.json();

    const {
      _id,
      phone,
      streetAddress,
      postalCode,
      city,
      country,
      name,
      image,
      admin,
    } = body;

    const session = await auth();
    const userEmail = session?.user?.email;

    if (_id) {
      await User.updateOne({ _id }, { name, image });
      const findUser = await User.findOne({ _id });
      await UserInfo.findOneAndUpdate(
        { email: findUser.email },
        { phone, streetAddress, postalCode, city, country, admin },
        { upsert: true }
      );
      return Response.json(true);
    }

    //Actualizo el modelo User [name, image, email]
    await User.updateOne({ email: userEmail }, { name, image });

    //Actualiza el modelo InfoUser [email, phone, city, country, postalCode, admin, streeAddress]
    await UserInfo.findOneAndUpdate(
      { email: userEmail },
      { phone, streetAddress, postalCode, city, country },
      { upsert: true }
    );

    return Response.json(true);
  } catch (error) {
    console.log(error);
  }
};

//Mostrar los datos del perfil [name, email, image, phone etc etc etc]
export const GET = async (req: Request) => {
  try {
    mongoose.connect(process.env.MONGO_URI as string);

    const url = new URL(req.url);
    const _id = url.searchParams.get("id");

    const session = await auth();
    const userEmail = session?.user?.email;

    if (!userEmail) {
      return Response.json("No hay usuario autenticado traeme el email");
    }

    if (_id) {
      const userFind = await User.findOne({ _id }).lean<UserProfile>();
      const InfoUserFind = await UserInfo.findOne({
        email: userFind?.email,
      }).lean<UserProfile>();

      return Response.json({ ...userFind, ...InfoUserFind });
    }

    const userFind = await User.findOne({ email: userEmail }).lean();
    const infoUserFind = await UserInfo.findOne({ email: userEmail }).lean();

    return Response.json({ ...userFind, ...infoUserFind });
  } catch (error) {
    console.log(error);
  }
};
