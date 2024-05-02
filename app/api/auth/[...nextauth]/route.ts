import { login } from "@/components/auth/auth"
import NextAuth from "next-auth/next"
import CredentialsProvider  from "next-auth/providers/credentials"
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "E-Mail", type: "text" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials, req) {
                if(!credentials?.email || !credentials?.password){
                    return null
                }
                try{
                    const user = await login(credentials.email, credentials.password)
                    console.log(user)
                    return user
                }
                catch (e){
                    console.log(e)
                    return null
                }
            }
        })
    ],
    callbacks: {
        session({session,token,user}){
            return session
        }
    }
})

export {handler as GET, handler as POST}