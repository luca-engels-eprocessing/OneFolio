import * as z from "zod"
 
export const signInSchema = z.object({
  email: z.string()
    .min(1, "E-mail ist benötigt")
    .email("Ungültige E-mail"),
  password: z.string({ required_error: "Password ist benötigt" })
    .min(1, "Password ist benötigt"),
})


export const signUpSchema = z.object({
  email: z.string()
    .min(1, "E-mail ist benötigt")
    .email("Ungültige E-mail"),
  password: z.string({ required_error: "Password ist benötigt" })
    .min(1, "Password ist benötigt")
    .min(8, "Password muss länger als 8 zeichen sein")
    .max(32, "Password muss kürzer als 32 zeichen sein"),
  firstname: z.string({ required_error: "Vorname ist benötigt" })
    .min(1, "Vorname ist benötigt"),
  lastname: z.string({ required_error: "Nachname ist benötigt" })
    .min(1, "Nachname ist benötigt"),
  street: z.string({ required_error: "Street is required" })
    .min(1, "Street is required"),
  city: z.string({ required_error: "City is required" })
    .min(1, "City is required"),
  country: z.string({ required_error: "Country is required" })
    .min(1, "Country is required"),
  phone: z.string({ required_error: "Phone is required" })
    .min(1, "Phone is required"),
})