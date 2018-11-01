/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import * as marked from 'marked';

export default class MarkdownViewer implements m.Component {
    content: string;

/**
 * background-color: white;
 * border-radius: 3px;
 * border: solid 1px #E0E0E0;
 * word-break: break-word;
 */

    constructor(vnode: any) {
        this.content = vnode.attrs.content;
    }

    oncreate() {
        this.parse();
    }

    parse() {
        const markdownViewer = document.getElementById('markdown-viewer');
        if (markdownViewer && this.content) {
            markdownViewer.innerHTML = marked(this.content);
        }
    }

    onupdate(vnode: any) {
        this.content = vnode.attrs.content;
        this.parse();
    }

    view() {
        return (
            <div id="markdown-viewer" />
        );
    }
}
