
import {NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import {db} from "@/utils/db"
import {PrismaClient, Prisma } from "@prisma/client";

export async function POST(req:NextRequest) {
  const jsonData= await req.json();

  const user = await db.user.findFirst({where:{email:jsonData.email.toLowerCase() as string}})
  if(user){
    return NextResponse.json({ message: 'User exists!'},{ status: 200 });
  }

  const hashPWD = await bcrypt.hash(jsonData.password, 10);
  
  try {
    const newUser = await db.user.create({
      data:{
        name:{
          firstname: jsonData.firstname,
          lastname: jsonData.lastname,
        },
        password: hashPWD,
        email: jsonData.email.toLowerCase(),
        street: jsonData.street,
        city: jsonData.city,
        country: jsonData.country,
        phone: jsonData.phone
      }
    })
    return NextResponse.json({ message: 'Data saved successfully!' },{ status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong!'+error },{ status: 500 });
  }
}

