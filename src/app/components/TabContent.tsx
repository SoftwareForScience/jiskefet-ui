/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import { Tab } from '../interfaces/Tab';

interface Attrs {
    tabs: Tab[];
    entity: object;
}

type Vnode = m.Vnode<Attrs, TabContent>;

export default class TabContent extends MithrilTsxComponent<Attrs> {

    view(vnode: Vnode) {
        const { tabs, entity } = vnode.attrs;
        return (
            <div class="tab-content">
                {tabs && tabs.map((tab: Tab) =>
                    // tslint:disable-next-line:jsx-key
                    <div role="tabpanel" class={`tab-pane ${tab.active && 'active'}`} id={tab.id} aria-labelledby={`${tab.id}-tab`}>
                        {tab.content && tab.content(entity)}
                    </div>
                )}
            </div>
        );
    }
}
