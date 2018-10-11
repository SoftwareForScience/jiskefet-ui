/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';

export class NavItem implements m.Component {
    private href: string;
    private title: string;
    private icon: string;

    constructor(vnode: any) {
        this.href = vnode.attrs.href;
        this.title = vnode.attrs.name;
        this.icon = vnode.attrs.icon;
    }

    view() {
        let text;
        text = !this.icon ?
            <a href={this.href} className="nav-link" oncreate={m.route.link}>{this.title}</a> :
            [(
                <a href={this.href} className="nav-link" oncreate={m.route.link}>
                    <span class={`fas ${this.icon}`} />
                    &nbsp;{this.title}</a>
            )];

        return (
            <li class={`nav-item ${this.href === m.route.get() && 'active'}`}>
                {text}
            </li >
        );
    }
}
