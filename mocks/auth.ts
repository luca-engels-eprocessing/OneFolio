import {jest} from '@jest/globals'

export const {
	auth,
	signIn,
	signOut,
  adapter,
	handlers: { GET, POST },
} = {
	auth: {
		session: {
			jwt: true,
		},
		jwt: {
			secret: process.env.AUTH_SECRET,
		},
	},
	signIn: jest.fn(),
	signOut: jest.fn(),
	adapter:jest.fn(),
	handlers: {
		GET: jest.fn(),
		POST: jest.fn(),
	},
};