/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';

interface Attrs {
    /**
     * The title of where the attachment is added to.
     */
    attachTo: string;
    /**
     * The function to store the files in memory
     */
    addFiles: (event: any) => void;
    /**
     * Whether to hide the image preview
     */
    hideImagePreview?: boolean;
}

type Vnode = m.Vnode<Attrs, Attachment>;

export default class Attachment extends MithrilTsxComponent<Attrs> {

    view(vnode: Vnode) {
        const { addFiles, attachTo, hideImagePreview } = vnode.attrs;
        return (
            <div>
                <label for="fileUpload">Attach file to {attachTo}:</label>
                <input
                    type="file"
                    class="form-control-file"
                    id="fileUpload"
                    name="fileUpload"
                    data-show-caption="true"
                    onchange={addFiles}
                />
                <br />
                <img
                    id="preview-image"
                    src=""
                    style="max-width:100px;padding:0px 0px 10px 10px;"
                    hidden={hideImagePreview}
                />
            </div>
        );
    }
}
