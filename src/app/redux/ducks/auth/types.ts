/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Action } from 'redux';
import { RootState } from '../../types';
import { ThunkAction } from 'redux-thunk';
import { UserProfile } from '../../../interfaces/UserProfile';
import { IAuthorizeResponse } from '../../../interfaces/Auth';
import { ISuccessObject } from '../../../interfaces/ResponseObject';

// State interface
export interface AuthState {
    profile: UserProfile | null;
    token: string | null;
    isAuthorizing: boolean;
    isFetchingProfile: boolean;
}

// Action types
export enum ActionTypes {
    FETCH_PROFILE_REQUEST = 'jiskefet/auth/FETCH_PROFILE_REQUEST',
    FETCH_PROFILE_SUCCESS = 'jiskefet/auth/FETCH_PROFILE_SUCCESS',
    AUTHORIZE_REQUEST = 'jiskefet/auth/AUTHORIZE_REQUEST',
    AUTHORIZE_SUCCESS = 'jiskefet/auth/AUTHORIZE_SUCCESS',
    USER_LOGOUT = 'jiskefet/auth/USER_LOGOUT'
}

// Action interfaces
export interface FetchProfileRequestAction extends Action {
    type: ActionTypes.FETCH_PROFILE_REQUEST;
}

export interface FetchProfileSuccessAction extends Action {
    type: ActionTypes.FETCH_PROFILE_SUCCESS;
    payload: ISuccessObject<UserProfile>;
}

export interface AuthorizeRequestAction extends Action {
    type: ActionTypes.AUTHORIZE_REQUEST;
}

export interface AuthorizeSuccessAction extends Action {
    type: ActionTypes.AUTHORIZE_SUCCESS;
    payload: IAuthorizeResponse;
}

export interface UserLogoutAction extends Action {
    type: ActionTypes.USER_LOGOUT;
}

// Combine actions into single type
export type AuthAction =
    | FetchProfileRequestAction
    | FetchProfileSuccessAction
    | AuthorizeRequestAction
    | AuthorizeSuccessAction
    | UserLogoutAction;

// Shorthand type for ThunkAction
export type ThunkResult<R> = ThunkAction<R, RootState, undefined, AuthAction>;
