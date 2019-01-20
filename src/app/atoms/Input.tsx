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
    formType: string;
    className: string;
    placeholder?: string;
    required?: boolean;
    value?: string | number;
    oninput?: (event: Event) => void;
}

type Vnode = m.Vnode<Attrs, Input>;

export default class Input extends MithrilTsxComponent<Attrs> {
    view(vnode: Vnode) {
        const { id, formType, className, placeholder, required, value, oninput } = vnode.attrs;
        return (
            <input
                id={id}
                type={formType}
                class={className}
                placeholder={placeholder}
                required={required}
                value={value}
                oninput={oninput}
            />
        );
    }
}
