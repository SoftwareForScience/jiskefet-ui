import * as m from 'mithril';

interface Column {
    header: string;
    accessor: string;
    cell?: (row: object) => object;
}

export default class Table implements m.Component {
    data: any[];
    columns: Column[];

    constructor(vnode: any) {
        this.data = vnode.attrs.data;
        this.columns = vnode.attrs.columns;
    }

    view() {
        return (
            <div class="table-responsive">
                <table class="table table-bordered">
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
