/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { ActionTypes, AddSuccessMessageAction } from './types';

// Action creators
export const addSuccessMessage = (succesMessage: string): AddSuccessMessageAction => ({
    type: ActionTypes.ADD_SUCCESS_MESSAGE,
    payload: succesMessage,
});
