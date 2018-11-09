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

interface Attrs {
    data: object[];
    columns: Column[];
    className?: string; // example: 'font-sm bg-dark'
}

type Vnode = m.Vnode<Attrs, Table>;

export default class Table extends MithrilTsxComponent<Attrs> {
    view(vnode: Vnode) {
        const { columns, className, data } = vnode.attrs;
        return (
            <div class="table-responsive">
                <table class={`table table-sm table-bordered table-hover shadow-sm ${className || ''}`}>
                    <thead class="thead-light">
                        <tr>
                            {columns && columns.map((column: Column) =>
                                <th scope="col" key={column.accessor}>
                                    {column.header}
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((row: object) =>
                            // tslint:disable-next-line:jsx-key
                            <tr>
                                {columns.map((column: Column) => (
                                    <td>
                                        {(column.cell ? column.cell(row) : row[column.accessor])}
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
