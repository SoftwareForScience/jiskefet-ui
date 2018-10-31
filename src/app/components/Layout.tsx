/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import NavBar from './NavBar';
import SideBar from './SideBar';
import Content from './Content';

export default class Layout implements m.Component {
    view(vnode: any) {
        return (
            <div>
                <NavBar />
                <div class="jf-wrapper">
                    <SideBar />
                    <Content>
                        {vnode.children}
                    </Content>
                </div>
            </div>
        );
    }
}
