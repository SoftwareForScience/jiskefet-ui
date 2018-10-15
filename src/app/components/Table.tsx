/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';

interface Column {
    header: string;
    accessor: string;
    cell?: (row: object) => object;
}

export default class Table implements m.Component {
    data: any[];
    columns: Column[];
    class: string; // example: 'font-sm bg-dark'

    constructor(vnode: any) {
        this.data = vnode.attrs.data;
        this.columns = vnode.attrs.columns;
        this.class = vnode.attrs.class;
    }

    onupdate(vnode: any) {
        if (this.columns !== vnode.attrs.columns) {
            this.columns = vnode.attrs.columns;
            // m.redraw();
        }
        if (this.data !== vnode.attrs.data) {
            this.data = vnode.attrs.data;
            m.redraw();
        }
    }

    view() {
        return (
            <div class="table-responsive-xl">
                <table class={`table table-sm table-bordered table-hover shadow-sm ${this.class}`}>
                    <thead>
                        <tr>
                            {this.columns && this.columns.map(column =>
                                <th scope="col" key={column.accessor}>
                                    {column.header}
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {this.data && this.data.map(row =>
                            // tslint:disable-next-line:jsx-key
                            <tr>
                                {this.columns.map((column: Column) => (
                                    <td>
                                        {column.cell ? column.cell(row) : row[column.accessor]}
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
