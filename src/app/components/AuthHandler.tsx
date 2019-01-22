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
import { selectToken, selectIsAuthorizing } from '../redux/ducks/auth/selectors';
import Spinner from './Spinner';

/**
 * Handles the redirected OAuth callback by extracting the code query parameter and using it to request a token.
 */
export default class AuthHandler extends MithrilTsxComponent<{}> {

    oninit() {
        // Retrieve Authorization Grant code from route's query parameters (?code=abcdefg).
        const { code } = m.route.param();
        if (code) {
            store.dispatch(authorize(code)).then(() => {
                const token = selectToken(store.getState());
                if (token) {
                    Cookie.set('token', token);
                }
                initialize();
            });
        }
    }

    view() {
        return (
            <div>
                <Spinner isLoading={selectIsAuthorizing(store.getState())} />
                Authorizing..
            </div>
        );
    }
}
