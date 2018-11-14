/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { Attachment, AttachmentCreate } from '../interfaces/Attachment';
import State from './State';
import SuccesModel from './Success';

/**
 * Stores the state around Attachment entities.
 */
const AttachmentModel = {
    isFetchingAttachment: false as boolean,
    hasChosenAttachment: false as boolean,
    list: [] as Attachment[],
    current: {} as Attachment,
    createAttachment: {} as AttachmentCreate, // attachment being created
    attachmentsToAdd: [] as any[],
    async fetch(id: number) {
        AttachmentModel.isFetchingAttachment = true;
        return m.request({
            method: 'GET',
            url: `${process.env.API_URL}attachments/${id}/logs`,
            withCredentials: false
        }).then((result: any) => {
            AttachmentModel.isFetchingAttachment = false;
            AttachmentModel.list = result;
        }).catch((e: any) => {
            AttachmentModel.isFetchingAttachment = false;
            State.HttpErrorModel.add(e);
        });
    },
    async save() {
        return m.request<Attachment>({
            method: 'POST',
            url: `${process.env.API_URL}attachments`,
            data: AttachmentModel.createAttachment,
            withCredentials: false
        }).then(() => {
            SuccesModel.add('Successfully saved attachment.');
        }).catch((e: any) => {
            State.HttpErrorModel.add(e);
        });
    },
    download(attachment: any): string {
        if (attachment.fileData.indexOf('base64;') >= 0) {
            attachment.fileData = attachment.fileData.split('base64;')[1];
        }
        return `data:${attachment.fileMime};base64,${attachment.fileData}`; // data:image/png;base64," + baseString
    },
    // Reads the file(s) into base64 encoded string
    async read(file: any, isExistingLog: boolean) {
        AttachmentModel.hasChosenAttachment = true;
        const reader = new FileReader();
        reader.onload = () => {
            // Store the base64 encoded file as a string
            const base64String = reader.result as string;
            // Save the file data in the state
            AttachmentModel.saveAttachmentState(base64String, file.name, isExistingLog);
            // Set image preview
            if (base64String.indexOf('image') >= 0 && document.getElementById('preview-image')) {
                const previewImage = document.getElementById('preview-image');
                (previewImage as HTMLImageElement).src = base64String;
            }
        };
        reader.readAsDataURL(file);
    },
    // Saves the base64 encoded string into the state
    saveAttachmentState(base64String: any, name: any, isExistingLog: boolean) {
        // Save the encoded string to the state createAttachmentModel
        AttachmentModel.createAttachment.title = name;
        AttachmentModel.createAttachment.fileMime = base64String.
            substring('data:'.length, base64String.indexOf(';base64,'));
        AttachmentModel.createAttachment.fileData = base64String.split(';base64,')[1];
        // Check if new Log or existing
        if (isExistingLog) {
            AttachmentModel.createAttachment.log = State.LogModel.current;
        } else {
            // Check if attachment was not already added (needs to be adjusted for multiple file upload)
            if (State.LogModel.createLog.attachments === undefined
                || State.LogModel.createLog.attachments.length > 0) {

                State.LogModel.createLog.attachments = new Array();
            }
            State.LogModel.createLog.attachments.push(AttachmentModel.createAttachment);
            console.log(State.LogModel.createLog.attachments[0].title);
        }
    },
    // Gets called from AddAttachment Modal for existing Log
    addFileToExistingLog(event: any) {
        const files = event.target.files;
        AttachmentModel.read(files[0], true);
    },
    // Gets called from AddAttachment Modal for existing Log
    async postAttachments() {
        if (AttachmentModel.createAttachment && AttachmentModel.hasChosenAttachment) {
            await AttachmentModel.save().then(() => {
                // Reset the input form
                const fileInput = document.getElementById('addAttachment') as HTMLFormElement;
                const imagePreview = document.getElementById('preview-image') as HTMLImageElement;
                if (fileInput && imagePreview.src) {
                    fileInput.reset();
                    imagePreview.src = '';
                }
                // Redraw the current view
                AttachmentModel.fetch(State.LogModel.current.logId);
            });
        }
    }

};

type AttachmentModel = typeof AttachmentModel;
export default AttachmentModel;
