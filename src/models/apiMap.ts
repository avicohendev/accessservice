export type authorizations =string[];
export type userId = string;

export enum apiStatus {
 active = "active",
 revoked ="revoked"
}
export  type userAndAuth = {
    user: userId,
    auth :authorizations,
    lastUsage: number | null,
    status : apiStatus
}
/**
 * Map containing all the api keys and their user data
 */
export const apiMap = new Map<string, userAndAuth> ();

/**
 * map containing all users and ther api keys for faster access in get request
 */
export const userApis = new Map<string, string[] >();

