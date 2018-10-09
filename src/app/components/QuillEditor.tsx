import * as m from 'mithril';
import * as hljs from 'highlightjs';
import * as QuillNamespace from 'quill';

export default class QuillEditor implements m.Component {
    private postContent: (content: string) => void;

    constructor(vnode: any) {
        this.postContent = vnode.attrs.postContent;
    }

    oncreate(vnode: any) {
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

        quillEditor.on('text-change', (delta, oldDelta, source) => {
            const contents = JSON.stringify(quillEditor.getContents().ops);
            this.postContent(contents);
        });
    }

    view() {
        return (
            <div id="quill-container" />
        );
    }
}
