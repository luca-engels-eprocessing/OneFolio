import NextAuth from "next-auth"
import authConfig from "@/auth.config"
 


export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks:{
    async session({token,session}){
      if(token.sub && session.user){
        session.user.id = token.sub
      }
      return session
    },
    async jwt({token}){
      return token
    }
  },
  adapter: undefined,
  session: {strategy: "jwt"},
  ...authConfig
})
