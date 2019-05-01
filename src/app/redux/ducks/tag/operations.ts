/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { ThunkResult, TagAction } from './types';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../types';
import { Tag } from '../../../interfaces/Tag';
import { HttpError } from '../../../interfaces/HttpError';
import { request } from '../../../request';
import {
    fetchTagsByLogRequest,
    fetchTagsByLogSuccess,
    createTagRequest,
    createTagSuccess
} from './actions';
import { getTagsForLog, postTag } from '../../../constants/apiUrls';
import { addHttpError } from '../error/actions';
import { ErrorAction } from '../error/types';
import { CollectionSuccessObject } from '../../../interfaces/ResponseObject';

// Thunks
export const fetchTagsForLog = (logId: number): ThunkResult<Promise<void>> =>
    async (dispatch: ThunkDispatch<RootState, void, TagAction | ErrorAction>): Promise<void> => {
        dispatch(fetchTagsByLogRequest());
        return request({
            method: 'GET',
            url: getTagsForLog(logId)
        }).then((result: CollectionSuccessObject<Tag>) => {
            dispatch(fetchTagsByLogSuccess(result));
        }).catch((error: HttpError<any>) => {
            dispatch(addHttpError(error));
        });
    };

export const saveTag = (tag: Tag): ThunkResult<Promise<void>> =>
    async (dispatch: ThunkDispatch<RootState, void, TagAction | ErrorAction>): Promise<void> => {
        dispatch(createTagRequest());
        return request({
            method: 'POST',
            data: tag,
            url: postTag()
        }).then((result: any) => {
            // SuccesModel.add('Successfully saved tag.');
            dispatch(createTagSuccess());
        }).catch((error: HttpError<any>) => {
            dispatch(addHttpError(error));
        });
    };
