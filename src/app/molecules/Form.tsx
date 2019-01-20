/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import Button from '../atoms/Button';
import { Event } from '../interfaces/Event';

interface Attrs {
    title: string;
    className: string;
    formList: any[];
    onSubmit: (event: Event) => void;
    extraElement?: JSX.Element;
    infoModal?: JSX.Element;
}

type Vnode = m.Vnode<Attrs, Form>;

/**
 * Wrapper component holding the main content of the app.
 */
export default class Form extends MithrilTsxComponent<Attrs> {
    view(vnode: Vnode) {
        const { title, className, formList, onSubmit, extraElement, infoModal } = vnode.attrs;
        return (
            <form
                onsubmit={onSubmit}
            >
                <div class="container-fluid">
                    <div class="row">
                        <div class={className}>
                            {
                                title && (
                                    <div>
                                        <h3>
                                            {title}
                                        </h3>
                                    </div>
                                )}
                            {
                                formList.map((form: any) => (
                                    <div class="form-group">
                                        <label for={form.id}>{form.label}</label>
                                        <div class="field">
                                            {
                                                form.inputType === 'input' ?
                                                    (
                                                        <input
                                                            id={form.id}
                                                            type={form.type}
                                                            class="form-control"
                                                            placeholder={form.placeholder}
                                                            required
                                                            oninput={form.onInput}
                                                        />
                                                    ) : (
                                                        <select
                                                            id={form.id}
                                                            class="form-control"
                                                            name={form.name}
                                                            required
                                                            onclick={form.onInput}
                                                        >
                                                            {
                                                                form.options.map((option: string) => (
                                                                    <option value={option}>{option}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    )
                                            }

                                        </div>
                                    </div>
                                ))
                            }
                            {extraElement}
                            <br />
                            <Button type="submit" className="btn btn-primary" text="Submit" />
                            {infoModal}
                        </div>
                    </div>
                </div>
            </form >
        );
    }
}
