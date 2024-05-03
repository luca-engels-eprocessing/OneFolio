
import {NextRequest, NextResponse } from "next/server";
import {connect,disconnect, findAccount} from '@/utils/db.js'
import bcrypt from 'bcryptjs';
import Account from '@/models/User.js'



export async function POST(req:NextRequest) {
  const jsonData= await req.json();
  await connect();

  if(await findAccount(jsonData.email)){
    return NextResponse.json({ message: 'User exists!'},{ status: 200 });
  }

  const hashPWD = await bcrypt.hash(jsonData.password, 10);

  const newUser = new Account( {
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
  })

  try {
    await newUser.save();
    return NextResponse.json({ message: 'Data saved successfully!' },{ status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong!'+error },{ status: 500 });
  } finally {
    disconnect();
  }
}

