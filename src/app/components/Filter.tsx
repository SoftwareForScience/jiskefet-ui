import * as m from 'mithril';

export default class Filter implements m.Component {
    filterParams: any[];
    private fetchEntity;
    private updateFilters;
    private filters: any;
    private entity: any;

    constructor(vnode: any) {
        this.filterParams = vnode.attrs.filterParams;
        this.fetchEntity = vnode.attrs.fetchEntity;
        this.updateFilters = vnode.attrs.updateFilters;
        this.entity = vnode.attrs.entity;
    }

    /**
     * Add a filter from an input element to the filters class property.
     */
    addFilter = (event) => {
        const key = event.target.id;
        const value = event.target.value;
        this.filters = this.updateFilters(key, value);
        console.log(this.filters);
        this.updateRoute();
        this.fetch();
    }

    /**
     * Update the route with query params in queryObject
     */
    updateRoute() {
        const queryString = m.buildQueryString(this.filters);
        // tslint:disable-next-line:prefer-template
        m.route.set('/' + this.entity + '/?' + queryString);
    }

    fetch() {
        const queryString = m.buildQueryString(this.filters);
        this.fetchEntity(queryString);
    }

    view() {
        return (
            <div class="filters-responsive">
                {this.filterParams && this.filterParams.map(filter =>
                    (
                        <div class="form-group">
                            <label key={filter.name} for={filter}>Filter for {filter.name}</label>
                            <input type={filter.type} class="form-control" id={filter.name} onchange={this.addFilter} />
                        </div>
                    )
                )}
            </div>
        );
    }
}
