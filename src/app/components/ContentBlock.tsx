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
    /**
     * Optional padding, used in the p-x class, where x is a number between 0 and 5.
     */
    padding?: number;
    /**
     * Optional css class added to the div.
     */
    class?: string;
}

type Vnode = m.Vnode<Attrs, ContentBlock>;

/**
 * Block component with styling, holding content.
 */
export default class ContentBlock extends MithrilTsxComponent<Attrs> {
    view(vnode: Vnode) {
        const { padding } = vnode.attrs;
        return (
            <div
                // tslint:disable-next-line:no-trailing-whitespace
                class={`bg-light rounded 
                ${padding ? ('p-' + padding) : 'p-2'} border ${vnode.attrs.class && vnode.attrs.class}`}
            >
                {vnode.children}
            </div>
        );
    }
}
