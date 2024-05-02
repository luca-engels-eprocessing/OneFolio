import NextAuth from "next-auth"
import Account from '@/models/User.js'
import {compare} from "bcryptjs"
import { connect } from "@/utils/db";
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./lib/zod";
import { ZodError } from "zod";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
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
            console.log("HERE")
            const { email, password } = await signInSchema.parseAsync(credentials)

            const user = await Account.findOne({ email: email })
            console.log(user)
            

            if (user && (await compare(password, user.password))) {
                user.password = ""
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
  })