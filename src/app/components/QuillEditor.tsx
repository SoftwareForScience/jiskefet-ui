import * as m from 'mithril';
import * as Quill from 'quill';
import * as Stream from 'mithril/stream';

export default class QuillEditor implements m.Component {
    constructor(vnode: any) {
        console.log('hi');
    }

    oncreate(vnode: any) {

        const content = Stream(null);
        const options = { theme: 'snow' };
        const quillEditor = new Quill(vnode.dom, options);

        if (content()) {
            quillEditor.setContents(content);
        }

        quillEditor.on('text-change', (delta, oldDelta, source) => {
            content(quillEditor.getContents().ops);
            m.redraw();
        });
    }

    view() {
        return (
            <div />
        );
    }
}
