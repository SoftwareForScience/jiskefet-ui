/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import { ITab } from '../interfaces/Tab';

interface Attrs {
    /**
     * The information of a tab. Each object in the array represents a tab.
     * It is used to set the id and name of the tab header.
     */
    tabs: ITab[];
}

type Vnode = m.Vnode<Attrs, TabHeader>;

/**
 * This component is used to create the different tabs which navigate to
 * different tab contents.
 */
export default class TabHeader extends MithrilTsxComponent<Attrs> {
    view(vnode: Vnode) {
        const { tabs } = vnode.attrs;
        return (
            <div class="col-md-12 mx-auto">
                <ul class="nav nav-tabs card-header-tabs pull-xs-left flex-column flex-sm-row" role="tablist">
                    {tabs && tabs.map((tab: ITab) =>
                        // tslint:disable-next-line:jsx-key
                        <li class="nav-item">
                            <a
                                class={`nav-link ${tab.active ? 'active' : ''}`}
                                href={`#${tab.id}`}
                                role="tab"
                                data-toggle="tab"
                            >
                                {tab.name}
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}
