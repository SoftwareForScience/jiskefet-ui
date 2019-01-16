/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import { Tabs } from '../interfaces/Tabs';
import TabHeader from '../atoms/TabHeader';

interface Attrs {
    /**
     * The information of a tab. Each object in the array
     * represents a tab. It is used to set the id and content
     * of the tabs.
     */
    tabs: Tabs[];

    /**
     * The object that is shown in the details page. It is used
     * to fill the content for example a table.
     */
    entity?: object;

    /**
     * This string is an indicator for which tab needs to use the given
     * function from it's parent.
     */
    caller?: string;

    /**
     * Function that can be given on to the content of the tab.
     * It can be used to pass through values to the parent.
     */
    func?: (param: string | number) => void;
}

type Vnode = m.Vnode<Attrs, Tab>;

/**
 * This component creates the tabs and adds content to its body.
 */
export default class Tab extends MithrilTsxComponent<Attrs> {

    view(vnode: Vnode) {
        const { tabs, entity, caller } = vnode.attrs;
        return (
            <div>
                <div class="card-header">
                    <TabHeader
                        tabs={tabs}
                    />
                </div>
                <div class="card-body">
                    <div class="tab-content">
                        {tabs && tabs.map((tab: Tabs) =>
                            // tslint:disable-next-line:jsx-key
                            <div
                                role="tabpanel"
                                class={`tab-pane ${tab.active && 'active'}`}
                                id={tab.id}
                                aria-labelledby={`${tab.id}-tab`}
                            >
                                {
                                    tab.id === caller ?
                                        tab.content(vnode.attrs.func) :
                                        tab.content(entity)
                                }
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
