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
import Collapse from './Collapse';

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
            <Collapse 
                title="😁"
                id={id}
                isInitiallyCollapsed={true}
                style={{ padding: '0 0 0 0' }}
            >
                <div class="emojipicker-container">
                    {
                        getAllEmoji.map((x: string) =>
                                <div 
                                    class="emojipicker-column"
                                    onclick={() => onSelect(x)}
                                >
                                    {x}
                                </div>
                    )}
                </div>
            </Collapse>
        );
    }
}

