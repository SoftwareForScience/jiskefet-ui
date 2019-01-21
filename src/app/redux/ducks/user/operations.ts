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

// Thunks
export const fetchUser = (id: number | string): ThunkResult<void> =>
    (dispatch: ThunkDispatch<RootState, void, UserAction>): void => {
        dispatch(fetchUserRequest());
        request({
            method: 'GET',
            url: getUser(id),
            withCredentials: false
        }).then((result: User) => {
            dispatch(fetchUserSuccess(result));
        }).catch((error: HttpError) => {
            // State.HttpErrorModel.add(error);
        });
    };

export const fetchLogsForUser = (id: number | string, query?: string): ThunkResult<void> =>
    (dispatch: ThunkDispatch<RootState, void, UserAction>): void => {
        dispatch(fetchLogsForUserRequest());
        request({
            method: 'GET',
            url: getLogsForUser(id, query),
            withCredentials: false
        }).then((result: { data: Log[], count: number }) => {
            dispatch(fetchLogsForUserSuccess(result));
        }).catch((error: HttpError) => {
            // State.HttpErrorModel.add(error);
        });
    };
