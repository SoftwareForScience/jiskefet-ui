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
import { HttpError } from '../interfaces/HttpError';

/**
 * Landing page for unauthorized users.
 * Also used as a callback for GitHub to provide the Authorization Grant as a query parameter.
 */
export default class Login extends MithrilTsxComponent<{}> {
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
            });
        }
    }

    view() {
        return (
            <Spinner isLoading={State.AuthModel.isAuthorizing}>
                <HttpErrorAlert>
                    <div class="jumbotron jumbotron-fluid">
                        <h1 class="display-2">Welcome to Jiskefet</h1>
                        <p class="lead">Please sign in to use the application.</p>
                        <div class="mt-4">
                            { process.env.USE_CERN_SSO === 'true' ?
                                <div /> :
                                <a href="https://github.com/join" target="_blank">
                                    <button type="button" class="btn btn-outline-dark btn-lg mr-2">
                                     Sign up
                                    </button>
                                </a>
                            }
                            <a
                                href={
                                    process.env.USE_CERN_SSO === 'true'
                                        ? process.env.CERN_AUTH_URL
                                        : process.env.GITHUB_AUTH_URL
                                }
                            >
                                {
                                    <button type="button" class="btn btn-success btn-lg">
                                        <span class="mr-2">Sign in</span>
                                    </button>
                                }
                            </a>
                        </div>
                    </div>
                </HttpErrorAlert>
            </Spinner>
        );
    }
}
