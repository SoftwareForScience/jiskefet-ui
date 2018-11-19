
import * as m from 'mithril';
import Cookies = require('js-cookie');

export const request = (options: any): Promise<any> => {
    const token = Cookies.get('token');
    console.log('making authorized api call with token: ');
    console.log(token);
    if (token) {
        options = {
            ...options,
            headers: {
                Authorization: `bearer ${token}`
            }
        };
    }
    return m.request(options);
};
