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
import { Subsystem } from '../../../interfaces/SubSytem';
import { HttpError } from '../../../interfaces/HttpError';
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
import { SubsystemOverview } from '../../../interfaces/SubsystemOverview';
import {
    SubsystemPermission,
    SubsystemPermissionCreate,
    SubsystemToken
} from '../../../interfaces/SubsystemPermission';

// Thunks
export const fetchSubsystems = (): ThunkResult<void> =>
    (dispatch: ThunkDispatch<RootState, void, SubsystemAction>): void => {
        dispatch(fetchSubsystemsRequest());
        request({
            method: 'GET',
            url: getSubsystems()
        }).then((result: Subsystem[]) => {
            dispatch(fetchSubsystemsSuccess(result));
        }).catch((error: HttpError) => {
            // State.HttpErrorModel.add(error);
        });
    };

export const fetchSubsystem = (id: string | number): ThunkResult<Promise<void>> =>
    (dispatch: ThunkDispatch<RootState, void, SubsystemAction>): Promise<void> => {
        dispatch(fetchSubsystemRequest());
        return request({
            method: 'GET',
            url: getSubsystem(id)
        }).then((result: Subsystem) => {
            dispatch(fetchSubsystemSuccess(result));
        }).catch((error: HttpError) => {
            // State.HttpErrorModel.add(error);
        });
    };

export const fetchSubsystemOverviews = (query?: string): ThunkResult<void> =>
    (dispatch: ThunkDispatch<RootState, void, SubsystemAction>): void => {
        dispatch(fetchSubsystemOverviewsRequest());
        request({
            method: 'GET',
            url: getSubsystemOverviews(query)
        }).then((result: SubsystemOverview[]) => {
            dispatch(fetchSubsystemOverviewsSuccess(result));
        }).catch((error: HttpError) => {
            // State.HttpErrorModel.add(error);
        });
    };

export const fetchSubsystemPermissions = (userId: number): ThunkResult<void> =>
    (dispatch: ThunkDispatch<RootState, void, SubsystemAction>): void => {
        dispatch(fetchSubsystemPermissionsRequest());
        request({
            method: 'GET',
            url: getSubsystemPermissions(userId)
        }).then((result: SubsystemPermission[]) => {
            dispatch(fetchSubsystemPermissionsSuccess(result));
        }).catch((error: HttpError) => {
            // State.HttpErrorModel.add(error);
        });
    };

export const createToken = (payload: SubsystemPermissionCreate): ThunkResult<Promise<void>> =>
    async (dispatch: ThunkDispatch<RootState, void, SubsystemAction>): Promise<void> => {
        dispatch(createTokenRequest());
        return request({
            method: 'POST',
            data: payload,
            url: postToken(payload.user.userId)
        }).then((result: SubsystemToken) => {
            dispatch(createTokenSuccess());
            console.log(`Temporary way of displaying token... Token: ${result.subSystemHash}`);
            // SuccesModel.add(`Successfully saved the token. Please write it down: \n${result.subSystemHash}`);
        }).catch((error: HttpError) => {
            // State.HttpErrorModel.add(error);
        });
    };
