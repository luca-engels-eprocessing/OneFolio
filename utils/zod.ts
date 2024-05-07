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
  passwordConfirm: z.string({ required_error: "Password ist benötigt" })
  .min(1, "Password ist benötigt")
  .min(8, "Password muss länger als 8 zeichen sein")
  .max(32, "Password muss kürzer als 32 zeichen sein"),
  street: z.string(),
  city: z.string(),
  country: z.string(),
  phone: z.string(),
  streetnumber: z.string(),
  zip: z.string(),
}).refine((data)=> data.password === data.passwordConfirm,{
  message: "Passwords müssen übereinstimmen",
  path: ["passwordConfirm"]
})
export const investmentSchema = z.object({
  title: z.string({ required_error: "Bitte füge einen Titel für das Investment ein" })
    .min(1,"Bitte füge einen Titel für das Investment ein"),
  date: z.string(),
  data: z.any()
})