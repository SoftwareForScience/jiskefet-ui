/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import { ModalBody } from '../interfaces/ModalBody';

interface Attrs {
    /**
     * Title of the modal self
     */
    title: string;

    /**
     * This attribute contains a function that returns the JSX.Element
     * that will be the body and an optianl variable that can be given
     * to that function.
     */
    body: ModalBody;
}

type Vnode = m.Vnode<Attrs, Modal>;

/**
 * This component creates a modal and adds content to its body.
 */
export default class Modal extends MithrilTsxComponent<Attrs> {
    view(vnode: Vnode) {
        const { title, body } = vnode.attrs;
        return (
            <div>
                <div class="modal" tabindex="-1" role="dialog" id="modal">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">{title}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                            {body.text
                            ? body.content(body.text)
                            : body.content()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
