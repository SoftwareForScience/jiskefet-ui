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
import { OrderDirection } from '../../../enums/OrderDirection';
import { IFilterState, Filters } from '../../../interfaces/Filter';

// State interface
export interface FilterState extends IFilterState {
    logFilters: LogFilters;
}

export interface LogFilters extends Filters {
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

// Action types
export enum ActionTypes {
    SET_LOG_FILTER = 'jiskefet/filter/SET_LOG_FILTER',
    SET_LOG_FILTERS = 'jiskefet/filter/SET_LOG_FILTERS',
    RESET_LOG_FILTERS = 'jiskefet/filter/RESET_LOG_FILTERS',
}

// Action interfaces
export interface SetLogFilterAction extends Action {
    type: ActionTypes.SET_LOG_FILTER;
    payload: {
        key: string;
        value: any;
    };
}

export interface SetLogFiltersAction extends Action {
    type: ActionTypes.SET_LOG_FILTERS;
    payload: Filters;
}

export interface ResetLogFiltersAction extends Action {
    type: ActionTypes.RESET_LOG_FILTERS;
}

// Combine actions into single type
export type FilterAction =
    | SetLogFilterAction
    | SetLogFiltersAction
    | ResetLogFiltersAction;

// Shorthand type for ThunkAction
export type ThunkResult<R> = ThunkAction<R, RootState, undefined, FilterAction>;
