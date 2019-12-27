/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import { IEvent } from '../interfaces/Event';

interface Attrs {
    postContent: (content: string) => void;
    value?: string | number;
}

type Vnode = m.Vnode<Attrs, MarkdownEditor>;

/**
 * Markdown editor with preview.
 */
export default class MarkdownEditor extends MithrilTsxComponent<Attrs> {
    content: string;
    /**
     * Bind event.target.value to this.content;
     */
    handleInput = (event: IEvent): void => {
        this.content = event.target.value;
    }

    view(vnode: Vnode) {
        const {
            value
        } = vnode.attrs;
        return (
            <div class="row">
            <div class="col-md-12">
              <textarea id="comment-md" name="comment" placeholder="Say something..." value={value} 
              oninput={(event: IEvent) => {
                this.handleInput(event);
                vnode.attrs.postContent(this.content);
            }}></textarea>
              <br />
              <h3>Preview: </h3>
              <div id="comment-md-preview-container">
                <div class="well well-sm well-light md-preview margin-top-10" id="comment-md-preview"></div>
              </div>
            </div>
          </div>
        );
    }
}
