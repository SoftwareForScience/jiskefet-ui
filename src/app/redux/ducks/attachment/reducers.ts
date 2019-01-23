/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Reducer } from 'redux';
import { AttachmentState, AttachmentAction, ActionTypes } from './types';

// Initial state
const initialState: AttachmentState = {
    isFetchingAttachments: false,
    isFetchingAttachment: false,
    isCreatingAttachment: false,
    attachments: [],
    attachmentToBeCreated: null,
};

// Reducer
const attachmentReducer: Reducer<AttachmentState>
    = (state: AttachmentState = initialState, action: AttachmentAction): AttachmentState => {
        switch (action.type) {
            case ActionTypes.FETCH_ATTACHMENTS_BY_LOG_REQUEST:
                return {
                    ...state,
                    isFetchingAttachments: true
                };
            case ActionTypes.FETCH_ATTACHMENTS_BY_LOG_SUCCESS:
                return {
                    ...state,
                    isFetchingAttachments: false,
                    attachments: [...action.payload.data.items]
                };
            case ActionTypes.CREATE_ATTACHMENT_REQUEST:
                return {
                    ...state,
                    isCreatingAttachment: true
                };
            case ActionTypes.CREATE_ATTACHMENT_SUCCESS:
                return {
                    ...state,
                    isCreatingAttachment: false
                };
            case ActionTypes.SET_ATTACHMENT_TO_BE_CREATED:
                return {
                    ...state,
                    attachmentToBeCreated: action.payload
                };
            case ActionTypes.CLEAR_ATTACHMENT_TO_BE_CREATED:
                return {
                    ...state,
                    attachmentToBeCreated: null
                };
            default:
                return state;
        }
    };

export default attachmentReducer;
