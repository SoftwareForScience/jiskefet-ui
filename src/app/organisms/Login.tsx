/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import HttpErrorAlert from '../atoms/HttpErrorAlert';
import * as Cookie from 'js-cookie';
import { store } from '../redux/configureStore';
import { selectIsAuthorizing } from '../redux/ducks/auth/selectors';
import Spinner from '../atoms/Spinner';
import Button, { ButtonType, ButtonClass } from '../atoms/Button';
import { APPLICATION_NAME } from '../constants/constants';

/**
 * Landing page for unauthorized users.
 */
export default class Login extends MithrilTsxComponent<{}> {

    view() {
        return (
            <Spinner isLoading={selectIsAuthorizing(store.getState())}>
                <HttpErrorAlert>
                    <div class="jumbotron jumbotron-fluid">
                        {Cookie.get('isLoggedOut')
                            ?
                            <div class="col-md-6 mx-auto">
                                <div class="alert alert-warning" role="alert">
                                    <strong>Please close the browser to end the user session.</strong>
                                </div>
                            </div>
                            :
                            <div>
                                <h1 class="display-2">Welcome to {APPLICATION_NAME}</h1>
                                <p class="lead">Please sign in to use the application.</p>
                                <div class="mt-4">
                                    {localStorage.getItem('USE_CERN_SSO') === 'true' ?
                                        <div /> :
                                        <a href="https://github.com/join" target="_blank">
                                            <button type="button" class="btn btn-outline-dark btn-lg mr-2">
                                                Sign up
                                    </button>
                                        </a>
                                    }
                                    <a
                                        href={
                                            localStorage.getItem('AUTH_URL')
                                        }
                                    >
                                        {
                                            <Button
                                                buttonType={ButtonType.BUTTON}
                                                buttonClass={ButtonClass.SUCCESS}
                                                text="Sign in"
                                            />

                                        }
                                    </a>
                                </div>
                            </div>
                        }
                    </div>
                </HttpErrorAlert>
            </Spinner>
        );
    }
}
