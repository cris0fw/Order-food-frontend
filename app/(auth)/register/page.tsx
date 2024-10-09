"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useFormik } from "formik";
import { z } from "zod";
import { registerValidators } from "@/libs/ValidationForm";
import toast from "react-hot-toast";

const pageRegister = () => {
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: (values) => {
      try {
        registerValidators.parse(values);
      } catch (error) {
        if (error instanceof z.ZodError) {
          return error.flatten().fieldErrors;
        }
        return {};
      }
    },
    onSubmit: async (values) => {
      const { name, email, password } = values;
      try {
        const response = axios.post("/api/register", {
          name,
          email,
          password,
        });

        await toast.promise(response, {
          loading: "creating user",
          success: "User created",
          error: "Error creating user",
        });
        setError(false);
        setUserCreated(true);

        formik.resetForm();
      } catch (error: any) {
        setError(true);
        console.log(error);
      }
    },
  });

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
      {userCreated && (
        <div className="my-4 text-center">
          User created. <br />
          Now you can{" "}
          <Link className="underline" href="/login">
            Login
          </Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center">
          An Error has ocurred. <br />
          Please try again later
        </div>
      )}
      <form
        onSubmit={formik.handleSubmit}
        className="block max-w-sm mx-auto"
        action=""
      >
        <input
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
          placeholder="Name"
          name="name"
        />

        <div>
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-600">{formik.errors.name}</div>
          ) : null}
        </div>

        <input
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="email"
          placeholder="email"
          name="email"
        />

        <div>
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-600">{formik.errors.email}</div>
          ) : null}
        </div>

        <input
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="password"
          placeholder="password"
          name="password"
        />

        <div className="mb-2">
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-600">{formik.errors.password}</div>
          ) : null}
        </div>

        <button type="submit">Register</button>

        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Existing account?{" "}
          <Link className="underline" href="/login">
            Login Here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
};

export default pageRegister;
