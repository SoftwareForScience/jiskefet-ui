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
    isFetchingAttachments: false as boolean,
    isFetchingAttachment: false as boolean,
    list: [] as any[],
    current: {} as Attachment,
    file: {} as File,
    createAttachment: {} as AttachmentCreate, // attachment being created
    downloadUrl: '' as string,
    async fetchAttachmentsForLog(id: number) {
        AttachmentModel.isFetchingAttachment = true;
        return m.request({
            method: 'GET',
            url: `${process.env.API_URL}attachments/${id}/logs`,
            withCredentials: false
        }).then((result: any) => {
            AttachmentModel.isFetchingAttachment = false;
            this.list = result;
        }).catch((e: any) => {
            AttachmentModel.isFetchingAttachment = false;
            State.HttpErrorModel.add(e);
        });
    },
    downloadAttachmentAsFile(attachment: any): string {

        if (attachment.fileData.indexOf('base64;') >= 0) {
            attachment.fileData = attachment.fileData.split('base64;')[1];
        }

        if (attachment.fileMime.indexOf('image') >= 0) {
            console.log('Attachment is a image');
            return `data:${attachment.fileMime};base64,${attachment.fileData}`; // data:image/png;base64," + baseString
        } else {
            return URL.createObjectURL(new Blob([atob(attachment.fileData)], { type: attachment.fileMime }));
        }
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
    async saveAttachmentModel(files: any) {
        const reader = new FileReader();
        // Does not work for multiple files upload yet
        for (const file of files) {
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64String = reader.result as string;
                const fileMime = base64String.substring('data:'.length, base64String.indexOf(';base64,')) as string;
                const fileData = base64String.substring(base64String.indexOf(';base64,')).substring(';base64,'.length) as string;
                State.AttachmentModel.createAttachment.title = file.name;
                State.AttachmentModel.createAttachment.fileMime = fileMime;
                State.AttachmentModel.createAttachment.fileData = fileData;
            };

            reader.onerror = (error) => {
                console.log('Error: ', error);
            };

        }
    }
};

type AttachmentModel = typeof AttachmentModel;
export default AttachmentModel;
