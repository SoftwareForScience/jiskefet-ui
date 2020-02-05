/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import {
    ThunkResult,
    SubsystemAction
} from './types';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../types';
import {
    getSubsystems,
    getSubsystem,
    getSubsystemOverviews,
    getSubsystemPermissions,
    postToken
} from '../../../constants/apiUrls';
import { ISubsystem } from '../../../interfaces/SubSytem';
import { IHttpError } from '../../../interfaces/HttpError';
import { request } from '../../../request';
import {
    fetchSubsystemsRequest,
    fetchSubsystemsSuccess,
    fetchSubsystemRequest,
    fetchSubsystemSuccess,
    fetchSubsystemOverviewsRequest,
    fetchSubsystemOverviewsSuccess,
    fetchSubsystemPermissionsRequest,
    fetchSubsystemPermissionsSuccess,
    createTokenRequest,
    createTokenSuccess
} from './actions';
import { ISubsystemOverview } from '../../../interfaces/SubsystemOverview';
import {
    ISubsystemPermission,
    ISubsystemPermissionCreate,
    ISubsystemToken
} from '../../../interfaces/SubsystemPermission';
import { addHttpError } from '../error/actions';
import { ErrorAction } from '../error/types';
import { addSuccessMessage } from '../success/actions';
import { SuccessAction } from '../success/types';
import { ICollectionSuccessObject, ISuccessObject } from '../../../interfaces/ResponseObject';

// Thunks
export const fetchSubsystems = (): ThunkResult<void> =>
    (dispatch: ThunkDispatch<RootState, void, SubsystemAction | ErrorAction>): void => {
        dispatch(fetchSubsystemsRequest());
        request({
            method: 'GET',
            url: getSubsystems()
        }).then((result: ICollectionSuccessObject<ISubsystem>) => {
            dispatch(fetchSubsystemsSuccess(result));
        }).catch((error: IHttpError<any>) => {
            dispatch(addHttpError(error));
        });
    };

export const fetchSubsystem = (id: string | number): ThunkResult<Promise<void>> =>
    async (dispatch: ThunkDispatch<RootState, void, SubsystemAction | ErrorAction>): Promise<void> => {
        dispatch(fetchSubsystemRequest());
        return request({
            method: 'GET',
            url: getSubsystem(id)
        }).then((result: ISuccessObject<ISubsystem>) => {
            dispatch(fetchSubsystemSuccess(result));
        }).catch((error: IHttpError<any>) => {
            dispatch(addHttpError(error));
        });
    };

export const fetchSubsystemOverviews = (query?: string): ThunkResult<void> =>
    (dispatch: ThunkDispatch<RootState, void, SubsystemAction | ErrorAction>): void => {
        dispatch(fetchSubsystemOverviewsRequest());
        request({
            method: 'GET',
            url: getSubsystemOverviews(query)
        }).then((result: ICollectionSuccessObject<ISubsystemOverview>) => {
            dispatch(fetchSubsystemOverviewsSuccess(result));
        }).catch((error: IHttpError<any>) => {
            dispatch(addHttpError(error));
        });
    };

export const fetchSubsystemPermissions = (userId: number): ThunkResult<void> =>
    (dispatch: ThunkDispatch<RootState, void, SubsystemAction | ErrorAction>): void => {
        dispatch(fetchSubsystemPermissionsRequest());
        request({
            method: 'GET',
            url: getSubsystemPermissions(userId)
        }).then((result: ICollectionSuccessObject<ISubsystemPermission>) => {
            dispatch(fetchSubsystemPermissionsSuccess(result));
        }).catch((error: IHttpError<any>) => {
            dispatch(addHttpError(error));
        });
    };

export const createToken = (payload: ISubsystemPermissionCreate): ThunkResult<Promise<void>> =>
    async (dispatch: ThunkDispatch<RootState, void, SubsystemAction | ErrorAction | SuccessAction>): Promise<void> => {
        dispatch(createTokenRequest());
        return request({
            method: 'POST',
            data: payload,
            url: postToken(payload.user)
        }).then((result: ISuccessObject<ISubsystemToken>) => {
            dispatch(createTokenSuccess());
            const tokenString =
                `Successfully saved the token. Please write it down: \n${result.data.item.subSystemHash}`;
            dispatch(addSuccessMessage(tokenString));
        }).catch((error: IHttpError<any>) => {
            dispatch(addHttpError(error));
        });
    };
