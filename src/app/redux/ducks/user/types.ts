/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { User } from '../../../interfaces/User';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../types';
import { Log } from '../../../interfaces/Log';
import { ResponseObject, ResponseObjectCollection } from '../../../interfaces/ResponseObject';

// State interface
export interface UserState {
    IsFetchingUser: boolean;
    IsFetchingLogs: boolean;
    logCount: number;
    logs: Log[];
    user: User | null;
    current: User | null;
}

// Action types
export enum ActionTypes {
    FETCH_USER_REQUEST = 'jiskefet/user/FETCH_USER_REQUEST',
    FETCH_USER_SUCCESS = 'jiskefet/user/FETCH_USER_SUCCESS',
    FETCH_LOGS_FOR_USER_REQUEST = 'jiskefet/user/FETCH_LOGS_FOR_USER_REQUEST',
    FETCH_LOGS_FOR_USER_SUCCES = 'jiskefet/user/FETCH_LOGS_FOR_USER_SUCCESS'
}

// Action interfaces
export interface FetchUserRequestAction extends Action {
    type: ActionTypes.FETCH_USER_REQUEST;
}

export interface FetchUserSuccessAction extends Action {
    type: ActionTypes.FETCH_USER_SUCCESS;
    payload: ResponseObject<User>;
}

export interface FetchLogsForUserRequestAction extends Action {
    type: ActionTypes.FETCH_LOGS_FOR_USER_REQUEST;
}

export interface FetchLogsForUserSuccessAction extends Action {
    type: ActionTypes.FETCH_LOGS_FOR_USER_SUCCES;
    payload: ResponseObjectCollection<Log>;
}

// Combine actions into single type
export type UserAction =
    | FetchUserSuccessAction
    | FetchUserRequestAction
    | FetchLogsForUserRequestAction
    | FetchLogsForUserSuccessAction;

// Shorthand type for ThunkAction
export type ThunkResult<R> = ThunkAction<R, RootState, undefined, UserAction>;
