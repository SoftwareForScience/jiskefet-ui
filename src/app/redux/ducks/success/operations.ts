/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { ThunkResult } from './types';
import { RootState } from '../../types';
import { selectSuccesMessages } from './selectors';

// Thunks

/**
 * returns the success messages and removes them from the list.
 */
export const getSuccessMessages = (): ThunkResult<Promise<string[]>> =>
    async (getState: () => RootState): Promise<string[]> => {
        const state = getState();
        const successMessages = await selectSuccesMessages(state);
        state.success.successList = [];
        return successMessages;
    };
