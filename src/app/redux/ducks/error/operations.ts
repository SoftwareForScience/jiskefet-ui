/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { ThunkResult, ErrorAction } from './types';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../types';
import { selectErrors } from './selectors';
import { clearHttpErrors } from './actions';
import { IHttpError } from '../../../interfaces/HttpError';

// Thunks

/**
 * Returns the errors currently in the error store and then clears the error store (excluding errorHistory).
 */
export const extractErrors = (): ThunkResult<Promise<Array<IHttpError<any>>>> =>
    async (dispatch: ThunkDispatch<RootState, void, ErrorAction>, getState: () =>
        RootState): Promise<Array<IHttpError<any>>> => {
        const errors = await selectErrors(getState());
        if (errors.length > 0) {
            await dispatch(clearHttpErrors());
        }
        return errors;
    };
