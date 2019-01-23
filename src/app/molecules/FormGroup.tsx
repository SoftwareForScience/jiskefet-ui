/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';

interface Attrs {
    formGroupStyle?: string;
    label?: JSX.Element;
    field: JSX.Element;
}

type Vnode = m.Vnode<Attrs, FormGroup>;

export default class FormGroup extends MithrilTsxComponent<Attrs> {

    view(vnode: Vnode) {
        const { formGroupStyle, label, field } = vnode.attrs;
        return (
            <div class={`form-group ${formGroupStyle}`}>
                {label}
                <div class="field">
                    {field}
                </div>
            </div>
        );
    }
}
