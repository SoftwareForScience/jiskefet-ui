/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../types';
import { IRun } from '../../../interfaces/Run';
import { ICollectionSuccessObject, ISuccessObject } from '../../../interfaces/ResponseObject';

// State interface
export interface RunState {
    isFetchingRuns: boolean;
    isFetchingRun: boolean;
    isPatchingLinkLogToRun: boolean;
    runs: IRun[];
    count: number;
    current: IRun | null;
}

// Action types
export enum ActionTypes {
    FETCH_RUNS_REQUEST = 'jiskefet/run/FETCH_RUNS_LOG_REQUEST',
    FETCH_RUNS_SUCCESS = 'jiskefet/run/FETCH_RUNS_LOG_SUCCESS',
    FETCH_RUN_REQUEST = 'jiskefet/run/FETCH_RUN_REQUEST',
    FETCH_RUN_SUCCESS = 'jiskefet/run/FETCH_RUN_SUCCESS',
    LINK_LOG_TO_RUN_REQUEST = 'jiskefet/run/LINK_RUN_TO_LOG_REQUEST',
    LINK_LOG_TO_RUN_SUCCESS = 'jiskefet/run/LINK_RUN_TO_LOG_SUCCESS',
}

// Action interfaces
export interface FetchRunsByLogRequestAction extends Action {
    type: ActionTypes.FETCH_RUNS_REQUEST;
}

export interface FetchRunsByLogSuccessAction extends Action {
    type: ActionTypes.FETCH_RUNS_SUCCESS;
    payload: ICollectionSuccessObject<IRun>;
}

export interface FetchRunRequestAction extends Action {
    type: ActionTypes.FETCH_RUN_REQUEST;
}

export interface FetchRunSuccessAction extends Action {
    type: ActionTypes.FETCH_RUN_SUCCESS;
    payload: ISuccessObject<IRun>;
}

export interface LinkLogToRunRequestAction extends Action {
    type: ActionTypes.LINK_LOG_TO_RUN_REQUEST;
}

export interface LinkLogToRunSuccesAction extends Action {
    type: ActionTypes.LINK_LOG_TO_RUN_SUCCESS;
}

// Combine actions into single type
export type RunAction =
    | FetchRunsByLogRequestAction
    | FetchRunsByLogSuccessAction
    | FetchRunRequestAction
    | FetchRunSuccessAction
    | LinkLogToRunRequestAction
    | LinkLogToRunSuccesAction;

// Shorthand type for ThunkAction
export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RunAction>;
