import * as m from 'mithril';

export class Filters implements m.Component {
    columns: any[];
    filters: any[];

    constructor(vnode: any) {
        this.columns = vnode.child.attrs.columns;
    }

    view() {
        return (
            <div class="filters-responsive">
                {this.columns && this.columns.forEach(column =>
                    <div class="form-group">
                        <label for={column + 'Filter'}>Filter for {column}</label>
                        <input type="text" class="form-control" id={column} />
                    </div>
                )}
            </div>
        );
    }
}
