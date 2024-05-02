import { User } from "next-auth"
import Account from '@/models/User.js'

import {compare} from "bcryptjs"
import { connect } from "@/utils/db";

type LoginFn = (email: string, password: string) => Promise<User>;

export const login : LoginFn = async (email, password) => {
    await connect();
    const user = await Account.findOne({ email: email })
    if (user && (await compare(password, user.password))) {
        user.password = ""
        return user;
    } else throw new Error('No User Found');
}

