/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import {
    FetchProfileSuccessAction,
    FetchProfileRequestAction,
    ActionTypes,
    AuthorizeRequestAction,
    AuthorizeSuccessAction,
    UserLogoutAction
} from './types';
import { UserProfile } from '../../../interfaces/UserProfile';
import { IAuthorizeResponse } from '../../../interfaces/Auth';
import { ISuccessObject } from '../../../interfaces/ResponseObject';

// Action creators
export const fetchProfileRequest = (): FetchProfileRequestAction => ({
    type: ActionTypes.FETCH_PROFILE_REQUEST
});

export const fetchProfileSuccess = (payload: ISuccessObject<UserProfile>): FetchProfileSuccessAction => ({
    type: ActionTypes.FETCH_PROFILE_SUCCESS,
    payload
});

export const authorizeRequest = (): AuthorizeRequestAction => ({
    type: ActionTypes.AUTHORIZE_REQUEST
});

export const authorizeSuccess = (payload: IAuthorizeResponse): AuthorizeSuccessAction => ({
    type: ActionTypes.AUTHORIZE_SUCCESS,
    payload
});

export const userLogout = (): UserLogoutAction => ({
    type: ActionTypes.USER_LOGOUT
});
