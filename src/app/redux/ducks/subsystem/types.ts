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
import { SubsystemOverview } from '../../../interfaces/SubsystemOverview';
import { SubsystemPermission } from '../../../interfaces/SubsystemPermission';
import { CollectionResponseObject, ResponseObject } from '../../../interfaces/ResponseObject';

// State interface
export interface SubsystemState {
    isFetchingSubsystems: boolean;
    isFetchingSubsystem: boolean;
    isFetchingSubsystemOverviews: boolean;
    isFetchingSubsystemPermissions: boolean;
    isCreatingToken: boolean;
    subsystems: Subsystem[];
    current: Subsystem | null;
    subsystemOverviews: SubsystemOverview[];
    subsystemPermissions: SubsystemPermission[];
}

// Action types
export enum ActionTypes {
    FETCH_SUBSYSTEMS_REQUEST = 'jiskefet/subsystem/FETCH_SUBSYSTEMS_REQUEST',
    FETCH_SUBSYSTEMS_SUCCESS = 'jiskefet/subsystem/FETCH_SUBSYSTEMS_SUCCESS',
    FETCH_SUBSYSTEM_REQUEST = 'jiskefet/subsystem/FETCH_SUBSYSTEM_REQUEST',
    FETCH_SUBSYSTEM_SUCCESS = 'jiskefet/subsystem/FETCH_SUBSYSTEM_SUCCESS',
    FETCH_SUBSYSTEM_OVERVIEWS_REQUEST = 'jiskefet/subsystem/FETCH_SUBSYSTEM_OVERVIEWS_REQUEST',
    FETCH_SUBSYSTEM_OVERVIEWS_SUCCESS = 'jiskefet/subsystem/FETCH_SUBSYSTEM_OVERVIEWS_SUCCESS',
    FETCH_SUBSYSTEM_PERMISSIONS_REQUEST = 'jiskefet/subsystem/FETCH_SUBSYSTEM_PERMISSIONS_REQUEST',
    FETCH_SUBSYSTEM_PERMISSIONS_SUCCESS = 'jiskefet/subsystem/FETCH_SUBSYSTEM_PERMISSIONS_SUCCESS',
    CREATE_TOKEN_REQUEST = 'jiskefet/subsystem/CREATE_TOKEN_REQUEST',
    CREATE_TOKEN_SUCCESS = 'jiskefet/subsystem/CREATE_TOKEN_SUCCESS'
}

// Action interfaces
export interface FetchSubsystemsRequestAction extends Action {
    type: ActionTypes.FETCH_SUBSYSTEMS_REQUEST;
}

export interface FetchSubsystemsSuccessAction extends Action {
    type: ActionTypes.FETCH_SUBSYSTEMS_SUCCESS;
    payload: CollectionResponseObject<Subsystem>;
}

export interface FetchSubsystemRequestAction extends Action {
    type: ActionTypes.FETCH_SUBSYSTEM_REQUEST;
}

export interface FetchSubsystemSuccessAction extends Action {
    type: ActionTypes.FETCH_SUBSYSTEM_SUCCESS;
    payload: ResponseObject<Subsystem>;
}

export interface FetchSubsystemOverviewsRequestAction extends Action {
    type: ActionTypes.FETCH_SUBSYSTEM_OVERVIEWS_REQUEST;
}

export interface FetchSubsystemOverviewsSuccessAction extends Action {
    type: ActionTypes.FETCH_SUBSYSTEM_OVERVIEWS_SUCCESS;
    payload: CollectionResponseObject<SubsystemOverview>;
}

export interface FetchSubsystemPermissionsRequestAction extends Action {
    type: ActionTypes.FETCH_SUBSYSTEM_PERMISSIONS_REQUEST;
}

export interface FetchSubsystemPermissionsSuccessAction extends Action {
    type: ActionTypes.FETCH_SUBSYSTEM_PERMISSIONS_SUCCESS;
    payload: CollectionResponseObject<SubsystemPermission>;
}

export interface CreateTokenRequestAction extends Action {
    type: ActionTypes.CREATE_TOKEN_REQUEST;
}

export interface CreateTokenSuccessAction extends Action {
    type: ActionTypes.CREATE_TOKEN_SUCCESS;
}

// Combine actions into single type
export type SubsystemAction =
    | FetchSubsystemsSuccessAction
    | FetchSubsystemsRequestAction
    | FetchSubsystemRequestAction
    | FetchSubsystemSuccessAction
    | FetchSubsystemOverviewsRequestAction
    | FetchSubsystemOverviewsSuccessAction
    | FetchSubsystemPermissionsRequestAction
    | FetchSubsystemPermissionsSuccessAction
    | CreateTokenRequestAction
    | CreateTokenSuccessAction;

// Shorthand type for ThunkAction
export type ThunkResult<R> = ThunkAction<R, RootState, undefined, SubsystemAction>;
