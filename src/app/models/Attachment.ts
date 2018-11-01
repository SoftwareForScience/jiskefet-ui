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
    attachmentBlob: {} as Blob,
    createAttachment: {} as AttachmentCreate, // attachment being created
    async fetchForLog(id: number) {
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
    async createAttachmentModel(files: any) {
        const reader = new FileReader();
        // Does not work for multiple files upload yet
        for (const file of files) {
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64String = reader.result as string;
                const fileMime = base64String.substring('data:'.length, base64String.indexOf(';base64,')) as string;
                State.AttachmentModel.createAttachment.title = file.name;
                State.AttachmentModel.createAttachment.fileMime = fileMime;
                State.AttachmentModel.createAttachment.fileData = base64String;
            };

            reader.onerror = (error) => {
                console.log('Error: ', error);
            };

        }
    },
    downloadFile() {

        const f = new File([blob], "File name");
        // const arrayBufferView = new Uint8Array(fileData as ArrayBuffer);
        // const attachmentBlob = new Blob([arrayBufferView], { type: fileMime });
        // const url = window.URL.createObjectURL(attachmentBlob);
        // window.location.assign(url);
    }
};

type AttachmentModel = typeof AttachmentModel;
export default AttachmentModel;
