/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import MarkdownViewer from './MarkdownViewer';

export default class MarkdownEditor implements m.Component {
    private postContent: (content: string) => void;
    private content: string;

    constructor(vnode: any) {
        this.postContent = vnode.attrs.postContent;
    }

    onTextChange = (e: any): void => {
        console.log('text change');
        this.content = e.target.value;
        this.postContent(this.content);
    }

    view() {
        return (
            <div class="row">
                <textarea id="markdown" class="col-md-6" oninput={this.onTextChange} />
                <div class="col-md-6">
                    <MarkdownViewer content={this.content} />
                </div>
            </div>
        );
    }
}
