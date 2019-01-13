/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import {
    ThunkResult,
    SubsystemAction,
    FetchSubsystemsRequestAction,
    ActionTypes,
    FetchSubsystemsSuccessAction
} from './types';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../types';
import { getSubsystems } from '../../../constants/apiUrls';
import { Subsystem } from '../../../interfaces/SubSytem';
import { HttpError } from '../../../interfaces/HttpError';
import { request } from '../../../request';

// Thunks
export const fetchSubsystems = (): ThunkResult<void> =>
    (dispatch: ThunkDispatch<RootState, void, SubsystemAction>): void => {
        dispatch<FetchSubsystemsRequestAction>({ type: ActionTypes.FETCH_SUBSYSTEMS_REQUEST });
        request({
            method: 'GET',
            url: getSubsystems(),
            withCredentials: false
        }).then((result: Subsystem[]) => {
            dispatch<FetchSubsystemsSuccessAction>({
                type: ActionTypes.FETCH_SUBSYSTEMS_SUCCESS,
                payload: result
            });
        }).catch((error: HttpError) => {
            // State.HttpErrorModel.add(error);
        });
    };
