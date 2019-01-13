/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { ActionTypes, FetchSubsystemsSuccessAction, FetchSubsystemsRequestAction } from './types';
import { Subsystem } from '../../../interfaces/SubSytem';

// Action creators
export const fetchRequest = (): FetchSubsystemsRequestAction => ({
    type: ActionTypes.FETCH_SUBSYSTEMS_REQUEST
});

export const fetchSuccess = (payload: Subsystem[]): FetchSubsystemsSuccessAction => ({
    type: ActionTypes.FETCH_SUBSYSTEMS_SUCCESS,
    payload
});
