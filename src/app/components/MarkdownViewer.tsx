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
    key: string;
    content: string;
}

type Vnode = m.Vnode<Attrs, MarkdownViewer>;

/**
 * Displays markdown as html.
 */
export default class MarkdownViewer extends MithrilTsxComponent<Attrs> {

    oncreate(vnode: Vnode) {
        this.parse(vnode.attrs.key, vnode.attrs.content);
    }

    onupdate(vnode: Vnode) {
        this.parse(vnode.attrs.key, vnode.attrs.content);
    }

    /**
     * Inserts raw markdown content into viewer as HMTL.
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
            <div class="row">
                <div class="col-md-12 jf-markdown-wrapper" >
                    <div id={vnode.attrs.key} class="jf-markdown-viewer" />
                </div >
            </div>
        );
    }
}
