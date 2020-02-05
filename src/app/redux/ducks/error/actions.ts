/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { ActionTypes, AddHttpErrorAction, ClearHttpErrorsAction } from './types';
import { IHttpError } from '../../../interfaces/HttpError';

// Action creators
export const addHttpError = (httpError: IHttpError<any>): AddHttpErrorAction => ({
    type: ActionTypes.ADD_HTTP_ERROR,
    payload: httpError,
});

export const clearHttpErrors = (): ClearHttpErrorsAction => ({
    type: ActionTypes.CLEAR_HTTP_ERRORS
});
