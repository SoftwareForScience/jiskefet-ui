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
import TabHeader from './TabHeader';

interface Attrs {
    /**
     * The information of a tab. Each object in the array
     * represents a tab. It is used to set the id and content
     * of the tabs.
     */
    tabs: Tab[];

    /**
     * The object that is shown in the details page. It is used
     * to fill the content for example a table.
     */
    entity: object;
}

type Vnode = m.Vnode<Attrs, Tabs>;

/**
 * This component creates the tabs and adds content to its body.
 */
export default class Tabs extends MithrilTsxComponent<Attrs> {

    view(vnode: Vnode) {
        const { tabs, entity } = vnode.attrs;
        return (
            <div>
                <div class="card-header">
                    <TabHeader
                        tabs={tabs}
                    />
                </div>
                <div class="card-body">
                    <div class="tab-content">
                        {tabs && tabs.map((tab: Tab) =>
                            // tslint:disable-next-line:jsx-key
                            <div
                                role="tabpanel"
                                class={`tab-pane ${tab.active && 'active'}`}
                                id={tab.id}
                                aria-labelledby={`${tab.id}-tab`}
                            >
                                {tab.content && tab.content(entity)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
