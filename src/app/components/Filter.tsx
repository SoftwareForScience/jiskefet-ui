import * as m from 'mithril';

export default class Filter implements m.Component {
    filters: any[];
    private fetchEntity;

    constructor(vnode: any) {
        this.filters = vnode.attrs.filters;
        console.log(vnode.attrs.filters);
        this.fetchEntity = vnode.attrs.fetchRuns;
    }

    /**
     * Add a filter from an input element to the filters class property.
     */
    addFilter = (event) => {
        const key = event.target.id;
        const value = event.target.value;
        value ? this.filters[key] = value : delete this.filters[key];
        this.updateRoute();
        this.fetch();
    }

    /**
     * Update the route with query params in queryObject
     */
    updateRoute() {
        const queryString = m.buildQueryString(this.filters);
        m.route.set('/?' + queryString);
    }

    fetch() {
        const queryString = m.buildQueryString(this.filters);
        this.fetchEntity(queryString);
    }

    view() {
        return (
            <div class="filters-responsive">
                {this.filters && this.filters.map(filter =>
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
