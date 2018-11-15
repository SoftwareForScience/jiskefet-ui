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
    /**
     * This key sets the viewer id in html so that there will be no
     * conflicts between multiple markdown viewers.
     */
    key: string;

    /**
     * This string contains the markdown text that needs to be parsed to
     * html.
     */
    content: string;
}

type Vnode = m.Vnode<Attrs, MarkdownViewer>;
type VnodeDOM = m.VnodeDOM<Attrs, MarkdownViewer>;

/**
 * Displays markdown as html.
 */
export default class MarkdownViewer extends MithrilTsxComponent<Attrs> {

    oncreate(vnode: VnodeDOM) {
        this.parse(vnode.attrs.key, vnode.attrs.content);
    }

    onupdate(vnode: VnodeDOM) {
        this.parse(vnode.attrs.key, vnode.attrs.content);
    }

    /**
     * Inserts raw markdown content into viewer as HTML.
     */
    parse(key: string, content: string): void {
        const markdownViewer: HTMLElement | null = document.getElementById(key);
        if (markdownViewer) {
            if (content) {
                markdownViewer.innerHTML = marked(content);
            } else {
                markdownViewer.innerHTML = '';
            }
        }
    }
    view(vnode: Vnode) {
        return (
            <div class="jf-markdown-wrapper" >
                <div id={vnode.attrs.key} class="jf-markdown-viewer" />
            </div >
        );
    }
}
