import {jest} from '@jest/globals'

export const getUserByEmail = async (email:string) => jest.fn()
export const getUserById = async (id:string) => jest.fn()
export const getInvestmentsByUserId = async (id:string) => jest.fn()

export const db = {
    user: {
        create: jest.fn()
    },
    investment: {
        create: jest.fn()
    }
}
