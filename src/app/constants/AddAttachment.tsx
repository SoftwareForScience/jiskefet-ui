/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 *
 * The tabs used by the Log details page.
 */

import * as m from 'mithril';
import { ModalBody } from '../interfaces/ModalBody';
import State from '../models/State';

const AddAttachment: ModalBody = {

    content: (): JSX.Element => (
        (
            <div>
                <input
                    type="file"
                    class="form-control-file"
                    id="fileUpload"
                    name="fileUpload"
                    data-show-caption="true"
                    onchange={State.AttachmentModel.saveAttachmentModels}
                />
                <br />
                <img id="preview-image" src="" style="max-width:180px;padding:0px 0px 10px 10px;" />
                <br />
                <button
                    id="save"
                    class="btn btn-primary"
                    data-dismiss="modal"
                    onclick={State.AttachmentModel.postAttachments}
                    disabled={!State.AttachmentModel.hasChosenAttachment}
                >Save Attachment
                </button>
            </div>
        )
    )

};

type AddAttachment = typeof AddAttachment;
export default AddAttachment;
