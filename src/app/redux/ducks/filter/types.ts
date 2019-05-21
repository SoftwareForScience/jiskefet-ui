/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { RootState, NamedAction } from '../../types';
import { ThunkAction } from 'redux-thunk';
import { OrderDirection } from '../../../enums/OrderDirection';
import { IFilterState, FilterValue, FilterName } from '../../../interfaces/Filter';

// State interface
export interface RootFilterState {
    [FilterName.Log]: LogFilters;
    [FilterName.Run]: RunFilters;
    [FilterName.Subsystem]: SubsystemFilters;
    [FilterName.UserLog]: UserLogFilters;
}

export interface LogFilters extends IFilterState {
    logId: string | null;
    searchterm: string | null;
    creationTime: string | null;
    origin: string | null;
    subType: string | null;
    orderBy: string | null;
    orderDirection: OrderDirection | null;
    pageSize: number;
    pageNumber: number;
}

export interface RunFilters extends IFilterState {
    runNumber: string | null;
    activityId: string | null;
    runType: string | null;
    runQuality: string | null;
    startTimeO2Start: string | null;
    endTimeO2Start: string | null;
    startTimeO2End: string | null;
    endTimeO2End: string | null;
    startTimeTrgStart: string | null;
    endTimeTrgStart: string | null;
    startTimeTrgEnd: string | null;
    endTimeTrgEnd: string | null;
    orderBy: string | null;
    orderDirection: OrderDirection | null;
    pageSize: number;
    pageNumber: number;
}

export interface SubsystemFilters extends IFilterState {
    orderBy: string | null;
    orderDirection: OrderDirection | null;
    timeRange: number | null;
}

export interface UserLogFilters extends IFilterState {
    orderBy: string | null;
    orderDirection: OrderDirection | null;
    pageSize: number;
    pageNumber: number;
}

export interface NamedFilterAction extends NamedAction {
    name: FilterName;
}

// Action types
export enum ActionTypes {
    SET_FILTER = 'jiskefet/filter/SET_FILTER',
    SET_FILTERS = 'jiskefet/filter/SET_FILTERS',
    RESET_FILTERS = 'jiskefet/filter/RESET_FILTERS',
}

// Action interfaces
export interface SetFilterAction extends NamedFilterAction {
    type: ActionTypes.SET_FILTER;
    payload: {
        key: string;
        value: FilterValue;
    };
}

export interface SetFiltersAction extends NamedFilterAction {
    type: ActionTypes.SET_FILTERS;
    payload: IFilterState;
}

export interface ResetFiltersAction extends NamedFilterAction {
    type: ActionTypes.RESET_FILTERS;
}

// Combine actions into single type
export type FilterAction =
    | SetFilterAction
    | SetFiltersAction
    | ResetFiltersAction;

// Shorthand type for ThunkAction
export type ThunkResult<R> = ThunkAction<R, RootState, undefined, FilterAction>;
