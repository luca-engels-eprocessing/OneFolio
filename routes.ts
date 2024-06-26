/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = [];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * 
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
];


/**
 * The prefix for API authentication routes
 * Routes that start with this will be needed for API auth purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"


export const BACKEND_URL = (process.env.NODE_ENV !== "production")? "http://127.0.0.1:8000" : "https://backend.onefolio.de"


/**
 * The default path for redirection after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings"