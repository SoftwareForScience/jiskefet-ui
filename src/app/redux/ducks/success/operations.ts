/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { ThunkResult, SuccessAction } from './types';
import { RootState } from '../../types';
import { selectSuccesMessages } from './selectors';
import { ThunkDispatch } from 'redux-thunk';
import { clearSuccessMessages } from './actions';

// Thunks

/**
 * Returns the success messages and removes them from the list.
 */
export const getSuccessMessages = (): ThunkResult<Promise<string[]>> =>
    async (dispatch: ThunkDispatch<RootState, void, SuccessAction>, getState: () => RootState): Promise<string[]> => {
        const successMessages = await selectSuccesMessages(getState());
        dispatch(clearSuccessMessages());
        return successMessages;
    };
