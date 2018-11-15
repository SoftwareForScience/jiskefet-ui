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
import Attachment from '../components/Attachment';

const AddAttachmentModalBody: ModalBody = {

    content: (): JSX.Element => (
        (
            <div>
                <form id="addAttachment">
                    <Attachment
                        attachTo="Log"
                        addFiles={State.AttachmentModel.addFileToExistingLog}
                    />
                    <br />
                    <span
                        class="d-inline-block"
                        tabindex="0"
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Select a file before saving."
                    >
                        <button
                            id="save"
                            class="btn btn-primary"
                            data-dismiss="modal"
                            onclick={State.AttachmentModel.postAttachments}
                            disabled={!State.AttachmentModel.hasChosenAttachment}
                        >Save File
                        </button>
                    </span>
                </form>
            </div>
        )
    )

};

type AddAttachmentModalBody = typeof AddAttachmentModalBody;
export default AddAttachmentModalBody;
