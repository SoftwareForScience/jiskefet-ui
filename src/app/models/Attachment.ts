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
    attachmentsToAdd: [] as any[],
    async fetch(id: number) {
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
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            console.log(file.name);
            const base64String = reader.result as string;
            const fileMime = base64String.substring('data:'.length, base64String.indexOf(';base64,')) as string;
            const fileData = base64String.substring(base64String.indexOf(';base64,')).substring(';base64,'.length) as string;
            State.AttachmentModel.createAttachment.title = file.name;
            State.AttachmentModel.createAttachment.fileMime = fileMime;
            State.AttachmentModel.createAttachment.fileData = fileData;
            if (isExistingLog) {
                State.AttachmentModel.createAttachment.log = State.LogModel.current;
            }
            this.attachmentsToAdd.push(State.AttachmentModel.createAttachment);
        };
        reader.onerror = (error) => {
            console.log('Error: ', error);
        };
        if (!isExistingLog) {
            // save the attachment(s) to createLog
            State.LogModel.createLog.attachments = this.attachmentsToAdd;
            console.log(State.LogModel.createLog.attachments);
            this.attachmentsToAdd = [];
        }
    }
};

type AttachmentModel = typeof AttachmentModel;
export default AttachmentModel;
