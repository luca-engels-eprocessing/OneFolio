import NextAuth, { DefaultSession } from "next-auth"
import {compare} from "bcryptjs"
import { db } from "@/utils/db";
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./utils/zod";
import { ZodError } from "zod";

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
          email: { label: "E-Mail", type: "text" },
          password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if(!credentials?.email || !credentials?.password){
            return null
        }
        try{
          const { email, password } = await signInSchema.parseAsync(credentials)

          const user = await db.user.findFirst({where:{email:email}})
          
          if (user && (await compare(password, user.password))) {
              return user;
          } else throw new Error('No User Found');
        }
        catch (e){
          if(e instanceof ZodError) return null;
          console.log(e)
          return null
        }
      },
    }),
  ],
  pages:{
    signIn: '/auth/login'
  },
  secret:process.env.AUTH_SECRET,
  callbacks: {
    jwt({token, user}) {
      if (user) {
        token.id = user.id ?? ''
        token.firstname = user.firstname
        token.lastname = user.lastname
        token.email = user.email ?? '';
        token.street = user.street;
        token.city = user.city;
        token.country = user.country;
        token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.firstname = token.firstname;
      session.user.lastname = token.lastname;
      session.user.email = token.email;
      session.user.street = token.street ?? "";
      session.user.city = token.city ?? "";
      session.user.country = token.country ?? "";
      session.user.phone = token.phone ?? "";
      return session;
    },
  },
})
