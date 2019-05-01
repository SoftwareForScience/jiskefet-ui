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
    id: string;
    text: string;
    className?: string;
    autofocus?: string;
}

type Vnode = m.Vnode<Attrs, Label>;

export default class Label extends MithrilTsxComponent<Attrs> {
    view(vnode: Vnode) {
        const { id, text, className, autofocus } = vnode.attrs;
        return (
            <label autofocus={autofocus} class={className} for={id}>{text}</label>
        );
    }
}
