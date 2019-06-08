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
    titles: string[];
    disableds: string[];
}

type Vnode = m.Vnode<Attrs, TabContainer>;

export default class TabContainer extends MithrilTsxComponent<Attrs> {
    activeTab: string;

    oninit(vnode: Vnode) {
        this.activeTab = vnode.attrs.titles[0];
    }

    handleOnTabClick = (event: any) => {
        const tabTitle = event.target.text;
        this.activeTab = tabTitle;
    }

    view(vnode: Vnode) {
        const { titles } = vnode.attrs;
        const { disableds } = vnode.attrs;
        const children = vnode.children as any[];
        return (
            <div class="card">
                <div class="card-header">
                    <ul class="nav nav-tabs card-header-tabs">
                        {titles.length > 0 && titles.map((title: string) => (
                        disableds.length > 0 && disableds.map((disabled: string) => (
                            <li class={title !== disabled ? 'nav-item' : 'nav-item d-none'}>
                                <a
                                    class={`nav-link ${this.activeTab === title && 'active'}`}
                                    onclick={(e: any) => this.handleOnTabClick(e)}
                                    href="javascript:void(0);"
                                >
                                    {title}
                                </a>
                            </li>
                            ))
                        ))}
                    </ul>
                </div>
                <div class="card-body">
                    {children.map((child: any, index: number) => (
                        <div class={`tab-content ${titles[index] !== this.activeTab && 'd-none' }`}>
                            {child}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
