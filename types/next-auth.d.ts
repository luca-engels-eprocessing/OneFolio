import NextAuth from "next-auth"
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession{
    user: {
      /** The user's postal address. */
      name: {
        firstname:string,
        lastname:string,
      },
      email: string,
      street: string,
      city: string,
      country: string,
      phone: string
    }
  }
}