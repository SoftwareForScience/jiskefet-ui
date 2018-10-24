/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import * as hljs from 'highlightjs';
import * as QuillNamespace from 'quill';

/**
 * This component executes the function postContent on text change.
 *
 * It will save a string with the following format:
 * {
 *   ops: [
 *     { insert: 'Gandalf', attributes: { bold: true } },
 *     { insert: ' the ' },
 *     { insert: 'Grey', attributes: { color: '#cccccc' } }
 *   ]
 * }
 * For more information on the format above, see: https://quilljs.com/docs/delta/.
 */
export default class QuillEditor implements m.Component {
    private postContent: (content: string) => void;

    constructor(vnode: any) {
        this.postContent = vnode.attrs.postContent;
    }

    oncreate() {
        const toolbarOptions = [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ align: [] }],
            ['link', 'blockquote', 'code-block', 'formula', 'image'],
            [{ color: [] }, { background: [] }],
            ['clean']
        ];

        const options = {
            modules: {
                syntax: {
                    highlight: text => hljs.highlightAuto(text).value
                },
                formula: true,
                toolbar: toolbarOptions
            },
            placeholder: 'Type the body of the log...',
            theme: 'snow'
        };

        const Quill: any = QuillNamespace;
        const quillEditor = new Quill('#quill-container', options);

        quillEditor.on('text-change', () => {
            const content = JSON.stringify(quillEditor.getContents());
            this.postContent(content);
        });
    }

    view() {
        return (
            <div id="quill-container" />
        );
    }
}
