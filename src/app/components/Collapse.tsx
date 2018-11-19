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
     * Optional header that contains element for the collapse
     * button. Example: <span class="fas fa-bars" />
     */
    icon?: JSX.Element;

    /**
     * String that contains the title of the collapseble item.
     */
    title?: string;

    /**
     * String that contains the id of the collapseble item.
     */
    id?: string;
}

type Vnode = m.Vnode<Attrs, Collapse>;

export default class Collapse extends MithrilTsxComponent<Attrs> {

    view(vnode: Vnode) {
        const { icon, title, id } = vnode.attrs;
        return (
            <div>
                <div class="row">
                    <div class="col-sm-10">
                        <button
                            type="button"
                            style="background: transparent"
                            class="btn jf-hamburger-button"
                            data-toggle="collapse"
                            data-target={`#${id}`}
                            aria-expanded="false"
                            aria-controls={`${id}`}
                            data-fa-transform="grow-10"
                        >
                            {icon}
                            &nbsp;{title}
                        </button>
                    </div>
                </div>
                <div class="collapse" id={id}>
                    {vnode.children}
                </div>
            </div >
        );
    }
}
