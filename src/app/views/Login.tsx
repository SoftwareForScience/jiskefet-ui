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
import { initialize } from '../app';
import Spinner from '../components/Spinner';
import State from '../models/State';

export default class Login extends MithrilTsxComponent<{}> {
    code?: string;

    oninit() {
        const { code } = m.route.param();
        if (code) {
            State.AuthModel.isLogginIn = true;
            m.request({
                method: 'GET',
                url: `${process.env.API_URL}auth?grant=${code}`
            }).then((result: { token: string }) => {
                State.AuthModel.isLogginIn = false;
                Cookie.set('token', result.token);
                initialize();
            });
        }
    }

    view() {
        return (
            <Spinner isLoading={State.AuthModel.isLogginIn}>
                <HttpErrorAlert>
                    <div class="jumbotron jumbotron-fluid">
                        <h1 class="display-2">Welcome to Jiskefet</h1>
                        <p class="lead">Please sign in with GitHub to use the application.</p>
                        <a href={process.env.AUTH_URL}>
                            <button type="button" class="btn btn-success btn-lg">
                                Sign in with GitHub
                            </button>
                        </a>
                    </div>
                </HttpErrorAlert>
            </Spinner>
        );
    }
}
