/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import { selectIsSidebarShown } from '../redux/ducks/ui/selectors';
import { store } from '../redux/configureStore';

type Vnode = m.Vnode<{}, Content>;

/**
 * Wrapper component holding the main content of the app.
 */
export default class Content extends MithrilTsxComponent<{}> {
    view(vnode: Vnode) {
        return (
            <div class={`jf-content ${selectIsSidebarShown(store.getState()) ? '' : 'jf-content-active'}`}>
                <div class="container-fluid">
                    {vnode.children}
                </div>
            </div>
        );
    }
}
