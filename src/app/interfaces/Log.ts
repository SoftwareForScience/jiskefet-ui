/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { IAttachmentCreate, IAttachment } from './Attachment';
import { IUser } from './User';
import { IRun } from './Run';

/**
 * Interface with the fields for fetching one or more Log entries.
 */
export interface ILog {
    logId: number;
    subtype: string;
    userId?: number;
    origin: string;
    creationTime: string;
    title: string;
    body: string;
    user: IUser;
    runs?: IRun[];
    attachments?: IAttachment[];
    comments?: ILog[];
    commentFkRootLogId?: number;
    commentFkParentLogId?: number;
}

/**
 * Interface with the fields for creating a Log entry.
 */
export interface ILogCreate {
    subtype?: string;
    origin?: string;
    title: string;
    body: string;
    user: number;
    parentId?: number;
    run?: number;
    attachments?: IAttachmentCreate[];
}
