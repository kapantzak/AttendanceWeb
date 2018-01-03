/*
 *  API helper
 */

import * as ses from './sessionHelper';

export enum ContentType {
    json,
    text
}

/**
 * Get heders object
 * @param contentType 
 * @param needsToken 
 */
export function getHeaders(contentType: ContentType, needsToken: boolean = true): Headers | null {
    
    // New headers object
    let headers: Headers = new Headers();

    // Set content type
    switch (contentType) {
        case ContentType.json:
            headers.append("Content-Type", "application/json; charset=utf-8");
            break;            
        case ContentType.text:
            headers.append("Content-Type", "text/plain");
            break;
        default:
            headers.append("Content-Type", "application/json; charset=utf-8");
            break;
    }

    // Get token
    if (needsToken === true) {
        let token = ses.getAuthToken();
        if (token === null) {
            return null;    
        }
        headers.append("Authorization", `Bearer ${token}`);
    }
    
    return headers;
}