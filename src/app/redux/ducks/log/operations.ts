/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { ThunkResult, LogAction } from './types';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../types';
import { Log } from '../../../interfaces/Log';
import { HttpError } from '../../../interfaces/HttpError';
import { request } from '../../../request';
import {
    fetchLogsRequest,
    fetchLogsSuccess,
    fetchLogRequest,
    fetchLogSuccess
} from './actions';
import { getLogs, getLog, linkRunToLogUrl } from '../../../constants/apiUrls';

// Thunks
export const fetchLogs = (): ThunkResult<Promise<void>> =>
    async (dispatch: ThunkDispatch<RootState, void, LogAction>): Promise<void> => {
        dispatch(fetchLogsRequest());
        return request({
            method: 'GET',
            url: getLogs()
        }).then((result: { data: Log[], count: number }) => {
            dispatch(fetchLogsSuccess(result));
        }).catch((error: HttpError) => {
            // State.HttpErrorModel.add(error);
        });
    };

export const fetchLog = (id: number): ThunkResult<Promise<void>> =>
    async (dispatch: ThunkDispatch<RootState, void, LogAction>): Promise<void> => {
        dispatch(fetchLogRequest());
        return request({
            method: 'GET',
            url: getLog(id)
        }).then((result: Log) => {
            dispatch(fetchLogSuccess(result));
        }).catch((error: HttpError) => {
            // State.HttpErrorModel.add(error);
        });
    };

export const linkLogToLog = (logId: number, logNumber: number): ThunkResult<Promise<void>> =>
    async (dispatch: ThunkDispatch<RootState, void, LogAction>): Promise<void> => {
        dispatch(fetchLogRequest());
        return request({
            method: 'PATCH',
            url: linkRunToLogUrl(logNumber),
            data: { logId: logId as number }
        }).then((result: Log) => {
            dispatch(fetchLogSuccess(result));
        }).catch((error: HttpError) => {
            // State.HttpErrorModel.add(error);
        });
    };
