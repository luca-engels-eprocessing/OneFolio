import NextAuth, { DefaultSession } from "next-auth"
import Account from '@/models/User.js'
import {compare} from "bcryptjs"
import { connect, disconnect, findAccount } from "@/utils/db";
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
        await connect();
        if(!credentials?.email || !credentials?.password){
            return null
        }
        try{
          const { email, password } = await signInSchema.parseAsync(credentials)

          const user = await findAccount(email)
          
          disconnect()
          if (user && (await compare(password, user.password))) {
              user.password = ""
              return user;
          } else throw new Error('No User Found');
        }
        catch (e){
          disconnect();
          if(e instanceof ZodError) return null;
          console.log(e)
          return null
        }
      },
    }),
  ],
  secret:process.env.AUTH_SECRET,
  callbacks: {
    jwt({token, user}) {
      if (user) {
        token.name = user.name as unknown as {firstname: string, lastname: string};
        token.email = user.email ?? '';
        token.street = user.street;
        token.city = user.city;
        token.country = user.country;
        token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.firstname = token.name.firstname;
      session.user.lastname = token.name.lastname;
      session.user.email = token.email as string;
      session.user.street = token.street as string;
      session.user.city = token.city as string;
      session.user.country = token.country as string;
      session.user.phone = token.phone as string;
      return session;
    },
  },
})
