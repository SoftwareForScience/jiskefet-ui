/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import HttpErrorAlert from '../components/HttpErrorAlert';
import * as Cookie from 'js-cookie';

export default class Login extends MithrilTsxComponent<{}> {
    code?: string;

    oninit() {
        console.log(m.route.param());
        const { code } = m.route.param();
        console.log('code:');
        console.log(code);

        if (code) {
            m.request({
                method: 'GET',
                url: `${process.env.API_URL}auth?grant=${code}`
            }).then((result: { token: string}) => {
                console.log('jwt: ' + result.token);
                Cookie.set('token', result.token);

                console.log('cookies:');
                console.log(Cookie.get('token'));
            });
        }
        console.log('cookies:');
        console.log(Cookie.get('token'));
        m.redraw();
    }

    view() {
        return (
            <div className="container-fluid">
                <HttpErrorAlert>
                    <a href={process.env.AUTH_URL}>
                        <button type="button" class="btn btn-default btn-primary">
                                Login
                        </button>
                    </a>
                </HttpErrorAlert>
            </div>
        );
    }
}
