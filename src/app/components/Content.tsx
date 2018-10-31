/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import AppState from '../models/AppState';

export default class Content implements m.Component {
    class: string;

    constructor(vnode: any) {
        this.class = vnode.attrs.class || '';
    }

    view(vnode: any) {
        return (
            <div class={`jf-content ${this.class} ${AppState.showSidebar ? '' : 'jf-content-active'}`}>
                <div class="container-fluid">
                    {vnode.children}
                </div>
            </div>
        );
    }
}
