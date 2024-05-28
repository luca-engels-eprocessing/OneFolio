import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

import { signInSchema } from "@/utils/zod"
import { getUserByEmail } from "@/utils/db"
import { compare } from "bcryptjs"

const authConfig: NextAuthConfig = { 
    trustHost: true,
    providers: [
        Credentials({
            async authorize(credentials){
                const validatedFields = signInSchema.safeParse(credentials)
                
                if(validatedFields.success){
                    const {email,password} = validatedFields.data
                    const user = await getUserByEmail(email)
                    if(!user || !user.password) return null;
                    const passwordMatch = await compare(password, user.password);
                    if(passwordMatch) return { ...user, name: `${user.name.firstname} ${user.name.lastname}`,id:user._id };
                }
                return null
            }
        })
    ],
}

export default authConfig;
