/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import * as marked from 'marked';

/**
 * Displays markdown as html.
 */
export default class MarkdownViewer implements m.Component {
    content: string;

    constructor(vnode: any) {
        this.content = vnode.attrs.content;
    }

    oncreate() {
        this.parse(this.content);
    }

    onupdate(vnode: any) {
        this.content = vnode.attrs.content;
        this.parse(this.content);
    }

    /**
     * Inserts raw markdown content into viewer as HMTL.
     */
    parse(content: string) {
        const markdownViewer = document.getElementById('jf-markdown-viewer');
        if (markdownViewer) {
            if (content) {
                markdownViewer.innerHTML = marked(content);
            } else {
                markdownViewer.innerHTML = "";
            }
        }
    }

    view() {
        return (
            <div id="jf-markdown-viewer" />
        );
    }
}
