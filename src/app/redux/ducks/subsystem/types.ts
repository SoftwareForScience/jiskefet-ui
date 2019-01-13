/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Subsystem } from '../../../interfaces/SubSytem';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../types';

// State interface
export interface SubsystemState {
    fetchingSubsystems: boolean;
    subsystems: Subsystem[];
    current: Subsystem | null;
}

// Action types
export enum ActionTypes {
    FETCH_SUBSYSTEMS_REQUEST = 'jiskefet/subsystem/FETCH_SUBSYSTEMS_REQUEST',
    FETCH_SUBSYSTEMS_SUCCESS = 'jiskefet/subsystem/FETCH_SUBSYSTEMS_SUCCESS'
}

// Action interfaces
export interface FetchSubsystemsRequestAction extends Action {
    type: ActionTypes.FETCH_SUBSYSTEMS_REQUEST;
}

export interface FetchSubsystemsSuccessAction extends Action {
    type: ActionTypes.FETCH_SUBSYSTEMS_SUCCESS;
    payload: Subsystem[];
}

// Combine actions into single type
export type SubsystemAction = FetchSubsystemsSuccessAction | FetchSubsystemsRequestAction;

// Shorthand type for ThunkAction
export type ThunkResult<R> = ThunkAction<R, RootState, undefined, SubsystemAction>;
