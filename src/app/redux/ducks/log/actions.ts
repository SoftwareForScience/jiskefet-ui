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
    FetchThreadRequestAction,
    FetchThreadSuccessAction,
    FetchTagsByLogRequestAction,
    FetchTagsByLogSuccessAction
} from './types';
import { ILog, ILogCreate } from '../../../interfaces/Log';
import { ISuccessObject, ICollectionSuccessObject } from '../../../interfaces/ResponseObject';
import { ITag } from '../../../interfaces/Tag';

// Action creators
export const fetchThreadRequest = (): FetchThreadRequestAction => ({
    type: ActionTypes.FETCH_THREAD_REQUEST
});

export const fetchThreadSuccess = (payload: ISuccessObject<ILog>): FetchThreadSuccessAction => ({
    type: ActionTypes.FETCH_THREAD_SUCCESS,
    payload
});

export const fetchLogsRequest = (): FetchLogsByLogRequestAction => ({
    type: ActionTypes.FETCH_LOGS_REQUEST
});

export const fetchLogsSuccess = (payload: ICollectionSuccessObject<ILog>): FetchLogsByLogSuccessAction => ({
    type: ActionTypes.FETCH_LOGS_SUCCESS,
    payload
});

export const fetchLogRequest = (): FetchLogRequestAction => ({
    type: ActionTypes.FETCH_LOG_REQUEST
});

export const fetchLogSuccess = (payload: ISuccessObject<ILog>): FetchLogSuccessAction => ({
    type: ActionTypes.FETCH_LOG_SUCCESS,
    payload
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

export const setLogToBeCreated = (logToBeCreated: ILogCreate): SetLogToBeCreatedAction => ({
    type: ActionTypes.SET_LOG_TO_BE_CREATED,
    payload: logToBeCreated
});

export const clearLogToBeCreated = (): ClearLogToBeCreatedAction => ({
    type: ActionTypes.CLEAR_LOG_TO_BE_CREATED
});

export const fetchTagsByLogRequest = (): FetchTagsByLogRequestAction => ({
    type: ActionTypes.FETCH_TAGS_BY_LOG_REQUEST
});

export const fetchTagsByLogSuccess = (
    payload: ICollectionSuccessObject<ITag>): FetchTagsByLogSuccessAction => ({
    type: ActionTypes.FETCH_TAGS_BY_LOG_SUCCESS,
    payload
});
