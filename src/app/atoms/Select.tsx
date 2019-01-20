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

interface Attrs {
    id: string;
    className: string;
    name?: string;
    placeholder?: string;
    required?: boolean;
    oninput?: (event: Event) => void;
    options: string[];
}

type Vnode = m.Vnode<Attrs, Select>;

export default class Select extends MithrilTsxComponent<Attrs> {
    view(vnode: Vnode) {
        const { id, name, className, placeholder, required, oninput, options } = vnode.attrs;
        return (
            <select
                id={id}
                name={name}
                class={className}
                placeholder={placeholder}
                required={required}
                oninput={oninput}
            >
                {
                    options.map((option: string) => (
                        <option value={option}>{option}</option>
                    ))
                }
            </select>
        );
    }
}
