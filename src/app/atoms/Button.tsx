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
    type: string;
    text: string;
    className: string;
    onClick?: (event: Event) => void;
    name?: string;
    value?: string | number;
    dataToggle?: string;
    dataTarget?: string;
    disabled?: boolean;
}

type Vnode = m.Vnode<Attrs, Button>;

export default class Button extends MithrilTsxComponent<Attrs> {
    view(vnode: Vnode) {
        const { type, text, name, value, className, onClick, dataToggle, dataTarget, disabled } = vnode.attrs;
        if (!disabled) {
            return (
                <button
                    type={type}
                    class={className}
                    name={name}
                    value={value}
                    data-toggle={dataToggle}
                    data-target={dataTarget}
                    onClick={onClick}
                >
                    {text}
                </button>
            );
        } else {
            return (
                <button
                    type={type}
                    class={className}
                    name={name}
                    value={value}
                    data-toggle={dataToggle}
                    data-target={dataTarget}
                    onClick={onClick}
                    disabled
                >
                    {text}
                </button>
            );
        }
    }
}
