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
import { Attachment, AttachmentCreate } from '../../../interfaces/Attachment';
import { HttpError } from '../../../interfaces/HttpError';
import { request } from '../../../request';
import {
    fetchAttachmentsByLogRequest,
    fetchAttachmentsByLogSuccess,
    createAttachmentRequest,
    createAttachmentSuccess
} from './actions';
import { getAttachmentsByLog, postAttachment } from '../../../constants/apiUrls';
import { addHttpError } from '../error/actions';
import { ErrorAction } from '../error/types';
import { CollectionSuccessObject } from '../../../interfaces/ResponseObject';

// Thunks
export const fetchAttachmentsByLog = (logId: number): ThunkResult<Promise<void>> =>
    async (dispatch: ThunkDispatch<RootState, void, AttachmentAction | ErrorAction>): Promise<void> => {
        dispatch(fetchAttachmentsByLogRequest());
        return request({
            method: 'GET',
            url: getAttachmentsByLog(logId)
        }).then((result: CollectionSuccessObject<Attachment>) => {
            dispatch(fetchAttachmentsByLogSuccess(result));
        }).catch((error: HttpError<any>) => {
            dispatch(addHttpError(error));
        });
    };

export const saveAttachment = (attachment: AttachmentCreate, logId: number): ThunkResult<Promise<void>> =>
    async (dispatch: ThunkDispatch<RootState, void, AttachmentAction | ErrorAction>): Promise<void> => {
        dispatch(createAttachmentRequest());
        return request({
            method: 'POST',
            data: attachment,
            url: postAttachment(logId)
        }).then((result: any) => {
            // SuccesModel.add('Successfully saved attachment.');
            dispatch(createAttachmentSuccess());
        }).catch((error: HttpError<any>) => {
            dispatch(addHttpError(error));
        });
    };
