import * as m from 'mithril';
import * as hljs from 'highlightjs';
import * as QuillNamespace from 'quill';

interface IQuillViewer {
    id: number;
    content: string;
    plaintext?: boolean;
}

export default class QuillViewer implements m.Component {
    private id: any;
    private content: string;
    private plaintext: boolean;

    constructor(vnode: m.Vnode<IQuillViewer>) {
        this.id = vnode.attrs.id;
        this.content = vnode.attrs.content;
        this.plaintext = vnode.attrs.plaintext || false;
    }

    oncreate() {
        const options = {
            modules: {
                syntax: {
                    highlight: text => hljs.highlightAuto(text).value
                },
                formula: true,
                toolbar: false
            },
            readOnly: true,
            theme: 'bubble'
        };

        const Quill: any = QuillNamespace;

        const quillEditor = new Quill(`#quill-container-${this.id}`, options);

        if (this.content[0] === '[') {
            quillEditor.setContents(JSON.parse(this.content));
            if (this.plaintext) {
                const plainTextContents: string = quillEditor.getText();
                quillEditor.setText(plainTextContents.substr(0, 100));
            }
        } else {
            quillEditor.setText(this.content);
        }
    }

    view() {
        return (
            <div id={`quill-container-${this.id}`} />
        );
    }
}
