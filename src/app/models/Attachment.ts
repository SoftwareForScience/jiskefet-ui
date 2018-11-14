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
    download(attachment: any): string {
        if (attachment.fileData.indexOf('base64;') >= 0) {
            attachment.fileData = attachment.fileData.split('base64;')[1];
        }
        return `data:${attachment.fileMime};base64,${attachment.fileData}`; // data:image/png;base64," + baseString
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
    async read(file: any, isExistingLog: boolean) {
        AttachmentModel.hasChosenAttachment = true;
        // Read the file data
        const reader = new FileReader();
        reader.onload = () => {
            // Store the base64 encoded file as a strings
            const base64String = reader.result as string;
            const fileMime = base64String.substring('data:'.length, base64String.indexOf(';base64,')) as string;
            const fileData = base64String
                .substring(base64String.indexOf(';base64,'))
                .substring(';base64,'.length) as string;
            // Set image preview
            if (fileMime.indexOf('image') >= 0) {
                const previewImage = document.getElementById('preview-image');
                (previewImage as HTMLImageElement).src = base64String;
            }
            // Save the file data in the state
            AttachmentModel.createAttachment.title = file.name;
            AttachmentModel.createAttachment.fileMime = fileMime;
            AttachmentModel.createAttachment.fileData = fileData;
            // Add the current Log to the Attachment
            if (isExistingLog) {
                AttachmentModel.createAttachment.log = State.LogModel.current;
            }
        };
        // Save the Attachment to the Log that is going to be created
        if (!isExistingLog) {
            // Check if attachments have already been added
            if (State.LogModel.createLog.attachments === undefined || State.LogModel.createLog.attachments.length > 0) {
                State.LogModel.createLog.attachments = new Array();
            }
            State.LogModel.createLog.attachments.push(AttachmentModel.createAttachment);
        }
        reader.readAsDataURL(file);
    },
    saveAttachmentModels(event: any) {
        const files = event.target.files;
        AttachmentModel.read(files[0], true);
    },
    async postAttachments() {
        if (AttachmentModel.createAttachment && AttachmentModel.hasChosenAttachment) {
            await AttachmentModel.save().then(() => {
                AttachmentModel.fetch(State.LogModel.current.logId);
            });
        }
    }

};

type AttachmentModel = typeof AttachmentModel;
export default AttachmentModel;
