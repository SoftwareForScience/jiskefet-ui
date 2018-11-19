/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as Cookie from 'js-cookie';

const AuthModel = {
    async logout(token: string) {
        console.log('calling Auth.logout');
        Cookie.remove('token');
        // m.request({
        //     method: 'GET',
        //     url: `${process.env.API_URL}logout?${token}`
        // });
    },
};

type AuthModel = typeof AuthModel;
export default AuthModel;
