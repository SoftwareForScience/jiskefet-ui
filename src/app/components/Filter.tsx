/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';

interface FilterParam {
    name: string;
    type: string;
    value: any | null;
    placeholder?: string;
    label?: string;
}

export default class Filter implements m.Component {
    // Attrs
    private inputFields: FilterParam[];
    private fetch;
    private route: string;

    // Class props
    private routeFilters: object; // Filters that are in the route's query.
    private mergedFilters: FilterParam[]; // The data from inputFields and the values from routeFilters combined.

    constructor(vnode: any) {
        this.routeFilters = m.route.param();
        this.inputFields = vnode.attrs.inputFields;
        this.fetch = vnode.attrs.fetch;
        this.route = vnode.attrs.route;
        this.mergedFilters = this.mergeFilters(this.inputFields, this.routeFilters);
        this.fetchWithFilters(this.routeFilters);
    }

    /**
     * Merges the filterParams with the filters in the route.
     */
    mergeFilters = (inputParams: FilterParam[], routeFilters: object) => {
        const merged = inputParams.map((filter: FilterParam) => ({
            ...filter,
            value: routeFilters[filter.name] || null
        }));
        return merged;
    }

    /**
     * Add a filter from an input element to the filters class property.
     */
    addFilter = (event) => {
        const key = event.target.id;
        const value = event.target.value;
        value ? this.routeFilters[key] = value : delete this.routeFilters[key];
        this.updateRoute(this.routeFilters, this.route);
        this.mergedFilters = this.mergeFilters(this.inputFields, this.routeFilters);
        this.fetchWithFilters(this.routeFilters);
    }

    /**
     * Update the route with query params in filters
     * @param filters The filters.
     * @param route e.g. 'runs', as in site.com/runs
     */
    updateRoute(filters: object, route: string) {
        const queryString = m.buildQueryString(filters);
        m.route.set(`/${route}?${queryString}`);
    }

    /**
     * Fetch the entities that match the filters.
     * Example: {key: 'value'} will fetch with a query param of '?key=value'.
     * @param filters The filters.
     */
    fetchWithFilters(filters: object) {
        const queryString = m.buildQueryString(filters);
        this.fetch(queryString);
    }

    view() {
        return (
            <div class="filters-responsive">
                <div class="bg-light rounded p-4 shadow-sm border">
                    {this.mergedFilters && this.mergedFilters.map(filter =>
                        (
                            <div class="form-group">
                                <label key={filter.name} for={filter.name}>
                                    {filter.label || `Filter for ${filter.name}`}
                                </label>
                                <input
                                    type={filter.type}
                                    class="form-control"
                                    id={filter.name}
                                    onblur={this.addFilter}
                                    value={filter.value}
                                    placeholder={filter.placeholder}
                                />
                            </div>
                        )
                    )}
                </div>
            </div>
        );
    }
}
