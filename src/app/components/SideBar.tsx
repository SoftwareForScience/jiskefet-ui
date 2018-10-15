/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import NavItem from './NavItem';

export default class SideBar implements m.Component {
    view() {
        return (
            <div class="container-fluid">
                <div id="sidebar-wrapper">
                    <ul class="sidebar-nav">
                        <li class="sidebar-brand">
                            <ul class="mr-auto list-unstyled components">
                                <NavItem href="/logs" name="Logs" />
                                <NavItem href="/runs" name="Runs" />
                                <NavItem href="/logs/create" name="Create new log" />
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>);
    }
}
