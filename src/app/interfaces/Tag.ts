/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

/**
 * Interface with the fields for fetching one or more Attachment entries.
 */
export interface ITag {
    id?: number;
    tagText: string;
}

/**
 * Interface with the fields for creating a Attachment entry.
 */
export interface ITagCreate {
    fileId?: number;
    tagText: string;
}
