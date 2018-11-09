
/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import { Column } from '../interfaces/Column';
import { OrderDirection } from '../enums/OrderDirection';

interface Attrs {
    column: Column;
    orderDirection?: OrderDirection | null;
    onClick?: () => void;
}

type Vnode = m.Vnode<Attrs, TableHeader>;

/**
 * TableHeader component (<th></th>), with order by state.
 */
export default class TableHeader extends MithrilTsxComponent<Attrs> {
    // The css classes for order directions.
    private readonly orderByDescClass: string = 'jf-sort-desc';
    private readonly orderByAscClass: string = 'jf-sort-asc';

    getOrderByClass = (orderDirection: string | null) => {
        switch (orderDirection) {
            case OrderDirection.Ascending:
                return this.orderByAscClass;
            case OrderDirection.Descending:
                return this.orderByDescClass;
            default:
                return null;
        }
    }

    view(vnode: Vnode) {
        const { column, orderDirection, onClick } = vnode.attrs;
        return (
            <th
                scope="col"
                class={`jf-th ${orderDirection ? this.getOrderByClass(orderDirection) : null}`}
                onclick={onClick}
            >
                {column.header}
            </th>
        );
    }
}
