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

/**
 * Css class that defines the size (bootstrap)
 */
export enum ButtonSize {
    SMALL = 'btn-sm',
    MEDIUM = 'btn-md',
    LARGE = 'btn-lg',
}

/**
 * Css class that defines the styling (bootstrap)
 */
export enum ButtonClass {
    DEFAULT = 'btn btn-primary',
    SUCCESS = 'btn btn-success',
    LIGHT = 'btn btn-light',
    DARK = 'btn btn-dark',
    NAV = 'dropdown-item jf-dropdown-item',
    CLOSE = 'close'
}

/**
 * Type that defines the operation of the button.
 */
export enum ButtonType {
    BUTTON = 'button',
    RESET = 'reset',
    SUBMIT = 'submit',
}

interface Attrs {
    text: string | JSX.Element;
    buttonClass: ButtonClass;
    buttonSize?: ButtonSize;
    buttonType?: ButtonType;
    id?: string | number;
    margin?: string;
    href?: string;
    onClick?: (event: Event) => void;
    name?: string;
    value?: string | number;
    dataToggle?: string;
    dataTarget?: string;
    dataDismiss?: string;
    ariaLabel?: string;
    disabled?: boolean;
}

type Vnode = m.Vnode<Attrs, Button>;

export default class Button extends MithrilTsxComponent<Attrs> {
    view(vnode: Vnode) {
        const {
            buttonType: type,
            text,
            name,
            value,
            id,
            buttonClass,
            buttonSize,
            margin,
            href,
            onClick,
            dataToggle,
            dataTarget,
            dataDismiss,
            ariaLabel,
            disabled
        } = vnode.attrs;
        return (
            <button
                type={type}
                class={`${buttonClass} ${buttonSize} ${margin}`}
                id={id}
                name={name}
                value={value}
                href={href}
                data-toggle={dataToggle}
                data-target={dataTarget}
                data-dismiss={dataDismiss}
                aria-label={ariaLabel}
                onClick={onClick}
                disabled={disabled}
            >
                {text}
            </button>
        );
    }
}
