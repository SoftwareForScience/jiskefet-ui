/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import {
    ActionTypes,
    FetchLogsByLogRequestAction,
    FetchLogsByLogSuccessAction,
    FetchLogRequestAction,
    FetchLogSuccessAction,
    LinkLogToLogRequestAction,
    LinkLogToLogSuccesAction,
    CreateLogRequestAction,
    CreateLogSuccessAction,
    SetLogToBeCreatedAction,
    ClearLogToBeCreatedAction,
} from './types';
import { Log, LogCreate } from '../../../interfaces/Log';

// Action creators
export const fetchLogsRequest = (): FetchLogsByLogRequestAction => ({
    type: ActionTypes.FETCH_LOGS_REQUEST
});

export const fetchLogsSuccess = (payload: { data: Log[], count: number }): FetchLogsByLogSuccessAction => ({
    type: ActionTypes.FETCH_LOGS_SUCCESS,
    payload
});

export const fetchLogRequest = (): FetchLogRequestAction => ({
    type: ActionTypes.FETCH_LOG_REQUEST
});

export const fetchLogSuccess = (run: Log): FetchLogSuccessAction => ({
    type: ActionTypes.FETCH_LOG_SUCCESS,
    payload: run
});

export const createLogRequest = (): CreateLogRequestAction => ({
    type: ActionTypes.CREATE_LOG_REQUEST
});

export const createLogSuccess = (): CreateLogSuccessAction => ({
    type: ActionTypes.CREATE_LOG_SUCCESS
});

export const linkRunToLogRequest = (): LinkLogToLogRequestAction => ({
    type: ActionTypes.LINK_RUN_TO_LOG_REQUEST
});

export const linkRunToLogSucces = (): LinkLogToLogSuccesAction => ({
    type: ActionTypes.LINK_RUN_TO_LOG_SUCCESS
});

export const setLogToBeCreated = (logToBeCreated: LogCreate): SetLogToBeCreatedAction => ({
    type: ActionTypes.SET_LOG_TO_BE_CREATED,
    payload: logToBeCreated
});

export const clearAtachmentToBeCreated = (): ClearLogToBeCreatedAction => ({
    type: ActionTypes.CLEAR_LOG_TO_BE_CREATED
});
