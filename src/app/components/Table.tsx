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

    view() {
        return (
            <div class="table-responsive-md">
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
                            <tr key={row}>
                                {this.columns.map((column: Column) => (
                                    <td key={row[column.accessor]}>
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
