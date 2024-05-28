import {jest} from '@jest/globals'

export const getUserByEmail = async (email:string) => jest.fn()
export const getUserById = async (id:string) => jest.fn()
export const createUser = async (userData:{}) => jest.fn()
export const createInvestment = async (investmentData:{}) => jest.fn()
export const getInvestmentsByUserId = async (id:string) => jest.fn()
export const deleteInvestmentById = async (id:string) => jest.fn()