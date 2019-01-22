/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Subsystem } from '../../../interfaces/SubSytem';
import {
    FetchSubsystemsRequestAction,
    ActionTypes,
    FetchSubsystemsSuccessAction,
    FetchSubsystemRequestAction,
    FetchSubsystemSuccessAction,
    FetchSubsystemOverviewsRequestAction,
    FetchSubsystemOverviewsSuccessAction,
    FetchSubsystemPermissionsRequestAction,
    FetchSubsystemPermissionsSuccessAction,
    CreateTokenRequestAction,
    CreateTokenSuccessAction
} from './types';
import { SubsystemOverview } from '../../../interfaces/SubsystemOverview';
import { SubsystemPermission } from '../../../interfaces/SubsystemPermission';

// Action creators
export const fetchSubsystemsRequest = (): FetchSubsystemsRequestAction => ({
    type: ActionTypes.FETCH_SUBSYSTEMS_REQUEST
});

export const fetchSubsystemsSuccess = (payload: Subsystem[]): FetchSubsystemsSuccessAction => ({
    type: ActionTypes.FETCH_SUBSYSTEMS_SUCCESS,
    payload
});

export const fetchSubsystemRequest = (): FetchSubsystemRequestAction => ({
    type: ActionTypes.FETCH_SUBSYSTEM_REQUEST
});

export const fetchSubsystemSuccess = (payload: Subsystem): FetchSubsystemSuccessAction => ({
    type: ActionTypes.FETCH_SUBSYSTEM_SUCCESS,
    payload
});

export const fetchSubsystemOverviewsRequest = (): FetchSubsystemOverviewsRequestAction => ({
    type: ActionTypes.FETCH_SUBSYSTEM_OVERVIEWS_REQUEST
});

export const fetchSubsystemOverviewsSuccess = (payload: SubsystemOverview[]): FetchSubsystemOverviewsSuccessAction => ({
    type: ActionTypes.FETCH_SUBSYSTEM_OVERVIEWS_SUCCESS,
    payload
});

export const fetchSubsystemPermissionsRequest = (): FetchSubsystemPermissionsRequestAction => ({
    type: ActionTypes.FETCH_SUBSYSTEM_PERMISSIONS_REQUEST
});

export const fetchSubsystemPermissionsSuccess
    = (payload: SubsystemPermission[]): FetchSubsystemPermissionsSuccessAction => ({
    type: ActionTypes.FETCH_SUBSYSTEM_PERMISSIONS_SUCCESS,
    payload
});

export const createTokenRequest = (): CreateTokenRequestAction => ({
    type: ActionTypes.CREATE_TOKEN_REQUEST
});

export const createTokenSuccess = (): CreateTokenSuccessAction => ({
    type: ActionTypes.CREATE_TOKEN_SUCCESS
});
