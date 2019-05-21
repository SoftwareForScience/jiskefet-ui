/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { IAttachment } from '../interfaces/Attachment';

/**
 * Utility class for working with the file system.
 */

/**
 * Downloads an attachment to the user's machine.
 */
export const download = (attachment: IAttachment): string => {
    if (attachment.fileData.indexOf('base64;') >= 0) {
        attachment.fileData = attachment.fileData.split('base64;')[1];
    }
    const sliceSize = 512;

    const byteCharacters = atob(attachment.fileData);
    const byteArrays = [] as Uint8Array[];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);

        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: attachment.fileMime });
    const blobUrl = URL.createObjectURL(blob);

    return blobUrl;
};
