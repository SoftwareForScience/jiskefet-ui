import * as m from 'mithril';
import * as hljs from 'highlightjs';
import * as QuillNamespace from 'quill';

export default class QuillViewer implements m.Component {
    private id: any;
    private content: string;

    constructor(vnode: any) {
        this.id = vnode.attrs.id;
        this.content = vnode.attrs.content;
    }

    oncreate(vnode: any) {
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
        console.log(this.content);

        if (this.content[0] === '[') {
            quillEditor.setContents(JSON.parse(this.content));
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
