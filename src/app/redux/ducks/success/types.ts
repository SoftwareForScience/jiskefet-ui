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

// State interface
export interface SuccessState {
    successList: string[];
}

// Action types
export enum ActionTypes {
    ADD_SUCCESS_MESSAGE = 'jiskefet/succes/ADD_SUCCESS_MESSAGE',
}

// Action interfaces
export interface AddSuccessMessageAction extends Action {
    type: ActionTypes.ADD_SUCCESS_MESSAGE;
    payload: string;
}

// Combine actions into single type
export type SuccessAction = AddSuccessMessageAction;

// Shorthand type for ThunkAction
export type ThunkResult<R> = ThunkAction<R, RootState, undefined, SuccessAction>;
