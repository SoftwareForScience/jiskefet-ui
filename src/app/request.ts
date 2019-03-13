
import * as m from 'mithril';
import * as Cookies from 'js-cookie';
import { store } from './redux/configureStore';
import { logout } from './redux/ducks/auth/operations';
import { HttpError } from './interfaces/HttpError';

/**
 * Wrapper for m.request to add authorization headers to requests when a token exists.
 * @param options m.request options, see mithril docs.
 */
export const request = (options: m.RequestOptions<{}> & { url: string }): Promise<any> => {
    const token = Cookies.get('token');
    if (token) { // If JWT token exists as a cookie, add token to request.
        options = {
            ...options,
            headers: {
                Authorization: `bearer ${token}`
            }
        };
    }
    return new Promise((resolve: any, reject: any) => {
        m.request(options).then((response: {}) => {
            resolve(response);
        }).catch((response: HttpError<any>) => {
            if (response.code === 401) {
                store.dispatch(logout());
            }
            reject({ ...response, message: response.message, dateTime: new Date() });
        });
    });
};
