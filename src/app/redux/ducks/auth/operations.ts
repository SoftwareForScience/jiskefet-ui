/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as Cookie from 'js-cookie';
import { ThunkResult, AuthAction } from './types';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../types';
import { request } from '../../../request';
import { fetchProfileSuccess, fetchProfileRequest, authorizeRequest, authorizeSuccess, userLogout } from './actions';
import { HttpError } from '../../../interfaces/HttpError';
import { UserProfile } from '../../../interfaces/UserProfile';
import { getAuthorize, getProfile } from '../../../constants/apiUrls';
import { AuthorizeResponse } from '../../../interfaces/Auth';
import { initialize } from '../../../app';
import { ErrorAction } from '../error/types';
import { addHttpError } from '../error/actions';

// Thunks
export const fetchProfile = (): ThunkResult<Promise<void>> =>
    async (dispatch: ThunkDispatch<RootState, void, AuthAction | ErrorAction>): Promise<void> => {
        dispatch(fetchProfileRequest());
        return request({
            method: 'GET',
            url: getProfile()
        }).then((result: UserProfile) => {
            dispatch(fetchProfileSuccess(result));
        }).catch((error: HttpError) => {
            dispatch(addHttpError(error));
        });
    };

export const authorize = (authGrant: string): ThunkResult<Promise<void>> =>
    async (dispatch: ThunkDispatch<RootState, void, AuthAction | ErrorAction>): Promise<void> => {
        dispatch(authorizeRequest());
        return request({
            method: 'GET',
            url: getAuthorize(authGrant)
        }).then((result: AuthorizeResponse) => {
            dispatch(authorizeSuccess(result));
        }).catch((error: HttpError) => {
            dispatch(addHttpError(error));
        });
    };

export const logout = (): ThunkResult<Promise<void>> =>
    async (dispatch: ThunkDispatch<RootState, void, AuthAction>): Promise<void> => {
        dispatch(userLogout());
        Cookie.remove('token');
        if (process.env.USE_CERN_SSO === 'true') {
            Cookie.set('isLoggedOut', 'true');
        }
        initialize();
    };
