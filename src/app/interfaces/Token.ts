/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

/**
 * Interface with the fields for creating a Token entry.
 */
export interface TokenCreate {
    userId: number;
    subsystemId: number;
    subSystemTokenDescription: string;
    isMember: boolean;
    editEorReason: boolean;
}
