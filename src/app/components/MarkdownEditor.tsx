/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import MarkdownViewer from './MarkdownViewer';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import { Event } from '../interfaces/Event';

interface Attrs {
    postContent: (content: string) => void;
}

type Vnode = m.Vnode<Attrs, MarkdownEditor>;

/**
 * Markdown editor with preview.
 */
export default class MarkdownEditor extends MithrilTsxComponent<Attrs> {
    content: string;

    constructor(vnode: Vnode) {
        super();
    }

    /**
     * Bind event.target.value to this.content;
     */
    handleInput = (event: Event): void => {
        this.content = event.target.value;
    }

    view(vnode: Vnode) {
        return (
            <div class="row">
                <div class="col-md-6 jf-markdown-wrapper">
                    <textarea
                        id="markdown"
                        placeholder="Type your description here"
                        oninput={(event: Event) => {
                            this.handleInput(event);
                            vnode.attrs.postContent(this.content);
                        }}
                    />
                </div>
                <div class="col-md-6 jf-markdown-wrapper">
                    <div class="jf-markdown-preview">
                        <MarkdownViewer content={this.content} />
                    </div>
                </div>
            </div>
        );
    }
}
