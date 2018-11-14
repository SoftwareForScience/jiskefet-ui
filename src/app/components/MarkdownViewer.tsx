/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import * as marked from 'marked';
import { MithrilTsxComponent } from 'mithril-tsx-component';

interface Attrs {
    content: string;
}

type VnodeDOM = m.VnodeDOM<Attrs, MarkdownViewer>;

/**
 * Displays markdown as html.
 */
export default class MarkdownViewer extends MithrilTsxComponent<Attrs> {

    oncreate(vnode: VnodeDOM) {
        this.parse(vnode.attrs.content);
    }

    onupdate(vnode: VnodeDOM) {
        this.parse(vnode.attrs.content);
    }

    /**
     * Inserts raw markdown content into viewer as HMTL.
     */
    parse(content: string): void {
        const markdownViewer: HTMLElement | null = document.getElementById('jf-markdown-viewer');
        if (markdownViewer) {
            if (content) {
                markdownViewer.innerHTML = marked(content);
            } else {
                markdownViewer.innerHTML = '';
            }
        }
    }

    view() {
        return (
            <div id="jf-markdown-viewer" />
        );
    }
}
