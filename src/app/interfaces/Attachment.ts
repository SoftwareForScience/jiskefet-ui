/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { ILog } from './Log';

/**
 * Interface with the fields for fetching one or more Attachment entries.
 */
export interface IAttachment {
    fileId?: number;
    title?: string;
    fileName: string;
    fileMime: string;
    fileData: string;
    log?: ILog;
}

/**
 * Interface with the fields for creating a Attachment entry.
 */
export interface IAttachmentCreate {
    title?: string;
    fileName: string;
    fileMime: string;
    fileData: string;
    log?: ILog;
}
