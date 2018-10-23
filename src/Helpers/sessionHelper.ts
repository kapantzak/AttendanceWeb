/*
 *  Session helper
 */

function supportSessionStorage() {
    try {
        return "sessionStorage" in window && window["sessionStorage"] !== null;
    } catch (e) {
        return false;
    }
}

/**
 * Store data to session storage
 * @param data Data to store
 */
export function setSessionStorage(key: string, data: any): void {
    if (supportSessionStorage() === true) {
        sessionStorage.setItem(key, JSON.stringify(data));
    }
}

/**
 * Get session data providing specific key
 * @param key The storage key to search
 */
export function getSessionStorage(key: string): string | null {
    if (supportSessionStorage() === true) {
        return sessionStorage.getItem(key);
    }
    return null;
}

/**
 * Save token to session storage
 * @param token The token to save
 */
export function saveAuthTokenToSession(token: string): void {
    setSessionStorage("token",token);
}

/**
 * Get saved token
 */
export function getAuthToken(): string | null {
    let t = getSessionStorage("token");
    return (t !== null) ? t.replace(/\"/g, "") : null;
}

/**
 * Remove item token
 */
export function deleteAuthToken(): void {
    sessionStorage.removeItem("token");
}

/**
 * Save user id to session
 * @param userId
 */
export function saveUserIdToSession(userId: number): void {
    setSessionStorage("userId", userId);
}

/** 
 * Get user id from session
*/
export function getUserId(): number | null {
    let u = getSessionStorage("userId");
    return (u !== null) ? parseInt(u.replace(/\"/g, "")) : null;
}

/**
 * 
 * @param userRoles Save user roles to session
 */
export function saveUserRolesToSession(userRoles: number[]): void {
    if (userRoles.length > 0) {
        setSessionStorage("userRoles", JSON.stringify(userRoles));
    }    
}

/** 
 * Get user roles from session
*/
export function getUserRoles(): number[] | null {
    let u = getSessionStorage("userRoles");
    return (u !== null) ? JSON.parse(u.replace(/\"/g, "")) : null;
}

export function getUserRolesObj(): IUserRoles {
    let roles = getUserRoles();
    if (roles !== null) {
        return  {
            isAdmin: roles.indexOf(1) !== -1,
            isProfessor: roles.indexOf(2) !== -1,
            isStudent: roles.indexOf(3) !== -1
        };
    }
    return {};
}

export interface IUserRoles {
    isAdmin?: boolean,
    isProfessor?: boolean,
    isStudent?: boolean
}