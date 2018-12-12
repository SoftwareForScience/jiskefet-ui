/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { UserProfile } from './UserProfile';

/**
 * Object received from CERN when calling resource server for user info.
 */
export class CernProfileDto extends UserProfile {
    userData: {
        userId: number;
        externalUserId: number;
        samsId: number;
    };
    profileData: {
        name: string;
        username: string;
        id: number;
        personid: number;
        email: string;
        firstName: string;
        lastName: string;
        identityclass: string;
        federation: string;
        phone: string;
        mobile: string;
    };
}
