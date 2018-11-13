/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import { Event } from '../interfaces/Event';

interface FilterParam {
    name: string;
    type: string;
    value?: string | null;
    placeholder?: string;
    label?: string;
    event: string;
}

interface Attrs {
    inputFields: FilterParam[];
    fetch: (queryString: string) => void;
    route: string;
}

interface RouteFilters {
    [name: string]: string;
}

type Vnode = m.Vnode<Attrs, Filter>;
type VnodeDOM = m.VnodeDOM<Attrs, Filter>;

export default class Filter extends MithrilTsxComponent<Attrs> {
    private routeFilters: RouteFilters; // The route's query parameters.
    private mergedFilters: FilterParam[]; // The data from inputFields and the values from routeFilters combined.

    constructor(vnode: Vnode) {
        super();
        this.routeFilters = m.route.param() as RouteFilters;
        this.mergedFilters = this.mergeFilters(vnode.attrs.inputFields, this.routeFilters);
    }

    /**
     * Merges the filterParams with the filters in the route.
     */
    mergeFilters = (inputParams: FilterParam[], routeFilters: RouteFilters): FilterParam[] => {
        const merged: FilterParam[] = inputParams.map((filter: FilterParam) => ({
            ...filter,
            value: routeFilters[filter.name] || null
        }));
        return merged;
    }

    /**
     * Update the route with query params in routeFilters.
     * @param routeFilters The filters object to be inserted into the route as query params.
     * @param route e.g. 'runs', as in site.com/runs
     */
    updateRoute(routeFilters: RouteFilters, route: string): void {
        const queryString: string = m.buildQueryString(routeFilters);
        m.route.set(`/${route}?${queryString}`);
    }

    /**
     * Update the filters. If value is null, remove the key from route filters.
     */
    updateFilter = (key: string, value: string | null, filters: RouteFilters): RouteFilters => {
        value ? filters[key] = value : delete filters[key];
        return filters;
    }

    /**
     * Fetch the entities that match the filters.
     * Example: {key: 'value'} will fetch with a query param of '?key=value'.
     * @param filters The filters.
     */
    fetchWithFilters = (filters: object, fetch: (queryString: string) => void) => {
        const queryString: string = m.buildQueryString(filters);
        fetch(queryString);
    }

    oninit(vnode: VnodeDOM) {
        this.fetchWithFilters(this.routeFilters, vnode.attrs.fetch);
    }

    view(vnode: Vnode) {
        return (
            <div class="filters-responsive">
                <div class="bg-light rounded p-4 shadow-sm border">
                    {this.mergedFilters && this.mergedFilters.map((filter: FilterParam) =>
                        (
                            <div class="form-group">
                                <label key={filter.name} for={filter.name}>
                                    {filter.label || `Filter for ${filter.name}`}
                                </label>
                                <input
                                    type={filter.type}
                                    class="form-control"
                                    id={filter.name}
                                    {...{
                                        [filter.event]: (event: Event) => {
                                            this.routeFilters = this.updateFilter(
                                                event.target.id,
                                                event.target.value,
                                                this.routeFilters);
                                            this.updateRoute(
                                                this.routeFilters,
                                                vnode.attrs.route);
                                            this.mergedFilters = this.mergeFilters(
                                                vnode.attrs.inputFields,
                                                this.routeFilters);
                                            this.fetchWithFilters(
                                                this.routeFilters,
                                                vnode.attrs.fetch);
                                        }
                                    }}
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
