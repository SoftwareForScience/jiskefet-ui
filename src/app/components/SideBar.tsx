/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import NavItem from './NavItem';
import State from '../models/State';

export default class SideBar implements m.Component {
    class: string;
    showSidebar: boolean;

    constructor(vnode: any) {
        this.class = vnode.attrs.class || '';
        this.showSidebar = State.AppState.showSidebar;
    }

    view() {
        return (
            // Sidebar
            <nav class={`jf-sidebar ${this.class} ${State.AppState.showSidebar ? '' : 'jf-sidebar-active'}`}>
                <ul class="list-unstyled components">
                    <NavItem href="/logs" name="Logs" />
                    <NavItem href="/runs" name="Runs" />
                    <NavItem href="/logs/create" name="Create new log" />
                </ul>
            </nav>
        );
    }
}
