import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

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
    const user = await db.user.findUnique({where:{id}})
    return user
  } catch (e){
    throw(e)
  }
}

export const getInvestmentsByUserId = async (id:string) => {
  try {
    const investments = await db.investment.findMany({where:{userId:id}})
    return investments
  } catch (e){
    throw(e)
  }
}

export const deleteInvestmentById = async (id:string) => {
  
  try {
    const investments = await db.investment.delete({where:{id:id}})
    return investments
  } catch (e) {
    throw(e)
    
  }
}