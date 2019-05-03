/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import { IColumn } from '../interfaces/Column';
import TableHeader from '../atoms/TableHeader';
import { OrderDirection } from '../enums/OrderDirection';

interface Attrs {
    /**
     * The data that the table displays. Each object in the array represents
     * a row where each field represents the column and its value.
     */
    data: Array<{ [column: string]: any }>; // Todo: better typedef needed
    /**
     * The columns (table headers) for the table.
     */
    columns: IColumn[];
    /**
     * The optional css class for the table.
     */
    className?: string;
    /**
     * Function being called when a table header is clicked.
     */
    onHeaderClick?: (accessor: string) => void;
    orderBy?: string;
    orderDirection?: OrderDirection;
}

type Vnode = m.Vnode<Attrs, Table>;

export default class Table extends MithrilTsxComponent<Attrs> {
    /**
     * Returns the order direction for a column, based on orderBy and orderDirection.
     */
    getOrder = (column: IColumn, orderBy: string, orderDirection: OrderDirection): OrderDirection | null => {
        if (orderBy === column.accessor) {
            return orderDirection;
        } else {
            return null;
        }
    }

    view(vnode: Vnode) {
        const { columns, className, data, onHeaderClick, orderBy, orderDirection } = vnode.attrs;
        return (
            <div class="table-responsive">
                <table class={`table table-sm table-bordered table-hover jf-table ${className || ''}`}>
                    <thead class="thead-light">
                        <tr>
                            {columns && columns.map((column: IColumn) =>
                                // tslint:disable-next-line:jsx-key
                                <TableHeader
                                    column={column}
                                    // fix ternary
                                    orderDirection={(orderBy && orderDirection) ?
                                        this.getOrder(column, orderBy, orderDirection) : null}
                                    onClick={() => (onHeaderClick ? onHeaderClick(column.accessor) : null)}
                                />
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((row: object) =>
                            // tslint:disable-next-line:jsx-key
                            <tr>
                                {columns.map((column: IColumn) => (
                                    <td>
                                        {
                                            (column.cell ?
                                                column.cell(row)
                                                : row[column.accessor] as string | number | boolean
                                            )}
                                    </td>
                                ))}
                            </tr>
                        )}
                    </tbody>
                </table>
                {data.length === 0 && <div class="row">
                    <div class="col-md-12">
                        <div class="alert alert-light text-center" role="alert">
                            No results found.
                        </div>
                    </div>
                </div>}
            </div>
        );
    }
}
