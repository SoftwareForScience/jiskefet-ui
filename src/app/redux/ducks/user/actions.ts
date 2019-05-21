/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import {
    ActionTypes,
    FetchUserSuccessAction,
    FetchUserRequestAction,
    FetchLogsForUserRequestAction,
    FetchLogsForUserSuccessAction
} from './types';
import { IUser } from '../../../interfaces/User';
import { ILog } from '../../../interfaces/Log';
import { ISuccessObject, ICollectionSuccessObject } from '../../../interfaces/ResponseObject';

// Action creators
export const fetchUserRequest = (): FetchUserRequestAction => ({
    type: ActionTypes.FETCH_USER_REQUEST
});

export const fetchUserSuccess = (user: ISuccessObject<IUser>): FetchUserSuccessAction => ({
    type: ActionTypes.FETCH_USER_SUCCESS,
    payload: user
});

export const fetchLogsForUserRequest = (): FetchLogsForUserRequestAction => ({
    type: ActionTypes.FETCH_LOGS_FOR_USER_REQUEST
});

export const fetchLogsForUserSuccess = (payload: ICollectionSuccessObject<ILog>): FetchLogsForUserSuccessAction => ({
    type: ActionTypes.FETCH_LOGS_FOR_USER_SUCCES,
    payload
});
