/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Attachment, AttachmentCreate } from '../interfaces/Attachment';
import State from './State';
import SuccesModel from './Success';
import { HttpError } from '../interfaces/HttpError';
import { request } from '../request';

/**
 * Stores the state around Attachment entities.
 */
const AttachmentModel = {
    isFetchingAttachment: false as boolean,
    list: [] as Attachment[],
    current: {} as Attachment,
    createAttachment: {} as AttachmentCreate, // attachment being created
    async fetch(id: number) {
        AttachmentModel.isFetchingAttachment = true;
        return request({
            method: 'GET',
            url: `${process.env.API_URL}attachments/${id}/logs`,
            withCredentials: false
        }).then((result: Attachment[]) => {
            AttachmentModel.isFetchingAttachment = false;
            AttachmentModel.list = result;
        }).catch((e: HttpError) => {
            AttachmentModel.isFetchingAttachment = false;
            State.HttpErrorModel.add(e);
        });
    },
    async save() {
        return request({
            method: 'POST',
            url: `${process.env.API_URL}attachments`,
            data: AttachmentModel.createAttachment,
            withCredentials: false
        }).then(() => {
            SuccesModel.add('Successfully saved attachment.');
        }).catch((e: HttpError) => {
            State.HttpErrorModel.add(e);
        });
    },
    download(attachment: Attachment): string {
        if (attachment.fileData.indexOf('base64;') >= 0) {
            attachment.fileData = attachment.fileData.split('base64;')[1];
        }
        return `data:${attachment.fileMime};base64,${attachment.fileData}`; // data:image/png;base64," + baseString
    }
};

type AttachmentModel = typeof AttachmentModel;
export default AttachmentModel;
