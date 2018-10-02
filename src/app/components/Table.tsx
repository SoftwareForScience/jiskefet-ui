import * as m from 'mithril';

export default class Table implements m.Component {
    data: any[];
    columns: any[];

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
                            {this.columns && this.columns.map(col => <th scope="col" key={col}>{col}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {this.data && this.data.map(row =>
                            <tr key={row}>
                                {Object.keys(row).map((key) =>
                                    (<td key={row[key]}>
                                        {row[key]}
                                    </td>)
                                )}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}
