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
import State from '../models/State';
import { HttpError } from '../interfaces/HttpError';
import * as Cookie from 'js-cookie';

export default class Loading extends MithrilTsxComponent<{}> {

    oninit() {
        // Retrieve Authorization Grant code from route's query parameters when this component is used as a callback.
        const { code } = m.route.param();
        if (code) {
            State.AuthModel.isAuthorizing = true;
            m.request({
                method: 'GET',
                url: `${process.env.API_URL}auth?grant=${code}`
            }).then((result: { token: string }) => {
                // Auth succeeded
                State.AuthModel.isAuthorizing = false;
                Cookie.set('token', result.token);
                initialize();
            }).catch((err: HttpError) => {
                // Auth failed
                State.AuthModel.isAuthorizing = false;
                State.HttpErrorModel.add(err);
                m.route.set('/');
            });
        }
    }

    view() {
        return (
            <div class="spinner">
                <div class="bounce1" />
                <div class="bounce2" />
                <div class="bounce3" />
            </div>
        );
    }
}
