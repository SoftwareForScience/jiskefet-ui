/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import * as _ from 'lodash';
import { IFilterState, FilterValue } from '../interfaces/Filter';

interface Attrs {
    /**
     * The values of the filters.
     */
    filters: IFilterState;

    /**
     * Function being called when the event happens on a button click.
     */
    onEvent: (key: string) => void;

    /**
     * Function being called when the event happens on a button click.
     */
    onEventAll: () => void;

    /**
     * Boolean that asserts if there are any active filters
     */
    ignoredFilters: string[];
}

type Vnode = m.Vnode<Attrs, Badges>;

export default class Badges extends MithrilTsxComponent<Attrs> {

    filteredFilters(filters: IFilterState, ignoredFilters: string[]) {
        return _.omit(filters, ignoredFilters);
    }

    assertActiveFilters(filters: IFilterState) {
        let assertActiveFilters: boolean = false;
        Object.keys(filters).map((key: string) => {
            if (filters[key] !== null) {
                assertActiveFilters = true;
            }
        });
        return assertActiveFilters;
    }

    sliceValue(value: FilterValue) {
        if ((value !== null) && (value.toString().length > 5)) {
            return `${value.toString().slice(0, 5)}...`;
        } else if (value !== null) {
            return value.toString();
        } else {
            return '';
        }
    }

    view(vnode: Vnode) {
        const { filters, onEvent, onEventAll, ignoredFilters } = vnode.attrs;
        const filteredFilters = this.filteredFilters(filters, ignoredFilters);
        const activeFilters = this.assertActiveFilters(filteredFilters);
        return (
            <div class="row mb-2 ">
                <div class="col-md-10">
                    {filteredFilters && Object.keys(filteredFilters).map((key: string) =>
                        (
                            filteredFilters[key] !== null ?
                                <button
                                    class="badge badge-light mr-1 jf-badge"
                                    id={key}
                                    onclick={() => {
                                        onEvent(key);
                                        delete filteredFilters[key];
                                    }}
                                >
                                    <i class="fas fa-times" />
                                    &nbsp;{`${key}: ${this.sliceValue(filteredFilters[key])}`}
                                </button> :
                                ''
                        )
                    )}
                </div>
                <div class="col-md-2">
                    {activeFilters ?
                        <button
                            id="removeFilters"
                            class="badge badge-danger jf-badge jf-remove-badge float-right"
                            onclick={onEventAll}
                        >
                            <i class="fas fa-times" />
                            &nbsp;Remove filters
                        </button> :
                        ''
                    }
                </div>
            </div>
        );
    }
}
