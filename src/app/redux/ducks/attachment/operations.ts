/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { ThunkResult, AttachmentAction } from './types';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../types';
import { Attachment } from '../../../interfaces/Attachment';
import { HttpError } from '../../../interfaces/HttpError';
import { request } from '../../../request';
import {
    fetchAttachmentsByLogRequest,
    fetchAttachmentsByLogSuccess,
    createAttachmentRequest,
    createAttachmentSuccess
} from './actions';
import { getAttachmentsByLog, postAttachment } from '../../../constants/apiUrls';

// Thunks
export const fetchAttachmentsByLog = (logId: number): ThunkResult<Promise<void>> =>
    async (dispatch: ThunkDispatch<RootState, void, AttachmentAction>): Promise<void> => {
        dispatch(fetchAttachmentsByLogRequest());
        return request({
            method: 'GET',
            url: getAttachmentsByLog(logId)
        }).then((result: Attachment[]) => {
            dispatch(fetchAttachmentsByLogSuccess(result));
        }).catch((error: HttpError) => {
            // State.HttpErrorModel.add(error);
        });
    };

export const saveAttachment = (attachment: Attachment): ThunkResult<Promise<void>> =>
    async (dispatch: ThunkDispatch<RootState, void, AttachmentAction>): Promise<void> => {
        dispatch(createAttachmentRequest());
        return request({
            method: 'POST',
            data: attachment,
            url: postAttachment()
        }).then((result: any) => {
            // SuccesModel.add('Successfully saved attachment.');
            dispatch(createAttachmentSuccess());
        }).catch((error: HttpError) => {
            // State.HttpErrorModel.add(error);
        });
    };
