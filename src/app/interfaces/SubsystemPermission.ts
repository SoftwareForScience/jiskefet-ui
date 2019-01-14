/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Subsystem } from './SubSytem';
import { User } from './User';

/**
 * Interface with the fields for creating a Token entry.
 */
export interface SubsystemPermissionCreate {
    user: User;
    subsystem: Subsystem;
    subSystemTokenDescription: string;
    isMember: boolean;
    editEorReason: boolean;
}

/**
 * Interface with the fields to display
 */
export interface SubsystemPermission {
    subsystemPermissionId: number;
    subSystemTokenDescription: string;
}

/**
 * Response object when a token is successfully created.
 */
export interface SubsystemToken extends SubsystemPermissionCreate {
    subSystemHash: string;
}
