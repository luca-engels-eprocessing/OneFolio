// import NextAuth, {DefaultSession} from "next-auth"
// declare module 'next-auth' {
//   interface Session {
//     user: User
//   }

//   interface User {
//     id:string,
//     name:{
//       firstname: string,
//       lastname: string,
//     },
//     email: string,
//     emailVerified: Date  | null,
//     street: string | null,
//     city: string | null,
//     country: string | null,
//     phone: string | null
//   }
// }

// declare module '@auth/core/jwt' {
//   interface JWT {
//     id:string,
//     name:{
//       firstname: string,
//       lastname: string,
//     },
//     email: string,
//     emailVerified: string | null,
//     street: string | null,
//     city: string | null,
//     country: string | null,
//     phone: string | null
//   }
// }