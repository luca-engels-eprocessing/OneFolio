import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
};

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

export const getUserByEmail = async (email:string) => {
  try {
    const user = await db.user.findUnique({where: {email:email.toLowerCase()}})
    return user
  } catch {
    return null
  }
}
export const getUserById = async (id:string) => {
  try {
    const user = await db.user.findMany()
    return user
  } catch (e){
    console.log(e)
    return null
  }
}