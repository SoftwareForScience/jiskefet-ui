import * as m from 'mithril';
import * as QuillNamespace from 'quill';
import * as Stream from 'mithril/stream';

export default class QuillEditor implements m.Component {
    constructor(vnode: any) {
        console.log('hi');
    }

    oncreate(vnode: any) {
        // const content = Stream(null);
        const toolbarOptions = [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline'],        // toggled buttons
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ align: [] }],
            // [{ script: 'sub' }, { script: 'super' }],      // superscript/subscript
            // [{ indent: '-1' }, { indent: '+1' }],          // outdent/indent
            // [{ direction: 'rtl' }],                         // text direction
            ['link', 'blockquote', 'code-block', 'formula', 'image'],
            [{ color: [] }, { background: [] }],          // dropdown with defaults from theme
            // [{ font: [] }],

            ['clean']                                         // remove formatting button
        ];
        const options = {
            modules: {
                syntax: true,              // Include syntax module
                toolbar: toolbarOptions,  // Include button in toolbar
                scrollingContainer: '#scrolling-container',
            },
            placeholder: 'Compose an epic...',
            theme: 'snow'
        };
        const Quill: any = QuillNamespace;
        const quillEditor = new Quill('#quill-container', options);

        // if (content()) {
        //     quillEditor.setContents(content);
        // }

        // quillEditor.on('text-change', (delta, oldDelta, source) => {
        //     // content(quillEditor.getContents().ops);
        //     m.redraw();
        // });
    }

    view() {
        return (
            <div id="scrolling-container">
                <div id="quill-container" />
            </div>
        );
    }
}
