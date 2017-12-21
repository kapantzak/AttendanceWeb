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
    return getSessionStorage("token");
}