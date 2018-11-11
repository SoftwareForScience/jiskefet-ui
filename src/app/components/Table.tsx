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
    /**
     * The data that the table displays. Each object in the array represents
     * a row where each field represents the column and its value.
     */
    data: Array<{ [column: string]: any}>; // Todo: better typedef needed
    /**
     * The columns (table headers) for the table.
     */
    columns: Column[];
    /**
     * The optional css class for the table.
     */
    className?: string;
    /**
     * ...
     */
    filterKey?: string; // key for filters, e.g. 'log' or 'run'
    /**
     * Function being called when a table header is clicked.
     */
    onHeaderClick: () => void;
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
        const { columns, className, data, filterKey, onHeaderClick } = vnode.attrs;
        return (
            <div class="table-responsive">
                <table class={`table table-sm table-bordered table-hover shadow-sm jf-table ${className || ''}`}>
                    <thead class="thead-light">
                        <tr>
                            {columns && columns.map((column: Column) =>
                                // tslint:disable-next-line:jsx-key
                                <TableHeader
                                    column={column}
                                    orderDirection={filterKey && State.FilterModel.getFilters(filterKey)
                                        ? this.getOrder(column, State.FilterModel.getFilters(filterKey))
                                        : null}
                                    onClick={filterKey ? () => {
                                        State.FilterModel.switchOrderBy(filterKey, column.accessor);
                                        onHeaderClick();
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
