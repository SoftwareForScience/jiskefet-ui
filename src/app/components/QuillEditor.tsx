import * as m from 'mithril';
import * as hljs from 'highlightjs';
import * as QuillNamespace from 'quill';

interface Attrs {
    postContent: (content: string) => void;
}

export default class QuillEditor implements m.ClassComponent<Attrs> {
    private postContent: (content: string) => void;

    constructor(vnode: m.Vnode<Attrs>) {
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
