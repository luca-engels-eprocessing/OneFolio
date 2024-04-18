import NextAuth,{Account,User as AuthUser} from "next-auth";
import { CredentialsProvider } from "next-auth/providers/credentials";
import {NextRequest, NextResponse } from "next/server";
import {connect,disconnect} from '@/utils/db.js'
import User from '@/models/User.js'

export async function POST(req:NextRequest,res:NextResponse) {
    const formData = await req.formData();
    await connect();
    console.log(formData);
    try {
        const exists = await User.findOne({ email: formData.get('email') as string });
        if(exists){
          return NextResponse.json({ message: 'User exists!'},{ status: 200 });
        }
        return NextResponse.json({ message: 'User does not exist!' },{ status: 404 });
        
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong!'+error },{ status: 500 });
    }
  }
  