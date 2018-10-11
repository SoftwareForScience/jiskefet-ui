import * as m from 'mithril';
import * as hljs from 'highlightjs';
import * as QuillNamespace from 'quill';

export default class QuillViewer implements m.Component {
    private id: any;
    /**
     * Content should be a string of the following JSON format, as produced by QuillEditor.tsx:
     * {
     *   ops: [
     *     { insert: 'Gandalf', attributes: { bold: true } },
     *     { insert: ' the ' },
     *     { insert: 'Grey', attributes: { color: '#cccccc' } }
     *   ]
     * }
     * For more information on the format above, see: https://quilljs.com/docs/delta/.
     */
    private content: string;
    private plaintext: boolean;
    private plaintextLimit?: number; // If a number is given, limits the plain text output to given number of characters.

    private viewer: any; // The Quill object that shows the content.
    private options = {
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

    constructor(vnode: any) {
        this.id = vnode.attrs.id;
        this.content = vnode.attrs.content;
        this.plaintext = vnode.attrs.plaintext || false;
        this.plaintextLimit = vnode.attrs.plaintextLimit || null;
    }

    oncreate() {
        const Quill: any = QuillNamespace;
        this.viewer = new Quill(`#quill-container-${this.id}`, this.options);
        this.setContents(this.content);
    }

    /**
     * Set the contents to be shown by the viewer.
     * @param content the content to be showed in the viewer.
     */
    setContents(content: string) {
        if (this.isParsable(content)) {
            const viewableContent = JSON.parse(this.content).ops;
            this.viewer.setContents(viewableContent); // Parse content with formatting
        } else {
            this.viewer.setText(content); // Display only plain text
        }
        if (this.plaintext) {
            const plainTextContent: string = this.plaintextLimit ?
                this.viewer.getText().substr(0, this.plaintextLimit)
                : this.viewer.getText();
            this.viewer.setText(plainTextContent);
        }
    }

    /**
     * Returns true if the string given is parsable by Quill.
     */
    isParsable = (content: string) => {
        return this.content[0] === '{' && this.content[this.content.length - 1] === '}';
    }

    view() {
        return (
            <div id={`quill-container-${this.id}`} />
        );
    }
}
