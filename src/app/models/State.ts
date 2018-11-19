/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import LogModel from './Log';
import RunModel from './Run';
import AppState from './AppState';
import HttpErrorModel from './HttpError';
import SuccessModel from './Success';
import TokenModel from './Token';
import FilterModel from './Filter';
import AttachmentModel from './Attachment';

/**
 * The single state container for the application.
 * See the README in this directory (./models) for more info.
 */
export default {
    AppState,
    HttpErrorModel,
    SuccessModel,
    LogModel,
    RunModel,
    TokenModel,
    FilterModel,
    AttachmentModel
};
