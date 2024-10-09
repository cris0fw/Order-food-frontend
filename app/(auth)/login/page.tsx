"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { z } from "zod";
import { loginValidators } from "@/libs/ValidationForm";
import { CredentialsSignin } from "next-auth";
import axios from "axios";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const pageLogin = () => {
  const [loginInProgress, setLoginInProgress] = useState(false);
  const session = useSession();
  const { status } = session;
  const router = useRouter();

  if (status === "loading") {
    return "Loading...";
  }

  if (status === "authenticated") {
    router.push("/");
    return;
  }

  // useEffect(() => {
  //   if (loginInProgress === true) {
  //     setTimeout(() => {
  //       router.push("/");
  //     }, 1000);
  //   }
  // }, [loginInProgress]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      try {
        loginValidators.parse(values);
      } catch (error) {
        if (error instanceof z.ZodError) {
          return error.flatten().fieldErrors;
        }
        return {};
      }
    },
    onSubmit: async (values) => {
      try {
        const { email, password } = values;

        // const response = axios.post("/api/login", {
        //   email,
        //   password,
        // });

        // await toast.promise(response, {
        //   loading: "Loading",
        //   success: "User succesfully",
        //   error: "Error email or password invalid",
        // });
        await signIn("credentials", {
          email,
          password,
          callbackUrl: "/",
        });
      } catch (error) {
        setLoginInProgress(false);
        const someError = error as CredentialsSignin;
        return someError.cause;
      }

      formik.resetForm();
    },
  });

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="block max-w-sm mx-auto"
        action=""
      >
        <input
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="email"
          type="email"
          placeholder="email"
        />

        <div>
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-600">{formik.errors.email}</div>
          ) : null}
        </div>

        <input
          type="password"
          placeholder="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <div className="mb-2">
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-600">{formik.errors.password}</div>
          ) : null}
        </div>

        <button type="submit">Login</button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex gap-4 justify-center"
        >
          <Image src="/google.png" alt="logo google" width={24} height={24} />
          Login with google
        </button>
      </form>
    </section>
  );
};

export default pageLogin;
