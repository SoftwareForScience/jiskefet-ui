/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Subsystem } from '../../interfaces/SubSytem';
import { HttpError } from '../../interfaces/HttpError';
import { request } from '../../request';
import { Action, Reducer } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '../types';

// State interface
export interface SubsystemState {
    fetchingSubsystems: boolean;
    subsystems: Subsystem[];
    current: Subsystem | null;
}

// Action types
export enum ActionTypes {
    SUBSYSTEM_FETCH_REQUEST = 'SUBSYSTEM_FETCH_REQUEST',
    SUBSYSTEM_FETCH_SUCCESS = 'SUBSYSTEM_FETCH_SUCCESS'
}

// Action interfaces
interface FetchSubsystemsRequestAction extends Action {
    type: ActionTypes.SUBSYSTEM_FETCH_REQUEST;
}

interface FetchSubsystemsSuccessAction extends Action {
    type: ActionTypes.SUBSYSTEM_FETCH_SUCCESS;
    payload: Subsystem[];
}

// Combine actions into single type
export type SubsystemAction = FetchSubsystemsSuccessAction | FetchSubsystemsRequestAction;

// Shorthand type for ThunkAction
type ThunkResult<R> = ThunkAction<R, RootState, undefined, SubsystemAction>;

// Initial state
const initialState: SubsystemState = {
    fetchingSubsystems: false,
    subsystems: [],
    current: null
};

// Reducer
export const subsystemReducer: Reducer<SubsystemState>
    = (state: SubsystemState = initialState, action: SubsystemAction): SubsystemState => {
    switch (action.type) {
        case ActionTypes.SUBSYSTEM_FETCH_REQUEST:
            return {
                ...state,
                fetchingSubsystems: true
            };
        case ActionTypes.SUBSYSTEM_FETCH_SUCCESS:
            return {
                ...state,
                fetchingSubsystems: false,
                subsystems: action.payload
            };
        default:
            return state;
    }
};

// Action creators
export const fetchSubsystems = (): ThunkResult<void> =>
    (dispatch: ThunkDispatch<RootState, void, SubsystemAction>): void => {
        dispatch<FetchSubsystemsRequestAction>({ type: ActionTypes.SUBSYSTEM_FETCH_REQUEST});
        request({
            method: 'GET',
            url: `${process.env.API_URL}subsystems`,
            withCredentials: false
        }).then((result: Subsystem[]) => {
            dispatch<FetchSubsystemsSuccessAction>({
                    type: ActionTypes.SUBSYSTEM_FETCH_SUCCESS,
                    payload: result
            });
        }).catch((error: HttpError) => {
            // State.HttpErrorModel.add(error);
        });
    };

// Selectors
export const selectSubsystems = (state: RootState): Subsystem[] => state.subsystem.subsystems;
