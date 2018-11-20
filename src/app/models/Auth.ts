/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as Cookie from 'js-cookie';
import * as m from 'mithril';
import { initialize } from '../app';

const AuthModel = {
    async logout() {
        Cookie.remove('token');
        initialize();
        m.route.set('/');
    },
};

type AuthModel = typeof AuthModel;
export default AuthModel;
