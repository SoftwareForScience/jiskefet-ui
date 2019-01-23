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
import { Log, LogCreate } from '../../../interfaces/Log';
import { HttpError } from '../../../interfaces/HttpError';
import { request } from '../../../request';
import {
    fetchLogsRequest,
    fetchLogsSuccess,
    fetchLogRequest,
    fetchLogSuccess,
    createLogRequest,
    createLogSuccess,
    linkRunToLogRequest,
    linkRunToLogSucces
} from './actions';
import { getLogs, getLog, linkRunToLogUrl, postLog } from '../../../constants/apiUrls';
import { ErrorAction } from '../error/types';
import { addHttpError } from '../error/actions';
import { ResponseObject, CollectionResponseObject } from '../../../interfaces/ResponseObject';

// Thunks
export const fetchLogs = (query?: string): ThunkResult<Promise<void>> =>
    async (dispatch: ThunkDispatch<RootState, void, LogAction | ErrorAction>): Promise<void> => {
        dispatch(fetchLogsRequest());
        return request({
            method: 'GET',
            url: getLogs(query)
        }).then((result: CollectionResponseObject<Log>) => {
            dispatch(fetchLogsSuccess(result));
        }).catch((error: HttpError) => {
            dispatch(addHttpError(error));
        });
    };

export const fetchLog = (id: number): ThunkResult<Promise<void>> =>
    async (dispatch: ThunkDispatch<RootState, void, LogAction | ErrorAction>): Promise<void> => {
        dispatch(fetchLogRequest());
        return request({
            method: 'GET',
            url: getLog(id)
        }).then((result: ResponseObject<Log>) => {
            dispatch(fetchLogSuccess(result));
        }).catch((error: HttpError) => {
            dispatch(addHttpError(error));
        });
    };

export const linkRunToLog = (logId: number, runNumber: number): ThunkResult<Promise<void>> =>
    async (dispatch: ThunkDispatch<RootState, void, LogAction | ErrorAction>): Promise<void> => {
        dispatch(linkRunToLogRequest());
        return request({
            method: 'PATCH',
            url: linkRunToLogUrl(logId),
            data: { runNumber: runNumber as number }
        }).then(() => {
            dispatch(linkRunToLogSucces());
        }).catch((error: HttpError) => {
            dispatch(addHttpError(error));
        });
    };

export const createLog = (logToBeCreated: LogCreate): ThunkResult<Promise<void>> =>
    async (dispatch: ThunkDispatch<RootState, void, LogAction | ErrorAction>): Promise<void> => {
        dispatch(createLogRequest());
        return request({
            method: 'POST',
            url: postLog(),
            data: logToBeCreated
        }).then((result: any) => {
            if (result.error) {
                dispatch(addHttpError(result.error));
            }
            dispatch(createLogSuccess());
        }).catch((error: HttpError) => {
            dispatch(addHttpError(error));
        });
    };
