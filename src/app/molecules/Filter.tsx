/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import { IEvent } from '../interfaces/Event';
import Collapse from '../atoms/Collapse';
import { IFilterState, FilterName } from '../interfaces/Filter';
import { store } from '../redux/configureStore';
import { resetFilters } from '../redux/ducks/filter/actions';

interface InputField {
    name: string; // name should exist as a key in the filters attribute.
    type: string;
    placeholder?: string;
    label?: string;
    event: string;
}

interface Attrs {
    /**
     * The input fields used for filtering.
     */
    inputFields: InputField[];
    /**
     * Function being called when the event happens on an input field.
     */
    onEvent: (key: string, value: string | number) => void;
    /**
     * The values of the filters.
     */
    filters: IFilterState;
}

type Vnode = m.Vnode<Attrs, Filter>;

export default class Filter extends MithrilTsxComponent<Attrs> {

    async oninit() {
        await store.dispatch(resetFilters(FilterName.Log));
    }
    view(vnode: Vnode) {
        const { inputFields, onEvent, filters } = vnode.attrs;
        return (
            <div>
                <Collapse
                    id={'filters'}
                    icon={<span class="fas fa-filter" />}
                    title={'Filters'}
                >
                    {inputFields && inputFields.map((inputField: InputField) =>
                        (
                            <Collapse
                                id={inputField.name}
                                icon={
                                    <i
                                        class="fas fa-angle-down mt-2 jf-rotate-if-collapsed jf-rotate-if-not-collapsed"
                                    />
                                }
                                title={inputField.label ? inputField.label : inputField.name}
                            >
                                <div class="form-group mt-2">
                                    <input
                                        type={inputField.type}
                                        class="form-control form-control-sm"
                                        id={inputField.name}
                                        {...{
                                            [inputField.event]: (event: IEvent) => {
                                                onEvent(inputField.name, event.target.value);
                                            }
                                        }}
                                        value={filters[inputField.name]}
                                        placeholder={inputField.placeholder}
                                    />
                                </div>
                            </Collapse>
                        )
                    )}
                </Collapse>
            </div>
        );
    }
}
