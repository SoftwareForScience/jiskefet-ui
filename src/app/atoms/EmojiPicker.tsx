/*
* Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
*
* This software is distributed under the terms of the
* GNU General Public Licence version 3 (GPL) version 3,
* copied verbatim in the file "LICENSE"
*/

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import { getAllEmoji } from '../utility/EmojiUtil';

interface Attrs {
    id: string;
    onSelect: (emoji: string) => void;
}

type Vnode = m.Vnode<Attrs, EmojiPicker>;

/**
 * Wrapper component holding the main content of the app.
 */
export default class EmojiPicker extends MithrilTsxComponent<Attrs> {
    view(vnode: Vnode) {
        const { id, onSelect } = vnode.attrs;
        return(
                <div
                    class="dropdown-toggle emojipicker-toggler"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    id={id}
                >
                😁
                <div class="dropdown-menu dropdown-menu-right emojipicker-container ">
                            <div class="jf-align-right mr-2 show">
                                {
                                    getAllEmoji.map((x: string) =>
                                    // tslint:disable-next-line
                                    <div
                                        class="emojipicker-column"
                                        onclick={() => onSelect(x)}
                                    >
                                        {x}
                                    </div>
                                )}
                            </div>
                </div>
                </div>
        );
    }
}
