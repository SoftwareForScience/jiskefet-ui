import * as m from 'mithril';

interface IFilters {
    searchTerm?: string;
    minHours?: number;
    maxHours?: number;
    major?: string;
}

export class Filters implements m.Component {
    private filters: IFilters = {};
    private majors: string[] = [];
    private fetchActivities;

    constructor(vnode) {
        // Set filters from route's query params
        this.filters = m.route.param();
        this.fetchActivities = vnode.attrs.fetchActivities;
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
        this.fetchActivities(queryString);
    }

    view() {
        return (
            <div>
                <div class="form-group">
                    <label for="searchTerm">Zoek term(en) in beschrijving</label>
                    <input type="text" class="form-control" id="searchTerm" onchange={this.addFilter} placeholder="Vul een zoekterm in" value={this.filters.searchTerm} />
                </div>
                <div class="form-group">
                    <label for="minHours">Minimaal aantal uren</label>
                    <input type="number" class="form-control" id="minHours" onchange={this.addFilter} placeholder="Minimaal aantal uren" value={this.filters.minHours} />
                </div>
                <div class="form-group">
                    <label for="maxHours">Maximaal aantal uren</label>
                    <input type="number" class="form-control" id="maxHours" onchange={this.addFilter} placeholder="Maximaal aantal uren" value={this.filters.maxHours} />
                </div>
            </div>
        );
    }
}
