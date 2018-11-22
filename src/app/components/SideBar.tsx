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
import { MithrilTsxComponent } from 'mithril-tsx-component';

export default class SideBar extends MithrilTsxComponent<{}> {
    showSidebar: boolean;

    constructor() {
        super();
        this.showSidebar = State.AppState.showSidebar;
    }

    view() {
        return (
            // Sidebar
            <nav class={`jf-sidebar ${State.AppState.showSidebar ? '' : 'jf-sidebar-active'}`}>
                <ul class="list-unstyled components">
                    <NavItem href="/logs" name="Logs" />
                    <NavItem href="/runs" name="Runs" />
                    <NavItem href="/subsystems" name="Subsystems Overview" />
                    <NavItem href="/logs/create" name="Create Log" />
                </ul>
            </nav>
        );
    }
}
