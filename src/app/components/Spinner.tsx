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
    isLoading: boolean;
}

type Vnode = m.Vnode<Attrs, Spinner>;

export default class Spinner extends MithrilTsxComponent<Attrs> {
    view(vnode: Vnode) {
        const { isLoading } = vnode.attrs;
        return (
            <div>
                {isLoading ?
                    <div className="row">
                        <div className="col-md-12 mt-2">
                            <div className="jf-loader text-center" />
                        </div>
                    </div>
                    : vnode.children
                }
            </div>
        );
    }
}
