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

interface Attrs {
    /**
     * The values of the filters.
     */
    filters: { [key: string]: string | number | null };

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

    filteredFilters(filters: { [key: string]: string | number | null }, ignoredFilters: string[]) {
        return _.omit(filters, ignoredFilters);
    }

    view(vnode: Vnode) {
        const { filters, onEvent, onEventAll, ignoredFilters } = vnode.attrs;

        const filteredFilters = this.filteredFilters(filters, ignoredFilters);
        return (
            <div class="pr-1 pb-2 mb-2">
                {filteredFilters && Object.keys(filteredFilters).map((key: string) =>
                    (
                        filteredFilters[key] !== null ?
                            <button
                                class="badge badge-light mr-1"
                                id={key}
                                onclick={() => {
                                    onEvent(key);
                                    delete filteredFilters[key];
                                }}
                            >
                                <i class="fas fa-times" />
                                &nbsp;{key}
                            </button> :
                            ''
                    )
                )}
                {true ?
                    <button
                        id="removeFilters"
                        class="badge badge-danger float-right"
                        onclick={onEventAll}
                    >
                        <i class="fas fa-times" />
                        &nbsp;Remove filters
                    </button> :
                    ''
                }
            </div>
        );
    }
}
