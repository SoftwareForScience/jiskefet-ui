/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import { store } from '../redux/configureStore';
import { setAttachmentToBeCreated, clearAttachmentToBeCreated } from '../redux/ducks/attachment/actions';
import { selectAttachmentToBeCreated } from '../redux/ducks/attachment/selectors';
import { saveAttachment, fetchAttachmentsByLog } from '../redux/ducks/attachment/operations';
import { selectCurrentLog, selectLogToBeCreated } from '../redux/ducks/log/selectors';
import { setLogToBeCreated } from '../redux/ducks/log/actions';
import { ILogCreate } from '../interfaces/Log';
import { IEvent } from '../interfaces/Event';
import Label from '../atoms/Label';
import Input from '../atoms/Input';
import { FILE_UPLOAD_LIMIT } from '../constants/constants';

interface Attrs {
    /**
     * The title of where the attachment is added to.
     */
    attachTo: string;
    /**
     * Whether the item already exists
     */
    isExistingItem: boolean;
    /**
     * Whether to hide the image preview
     */
    hideImagePreview?: boolean;
}

type Vnode = m.Vnode<Attrs, AttachmentComponent>;

export default class AttachmentComponent extends MithrilTsxComponent<Attrs> {
    private isCreateLog: boolean;
    private hasChosenAttachment: boolean;
    private maxFileSize: number;

    constructor(vnode: Vnode) {
        super();
        this.isCreateLog = vnode.attrs.isExistingItem;
        this.hasChosenAttachment = false;
        this.maxFileSize = FILE_UPLOAD_LIMIT * 1024 * 1024;
    }

    /**
     * Gets called after User selects a file.
     * @param event The event of having selected a file.
     */
    getSelectedFiles = (event: IEvent) => {
        const files = (event.target as HTMLInputElement).files as FileList;
        const maxSizeLabel = document.getElementById('maximum-size-label') as HTMLElement;
        if (files[0].size > this.maxFileSize) {
            maxSizeLabel.hidden = false;
        } else {
            maxSizeLabel.hidden = true;
            this.read(files[0], this.isCreateLog);
        }
    }

    /**
     * Read the files with the reader object into a Base64 encoded string.
     * @param file The file that the user has chosen (event.target.files).
     * @param isExistingItem Whether the attachment is added to an existing Item.
     */
    read = (file: File, isExistingItem: boolean) => {
        this.hasChosenAttachment = true;
        const reader = new FileReader();
        reader.onload = () => {
            // Store the base64 encoded file as a string
            const base64String = reader.result as string;
            // Save the file data in the state
            this.saveAttachmentState(base64String, file.name, isExistingItem);
            // Set image preview
            const previewImage = document.getElementById('preview-image');
            if (base64String.indexOf('image') >= 0 && previewImage) {
                (previewImage as HTMLImageElement).src = base64String;
            } else {
                (previewImage as HTMLImageElement).src = '';
            }
        };
        reader.readAsDataURL(file);
    }

    /**
     * Saves the base64 encoded string into the state.
     * @param base64String The file base64 encoded string.
     * @param fileName The name of the file.
     * @param isExistingItem Whether the attachment is added to an existing Item.
     */
    saveAttachmentState = (base64String: string, fileName: string, isExistingItem: boolean) => {
        const fileMime = base64String.substring(
            'data:'.length, base64String.indexOf(';base64,')
        );
        const state = store.getState();
        const currentLog = selectCurrentLog(state);
        const logToBeCreated = selectLogToBeCreated(state);
        const fileData = base64String.split(';base64,')[1];
        let log = null;
        if (isExistingItem) {
            log = currentLog;
            const attachmentToBeCreated = {
                fileName,
                fileMime,
                fileData,
                ...(log && { log })
            };
            store.dispatch(setAttachmentToBeCreated(attachmentToBeCreated));
        } else {
            // Check if attachment was not already added (needs to be adjusted for multiple file upload)
            if (logToBeCreated && (logToBeCreated.attachments === undefined
                || logToBeCreated.attachments.length > 0)) {
                logToBeCreated.attachments = new Array();
                logToBeCreated.attachments.push({ fileName, fileMime, fileData });
                store.dispatch(setLogToBeCreated(logToBeCreated as ILogCreate));
            }
        }
    }

    /**
     * This function will post the saved Attachment to the Api and reset the view to show its been added
     */
    postAttachments = async () => {
        const state = store.getState();
        const attachment = selectAttachmentToBeCreated(state);
        const currentLog = selectCurrentLog(state);
        if (attachment && this.hasChosenAttachment && currentLog) {
            await store.dispatch(saveAttachment(attachment, currentLog.logId))
                .then(async () => {
                    // Reset the input form
                    const fileInput = document.getElementById('addAttachment') as HTMLFormElement;
                    const imagePreview = document.getElementById('preview-image') as HTMLImageElement;
                    if (fileInput && imagePreview.src) {
                        fileInput.reset();
                        imagePreview.src = '';
                    }
                    // Redraw the current view
                    const logId = currentLog.logId;
                    await store.dispatch(fetchAttachmentsByLog(logId)).then(() => {
                        store.dispatch(clearAttachmentToBeCreated());
                        this.hasChosenAttachment = false;
                    });
                });
        }
    }

    view(vnode: Vnode) {
        const { attachTo, hideImagePreview } = vnode.attrs;
        return (
            <div>
                <div class="alert alert-danger" role="alert" id="maximum-size-label" for="save" hidden>
                    Filesize exceeds the maximum limit of {FILE_UPLOAD_LIMIT}MB! Please select a smaller file.
                </div>
                <Label
                    id="fileUpload"
                    text={`Attach file to ${attachTo}:`}
                />
                <Input
                    inputType="file"
                    className="form-control-file"
                    id="fileUpload"
                    name="fileUpload"
                    dataShowCaption="true"
                    oninput={this.getSelectedFiles}
                />
                <img
                    id="preview-image"
                    src=""
                    style="max-width:40%; padding:10px 10px 10px 0px;"
                    hidden={hideImagePreview}
                />
                <div hidden={!this.isCreateLog}>
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
                            onclick={this.postAttachments}
                            disabled={!this.hasChosenAttachment}
                        >Save File
                        </button>
                    </span>
                </div>
            </div>
        );
    }
}
