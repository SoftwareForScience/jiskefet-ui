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
import TableHeader from './TableHeader';
import { OrderDirection } from '../enums/OrderDirection';
import State from '../models/State';

interface Attrs {
    data: object[];
    columns: Column[];
    className?: string; // example: 'font-sm bg-dark'
    filterKey?: string; // key for filters, e.g. 'log' or 'run'
}

type Vnode = m.Vnode<Attrs, Table>;

export default class Table extends MithrilTsxComponent<Attrs> {

    /**
     * Returns the order direction of a column, based on the values of the filters.
     */
    getOrder = (column: Column, filters: any): OrderDirection | null => {
        if (filters.orderBy === column.accessor) {
            return filters.orderDirection;
        } else {
            return null;
        }
    }

    view(vnode: Vnode) {
        const { columns, className, data, filterKey } = vnode.attrs;
        return (
            <div class="table-responsive">
                <table class={`table table-sm table-bordered table-hover shadow-sm jf-table ${className || ''}`}>
                    <thead class="thead-light">
                        <tr>
                            {columns && columns.map((column: Column) =>
                                // tslint:disable-next-line:jsx-key
                                <TableHeader
                                    column={column}
                                    orderDirection={filterKey && State.FilterModel.get(filterKey)
                                        ? this.getOrder(column, State.FilterModel.get(filterKey))
                                        : null}
                                    onClick={filterKey ? () => {
                                        State.FilterModel.changeOrderBy(filterKey, column.accessor);
                                        console.log(State.FilterModel.getAll());
                                    } : undefined}
                                />
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((row: object) =>
                            // tslint:disable-next-line:jsx-key
                            <tr>
                                {columns.map((column: Column) => (
                                    <td>
                                        {(column.cell ?
                                            column.cell(row)
                                            : row[column.accessor] as string | number | boolean)}
                                    </td>
                                ))}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}
