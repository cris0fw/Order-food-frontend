import { z } from "zod";

const registerValidators = z.object({
  name: z
    .string()
    .min(4, "Debe tener minimo 4 caracteres")
    .trim()
    .refine((val) => !val.includes(" "), {
      message: "El campo es obligatorio",
    }),
  email: z
    .string()
    .email("No es un email valido")
    .trim()
    .refine((val) => !val.includes(" "), {
      message: "El campo es obligatorio",
    }),
  password: z
    .string()
    .min(6, "La contraseña debe tener minimo 6 caracteres")
    .trim()
    .refine((val) => !val.includes(" "), {
      message: "El campo es obligatorio",
    }),
});

const loginValidators = z.object({
  email: z
    .string()
    .email("No es un email valido")
    .trim()
    .refine((val) => !val.includes(" "), {
      message: "El campo es obligatorio",
    }),
  password: z
    .string()
    .min(6, "La contraseña debe tener minimo 6 caracteres")
    .trim()
    .refine((val) => !val.includes(" "), {
      message: "El campo es obligatorio",
    }),
});

export { registerValidators, loginValidators };
