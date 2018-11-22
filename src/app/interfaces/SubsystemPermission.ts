/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { SubSystem } from './SubSytem';
import { User } from './User';

/**
 * Interface with the fields for creating a Token entry.
 */
export interface SubsystemPermissionCreate {
    user: User;
    subsystem: SubSystem;
    subSystemTokenDescription: string;
    isMember: boolean;
    editEorReason: boolean;
}

export interface SubsystemPermission {
    subsystemPermissionId: number;
    subSystemTokenDescription: string;
}
