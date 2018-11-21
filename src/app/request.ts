
import * as m from 'mithril';
import Cookies = require('js-cookie');
import State from './models/State';

/**
 * Wrapper for m.request to add authorization headers to requests when a token exists.
 * @param options m.request options, see mithril docs.
 */
export const request = (options: any): Promise<any> => {
    const token = Cookies.get('token');
    if (token) { // If JWT token exists as a cookie, add token to request.
        options = {
            ...options,
            headers: {
                Authorization: `bearer ${token}`
            }
        };
    }
    return new Promise((resolve: any) => {
        m.request(options).then((response: any) => {
            // Request was done with or without an authorization header and a 2xx code was received.
            resolve(response);
        }).catch(() => {
            // Request was done without an authorization header and non 2xx code was received.
            State.AuthModel.logout();
        });
    });
};
