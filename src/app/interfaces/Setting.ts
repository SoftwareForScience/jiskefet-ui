/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

/**
 * Interface with setting fields in order to setup the front end authentication
 */
export interface ISetting {
    USE_CERN_SSO: string;
    AUTH_URL: string;
    [index: string]: string | boolean | number;
}
