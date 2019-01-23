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
    /**
     * The unique identifier of the modal,
     * used to open the correct modal when using multiple modals.
     */
    id: string;
    /**
     * Title of the modal self
     */
    title: string;

    buttonClass: string;
}

type Vnode = m.Vnode<Attrs, Modal>;

/**
 * This component creates a modal and adds content to its body.
 */
export default class Modal extends MithrilTsxComponent<Attrs> {
    view(vnode: Vnode) {
        const { id, title, buttonClass } = vnode.attrs;
        return (
            <div>
                <button
                    type="button"
                    class={`${buttonClass} float-right`}
                    data-toggle="modal"
                    data-target={`#${id}`}
                >
                    {title}
                </button>
                <div class="modal mt-5" tabindex="-1" role="dialog" id={id}>
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">{title}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                {vnode.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
