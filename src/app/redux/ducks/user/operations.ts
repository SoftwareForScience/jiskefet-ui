/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import {
    ThunkResult,
    UserAction
} from './types';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../types';
import { getUser, getLogsForUser } from '../../../constants/apiUrls';
import { User } from '../../../interfaces/User';
import { HttpError } from '../../../interfaces/HttpError';
import { request } from '../../../request';
import { fetchUserRequest, fetchUserSuccess, fetchLogsForUserRequest, fetchLogsForUserSuccess } from './actions';
import { Log } from '../../../interfaces/Log';
import { ErrorAction } from '../error/types';
import { addHttpError } from '../error/actions';
import { ResponseObject, CollectionResponseObject } from '../../../interfaces/ResponseObject';

// Thunks
export const fetchUser = (id: number | string): ThunkResult<Promise<void>> =>
    (dispatch: ThunkDispatch<RootState, void, UserAction | ErrorAction>): Promise<void> => {
        dispatch(fetchUserRequest());
        return request({
            method: 'GET',
            url: getUser(id),
            withCredentials: false
        }).then((result: ResponseObject<User>) => {
            dispatch(fetchUserSuccess(result));
        }).catch((error: HttpError) => {
            dispatch(addHttpError(error));
        });
    };

export const fetchLogsForUser = (id: number | string, query?: string): ThunkResult<void> =>
    (dispatch: ThunkDispatch<RootState, void, UserAction | ErrorAction>): void => {
        dispatch(fetchLogsForUserRequest());
        request({
            method: 'GET',
            url: getLogsForUser(id, query),
            withCredentials: false
        }).then((result: CollectionResponseObject<Log>) => {
            dispatch(fetchLogsForUserSuccess(result));
        }).catch((error: HttpError) => {
            dispatch(addHttpError(error));
        });
    };
