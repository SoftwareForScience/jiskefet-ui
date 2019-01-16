/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import {
    FetchAttachmentsByLogRequestAction,
    ActionTypes,
    FetchAttachmentsByLogSuccessAction,
    CreateAttachmentRequestAction,
    CreateAttachmentSuccessAction,
    SetAttachmentToBeCreatedAction,
    ClearAttachmentToBeCreatedAction
} from './types';
import { Attachment } from '../../../interfaces/Attachment';

// Action creators
export const fetchAttachmentsByLogRequest = (): FetchAttachmentsByLogRequestAction => ({
    type: ActionTypes.FETCH_ATTACHMENTS_BY_LOG_REQUEST
});

export const fetchAttachmentsByLogSuccess = (payload: Attachment[]): FetchAttachmentsByLogSuccessAction => ({
    type: ActionTypes.FETCH_ATTACHMENTS_BY_LOG_SUCCESS,
    payload
});

export const createAttachmentRequest = (): CreateAttachmentRequestAction => ({
    type: ActionTypes.CREATE_ATTACHMENT_REQUEST
});

export const createAttachmentSuccess = (): CreateAttachmentSuccessAction => ({
    type: ActionTypes.CREATE_ATTACHMENT_SUCCESS
});

export const setAttachmentToBeCreated = (attachment: Attachment): SetAttachmentToBeCreatedAction => ({
    type: ActionTypes.SET_ATTACHMENT_TO_BE_CREATED,
    payload: attachment
});

export const clearAtachmentToBeCreated = (): ClearAttachmentToBeCreatedAction => ({
    type: ActionTypes.CLEAR_ATTACHMENT_TO_BE_CREATED
});
