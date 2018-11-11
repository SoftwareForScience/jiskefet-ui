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
    filters: { [key: string]: string | number | null };
}

type Vnode = m.Vnode<Attrs, NewFilter>;

export default class NewFilter extends MithrilTsxComponent<Attrs> {
    view(vnode: Vnode) {
        const { inputFields, onEvent, filters } = vnode.attrs;
        return (
            <div class="filters-responsive">
                <div class="bg-light rounded p-4 shadow-sm border">
                    {inputFields && inputFields.map((inputField: InputField) =>
                        (
                            <div class="form-group">
                                <label key={inputField.name} for={inputField.name}>
                                    {inputField.label || `Filter for ${inputField.name}`}
                                </label>
                                <input
                                    type={inputField.type}
                                    class="form-control"
                                    id={inputField.name}
                                    {...{
                                        [inputField.event]: (event: Event) => {
                                            onEvent(inputField.name, event.target.value);
                                        }
                                    }}
                                    value={filters[inputField.name]}
                                    placeholder={inputField.placeholder}
                                />
                            </div>
                        )
                    )}
                </div>
            </div>
        );
    }
}
