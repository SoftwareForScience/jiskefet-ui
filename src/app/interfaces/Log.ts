/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Attachment } from './Attachment';
import { User } from './User';
import { Run } from './Run';

/**
 * Interface with the fields for fetching one or more Log entries.
 */
export interface Log {
    logId: number;
    subtype: string;
    userId?: number;
    origin: string;
    creationTime: string;
    title: string;
    body: string;
    user: User;
    runs?: Run[];
    attachments?: Attachment[];
}

/**
 * Interface with the fields for creating a Log entry.
 */
export interface LogCreate {
    subtype: string;
    origin: string;
    title: string;
    body: string;
    user: number;
    runs: Run[] | number[];
    attachments?: Attachment[];
}
