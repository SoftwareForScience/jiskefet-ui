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

export enum InputSize {
    SMALL = 'col-md-2',
    MEDIUM = 'col-md-4',
    LARGE = 'col-md-6',
}

interface Attrs {
    id: string;
    name?: string;
    inputType: string;
    className: string;
    inputSize?: InputSize;
    placeholder?: string;
    autofocus?: string;
    required?: boolean;
    dataShowCaption?: string;
    value?: string | number;
    oninput?: (event: IEvent) => void;
    children?: JSX.Element;
}

type Vnode = m.Vnode<Attrs, Input>;

export default class Input extends MithrilTsxComponent<Attrs> {
    view(vnode: Vnode) {
        const {
            id,
            name,
            inputType,
            className,
            inputSize,
            placeholder,
            autofocus,
            required,
            dataShowCaption,
            value,
            oninput,
            children
        } = vnode.attrs;
        return (
            <input
                id={id}
                name={name}
                type={inputType}
                class={`${className} ${inputSize}`}
                placeholder={placeholder}
                required={required}
                autofocus={autofocus}
                value={value}
                data-show-caption={dataShowCaption}
                oninput={oninput}
            >
                {children}
            </input>
        );
    }
}
