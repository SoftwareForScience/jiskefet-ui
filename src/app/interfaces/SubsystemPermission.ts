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
export interface ISubsystemPermissionCreate {
    user: number; // userId
    subsystem: number; // subsystemId
    subSystemTokenDescription: string;
    isMember: boolean;
    editEorReason: boolean;
}

/**
 * Interface with the fields to display
 */
export interface ISubsystemPermission {
    subsystemPermissionId: number;
    subSystemTokenDescription: string;
}

/**
 * Response object when a token is successfully created.
 */
export interface ISubsystemToken extends ISubsystemPermissionCreate {
    subSystemHash: string;
}
