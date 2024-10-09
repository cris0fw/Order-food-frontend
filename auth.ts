import NextAuth, { CredentialsSignin } from "next-auth";
import credentials from "next-auth/providers/credentials";
import User from "@/models/User";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
import Google from "next-auth/providers/google";
import UserInfo from "./models/UserInfo";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
    }),
    credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        mongoose.connect(process.env.MONGO_URI as string);

        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;
        if (!email || !password) {
          throw new CredentialsSignin(
            "Por favor coloca el email y password no pueden ser nulos"
          );
        }

        const findUser = await User.findOne({ email }).select("+password");
        if (!findUser) {
          throw new CredentialsSignin("Invalido email o contraseña");
        }
        const isMatched = await bcryptjs.compare(password, findUser.password);
        if (!isMatched) {
          throw new CredentialsSignin("Invalido email o contraseña");
        }
        const userData = {
          name: findUser.name,
          email: findUser.email,
          image: findUser.image,
          _id: findUser._id,
        };
        console.log(userData);
        return userData;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },

    async jwt({ token, account, user }) {
      if (account && user) {
        token.sub = user.id;
        token.email = user.email;
      }
      return token;
    },

    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        mongoose.connect(process.env.MONGO_URI as string);

        const userExist = await User.findOne({ email: profile?.email });

        if (!userExist) {
          await User.create({
            name: profile?.name,
            email: profile?.email,
            image: profile?.picture,
          });
        }
      }
      return true;
    },
  },

  pages: {
    signIn: "/login",
  },
});

export const isAdmin = async () => {
  const session = await auth();
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return false;
  }

  const userInfo = await UserInfo.findOne({ email: userEmail });

  if (!userInfo) {
    return false;
  }

  return userInfo.admin === true;
};
