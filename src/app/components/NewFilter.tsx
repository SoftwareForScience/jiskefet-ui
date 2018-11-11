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
import State from '../models/State';

interface InputField {
    name: string;
    type: string;
    value?: string | null;
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
     * The key used in FilterModel's Filters object to save the filters in.
     */
    filterKey: string;
    /**
     * Function being called when the event happens on an input field.
     */
    onEvent: () => void;
}

type Vnode = m.Vnode<Attrs, NewFilter>;
// type VnodeDOM = m.VnodeDOM<Attrs, NewFilter>;

export default class NewFilter extends MithrilTsxComponent<Attrs> {
    view(vnode: Vnode) {
        const { inputFields, filterKey, onEvent } = vnode.attrs;
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
                                            // Todo: maybe too tightly coupled
                                            State.FilterModel.setFilter(filterKey, inputField.name, event.target.value);
                                            onEvent();
                                        }
                                    }}
                                    value={inputField.value}
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
