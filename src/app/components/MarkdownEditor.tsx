/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import * as SimpleMDE from 'simplemde';
// import * as hljs from 'highlightjs';

export default class MarkdownEditor implements m.Component {
    private postContent: (content: string) => void;

    constructor(vnode: any) {
        this.postContent = vnode.attrs.postContent;
    }

    oncreate() {
        // const toolbarOptions = [{
        //     name: 'bold',
        //     action: SimpleMDE.toggleBold,
        //     className: 'fa fa-bold',
        //     title: 'Bold',
        // },
        // {
        //     name: 'italic',
        //     action: SimpleMDE.toggleItalic,
        //     className: 'fa fa-italic',
        //     title: 'italic',
        // }
        // ];
        // element: document.getElementById('simplemde-container'),

        // const options = {
        //     renderingConfig: {
        //         highlight: text => hljs.highlightAuto(text).value
        //     },
        //     toolbar: toolbarOptions,
        //     placeholder: 'Type the body of the log...',
        // };

        const simpleMDE: SimpleMDE = new SimpleMDE();

        simpleMDE.codemirror.on('change', () => {
            const content = JSON.stringify(simpleMDE);
            this.postContent(content);
        });
    }

    view() {
        return (
            <div id="simplemde-container" />
        );
    }
}
