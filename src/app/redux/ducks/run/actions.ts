/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import {
    ActionTypes,
    FetchRunsByLogRequestAction,
    FetchRunsByLogSuccessAction,
    FetchRunRequestAction,
    FetchRunSuccessAction,
    LinkLogToRunRequestAction,
    LinkLogToRunSuccesAction,
} from './types';
import { IRun } from '../../../interfaces/Run';
import { ICollectionSuccessObject, ISuccessObject } from '../../../interfaces/ResponseObject';

// Action creators
export const fetchRunsRequest = (): FetchRunsByLogRequestAction => ({
    type: ActionTypes.FETCH_RUNS_REQUEST
});

export const fetchRunsSuccess = (payload: ICollectionSuccessObject<IRun>): FetchRunsByLogSuccessAction => ({
    type: ActionTypes.FETCH_RUNS_SUCCESS,
    payload
});

export const fetchRunRequest = (): FetchRunRequestAction => ({
    type: ActionTypes.FETCH_RUN_REQUEST
});

export const fetchRunSuccess = (run: ISuccessObject<IRun>): FetchRunSuccessAction => ({
    type: ActionTypes.FETCH_RUN_SUCCESS,
    payload: run
});

export const linkLogToRunRequest = (): LinkLogToRunRequestAction => ({
    type: ActionTypes.LINK_LOG_TO_RUN_REQUEST
});

export const linkLogToRunSucces = (): LinkLogToRunSuccesAction => ({
    type: ActionTypes.LINK_LOG_TO_RUN_SUCCESS
});
