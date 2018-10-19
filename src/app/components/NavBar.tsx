/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import AppState from '../models/AppState';

export default class NavBar implements m.Component {

    toggleSidebar = () => {
        AppState.showSidebar = !AppState.showSidebar;
    }

    view() {
        return (
            <nav class="navbar navbar-expand-sm navbar-dark jf-navbar" >
                <div class="navbar-header w-100 d-flex">
                    <button type="button" class="btn jf-hamburger-button" onclick={this.toggleSidebar}>
                        <span class="fas fa-bars" />
                    </button>
                    <a href="/" class="navbar-brand" oncreate={m.route.link}>
                        <img src="../../assets/cern_logo.png" width="30" height="30" class="d-inline-block align-top logo" alt="" />
                        Jiskefet
                    </a>
                </div>
            </nav >
        );
    }
}
