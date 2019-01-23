/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';

interface Attrs {
    href: string;
    name: string;
    icon?: string;
}

type Vnode = m.Vnode<Attrs, NavItem>;

export default class NavItem extends MithrilTsxComponent<Attrs> {
    /**
     * Returns true if this NavItem's href corresponds to the current page/route (ignores query params in route).
     * Example true if: href = '/logs', current page/route = 'site.com/logs?id=1'
     */
    isCurrentPage = (hrefString: string): boolean => {
        const route: string = m.route.get().split('?')[0];
        return route === hrefString;
    }

    view(vnode: Vnode) {
        const { href, name, icon } = vnode.attrs;
        let text: JSX.Element | JSX.Element[];
        text = !icon ?
            <a href={href} className="nav-link" oncreate={m.route.link}>{name}</a>
            : [(
                <a href={href} className="nav-link" oncreate={m.route.link}>
                    <span class={`fas ${icon}`} />
                    &nbsp;{name}</a>
            )];

        return (
            <li class={`nav-item ${this.isCurrentPage(href) && 'active'}`}>
                {text}
            </li >
        );
    }
}
