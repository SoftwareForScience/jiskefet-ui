/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Log } from './Log';

/**
 * Interface with the fields for fetching one or more Attachment entries.
 */
export interface Attachment {
    fileId?: number;
    title?: string;
    fileName: string;
    fileMime: string;
    fileData: string;
    log?: Log;
}

/**
 * Interface with the fields for creating a Attachment entry.
 */
export interface AttachmentCreate {
    title?: string;
    fileName: string;
    fileMime: string;
    fileData: string;
    log?: Log;
}
