import {jest} from '@jest/globals'


export class PrismaClient {
    investment = {
        create: jest.fn()
    }
    user = {
        create: jest.fn()
    }
}

