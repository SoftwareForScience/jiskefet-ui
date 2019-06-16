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
    className: string;
    style?: string;
    inputSize?: InputSize;
    name?: string;
    placeholder?: string;
    required?: boolean;
    oninput?: (event: IEvent) => void;
    optionValue?: string;
    optionText?: string;
    options: any[];
    hidden?: boolean;
    liveSearch?: boolean;
    defaultOption?: string | number | null;
}

type Vnode = m.Vnode<Attrs, Select>;

export default class Select extends MithrilTsxComponent<Attrs> {
    view(vnode: Vnode) {
        const { id, name,
            className, inputSize,
            placeholder, required,
            oninput, options,
            optionValue, optionText,
            defaultOption, hidden,
            style } = vnode.attrs;
        return (
            <select
                id={id}
                name={name}
                class={`${className} ${inputSize}`}
                placeholder={placeholder}
                required={required}
                oninput={oninput}
                hidden={hidden}
                style={style}
                value={defaultOption}
            >
                {
                    options.map((option: any) => (
                        optionValue && optionText
                            ? <option value={option[optionValue]}>{option[optionText]}</option>
                            : <option value={option}>{option}</option>
                    ))
                }
            </select>
        );
    }
}
