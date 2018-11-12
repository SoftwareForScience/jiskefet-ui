
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
    currentPage: number;
    totalCount: number;
    rowsInTable: number;
}

type Vnode = m.Vnode<Attrs, PageCounter>;

export default class PageCounter extends MithrilTsxComponent<Attrs> {
    view(vnode: Vnode) {
        const { currentPage, totalCount, rowsInTable } = vnode.attrs;
        return (
            <div>
                {((currentPage * rowsInTable) - rowsInTable) + 1}-{(currentPage * rowsInTable)} of {totalCount}
            </div>
        );
    }
}
