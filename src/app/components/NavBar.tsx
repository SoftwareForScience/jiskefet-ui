/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import * as $ from 'jquery';
import { NavItem } from './NavItem';

function toggle() {
    $('#menu-toggle').click((e) => {
        e.preventDefault();
        $('#wrapper').toggleClass('toggled');
    });
}

export class NavBar implements m.Component {

    view() {
        return (
            <nav class="navbar navbar-expand-sm navbar-dark jiskefet-navbar" >
                <div class="container-fluid">
                    <div class="navbar-header w-100 d-flex">
                        <a href="/" class="navbar-brand jiskefet-navbar-text" oncreate={m.route.link}>
                            <img src="../../assets/cern_logo.png" width="30" height="30" class="d-inline-block align-top logo" alt="" />
                            Jiskefet
                        </a>
                        <button type="button" class="unstyled-button" id="menu-toggle" onclick={toggle}><span class="fas fa-bars" /></button>
                        <button class="navbar-toggler navbar-nav ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="fas fa-user-cog" />
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav ml-auto">
                                <NavItem href="/#" name="Register" />
                                <NavItem href="/#" name="Login" icon="fa-user" />
                            </ul>
                        </div>
                    </div>
                </div>
            </nav >
        );
    }
}
