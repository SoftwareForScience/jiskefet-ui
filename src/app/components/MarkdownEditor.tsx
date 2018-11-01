/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import MarkdownViewer from './MarkdownViewer';

/**
 * Markdown editor with preview.
 */
export default class MarkdownEditor implements m.Component {
    private callback: (content: string) => void;
    private content: string;

    constructor(vnode: any) {
        this.callback = vnode.attrs.postContent;
    }

    /**
     * Bind value to content and executes the callback.
     */
    onTextChange = (event: any): void => {
        this.content = event.target.value;
        this.callback(this.content);
    }

    view() {
        return (
            <div class="row">
                <div class="col-md-6 jf-markdown-wrapper">
                    <textarea id="markdown" placeholder="Type your description here" oninput={this.onTextChange} />
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
