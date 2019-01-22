/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import { initialize } from '../app';
import * as Cookie from 'js-cookie';
import { store } from '../redux/configureStore';
import { authorize } from '../redux/ducks/auth/operations';
import { selectToken } from '../redux/ducks/auth/selectors';

/**
 * Handles the redirected OAuth callback by extracting the code query parameter and using it to request a token.
 */
export default class AuthHandler extends MithrilTsxComponent<{}> {
    async oninit() {
        // Retrieve Authorization Grant code from route's query parameters (?code=abcdefg).
        const { code } = m.route.param();
        if (code) {
            await store.dispatch(authorize(code));
            const token = selectToken(store.getState());
            if (token) {
                Cookie.set('token', token);
            }
            initialize();
        }
    }

    view() {
        return (
            <div class="row">
                <div class="col-md-6 mt-3 offset-md-3">
                    <div class="alert alert-light text-center" role="alert">
                        <h3>Authenticating...</h3>
                    </div>
                </div>
            </div>
        );
    }
}
