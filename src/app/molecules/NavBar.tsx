/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import * as Cookie from 'js-cookie';
import ProfileNavItem from './ProfileNavItem';
import { store } from '../redux/configureStore';
import { toggleSidebar } from '../redux/ducks/ui/actions';
import { fetchProfile } from '../redux/ducks/auth/operations';
import { selectProfile } from '../redux/ducks/auth/selectors';
import NavItem from '../atoms/NavItem';

export default class NavBar extends MithrilTsxComponent<{}> {
    toggleSidebar = () => {
        store.dispatch(toggleSidebar());
    }

    oninit() {
        if (Cookie.get('token') && !selectProfile(store.getState())) {
            store.dispatch(fetchProfile());
        }
    }

    view() {
        const profile = selectProfile(store.getState());
        return (
            <nav class="navbar navbar-expand-sm navbar-dark jf-navbar" >
                <div class="navbar-header d-flex">
                    <button
                            type="button"
                            class="btn jf-hamburger-button navbar-toggler collapsed"
                            data-toggle="collapse"
                            data-target="#navbar"
                            aria-controls="navbar"
                            aria-expanded="true"
                            aria-label="Toggle navigation"
                    >
                        <span class="fas fa-bars" />
                    </button>
                    <a href="/" class="navbar-brand" oncreate={m.route.link}>
                        <img
                            src="../../assets/alice_logo_text_white.png"
                            width="30"
                            height="30"
                            class="d-inline-block align-top jf-logo"
                            alt=""
                        />
                        {process.env.APPLICATION_NAME}
                    </a>
                    <ul class="jf-align-right mr-2">
                        {Cookie.get('token') ?
                            <ProfileNavItem profile={profile} />
                            :
                            <a
                                href={
                                    localStorage.getItem('AUTH_URL')
                                }
                            >
                            {!Cookie.get('state')
                            ?
                                <button type="button" class="btn btn-outline-success" >
                                    Sign in
                                </button>
                            : <div />
                            }
                            </a>
                        }
                    </ul>
                </div>
                    {Cookie.get('token')
                        ?
                        <div class="navbar-collapse justify-content-md-center collapse" id="navbar">
                            <ul class="navbar-nav">
                                <NavItem href="/logs" name="Logs" />
                                <NavItem href="/runs" name="Runs" />
                                <NavItem href="/tags" name="Tags Overview" />
                            </ul>
                        </div>
                        :
                        null
                    }
            </nav >
        );
    }
}
