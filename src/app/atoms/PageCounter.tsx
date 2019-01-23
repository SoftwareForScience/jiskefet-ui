
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
     * The current page from, for example, a table.
     */
    currentPage: number;
    /**
     * The total row count (available rows in the db).
     */
    totalCount: number;
    /**
     * The number of rows that are being displayed on each table page.
     */
    rowsInTable: number;
}

type Vnode = m.Vnode<Attrs, PageCounter>;

/**
 * Returns the displayed rows based on the current page and the total row count (available rows in db).
 * e.g. 1-16 of 1468
 */
export default class PageCounter extends MithrilTsxComponent<Attrs> {
    /**
     * The number of the first row displayed.
     */
    start = (attrs: Attrs): number => {
        const { currentPage, rowsInTable, totalCount } = attrs;
        if (totalCount === 0) {
            return 0;
        }
        return ((currentPage * rowsInTable) - rowsInTable) + 1;
    }

    /**
     * The number of the last row displayed.
     */
    end = (attrs: Attrs): number => {
        const { currentPage, rowsInTable, totalCount } = attrs;
        if ((currentPage * rowsInTable) < totalCount) {
            return currentPage * rowsInTable;
        }
        return totalCount;
    }

    view(vnode: Vnode) {
        return (
            <div class="jf-pagecounter">
                {this.start(vnode.attrs)}-{this.end(vnode.attrs)} of {vnode.attrs.totalCount} rows
            </div>
        );
    }
}
