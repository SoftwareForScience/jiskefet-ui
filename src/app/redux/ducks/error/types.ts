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
import { IHttpError } from '../../../interfaces/HttpError';

// State interface
export interface ErrorState {
    httpErrors: Array<IHttpError<any>>;
    errorHistory: object[];
}

// Action types
export enum ActionTypes {
    ADD_HTTP_ERROR = 'jiskefet/error/ADD_HTTP_ERROR',
    CLEAR_HTTP_ERRORS = 'jiskefet/error/CLEAR_HTTP_ERRORS',
}

// Action interfaces
export interface AddHttpErrorAction extends Action {
    type: ActionTypes.ADD_HTTP_ERROR;
    payload: IHttpError<any>;
}

export interface ClearHttpErrorsAction extends Action {
    type: ActionTypes.CLEAR_HTTP_ERRORS;
}

// Combine actions into single type
export type ErrorAction =
    | AddHttpErrorAction
    | ClearHttpErrorsAction;

// Shorthand type for ThunkAction
export type ThunkResult<R> = ThunkAction<R, RootState, undefined, ErrorAction>;
