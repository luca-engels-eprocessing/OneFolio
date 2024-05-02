import NextAuth, {DefaultSession} from "next-auth"
declare module 'next-auth' {
  interface Session {
    user: User
  }

  interface User {
    firstname: string,
    lastname: string,
    email: string,
    street: string | null,
    city: string | null,
    country: string | null,
    phone: string | null
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    name: {
      firstname: string,
      lastname: string,
    },
    email: string,
    street: string | null,
    city: string | null,
    country: string | null,
    phone: string | null
  }
}