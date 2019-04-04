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
import { User } from '../../../interfaces/User';
import { Log } from '../../../interfaces/Log';
import { SuccessObject, CollectionSuccessObject } from '../../../interfaces/ResponseObject';

// Action creators
export const fetchUserRequest = (): FetchUserRequestAction => ({
    type: ActionTypes.FETCH_USER_REQUEST
});

export const fetchUserSuccess = (user: SuccessObject<User>): FetchUserSuccessAction => ({
    type: ActionTypes.FETCH_USER_SUCCESS,
    payload: user
});

export const fetchLogsForUserRequest = (): FetchLogsForUserRequestAction => ({
    type: ActionTypes.FETCH_LOGS_FOR_USER_REQUEST
});

export const fetchLogsForUserSuccess = (payload: CollectionSuccessObject<Log>): FetchLogsForUserSuccessAction => ({
    type: ActionTypes.FETCH_LOGS_FOR_USER_SUCCES,
    payload
});
