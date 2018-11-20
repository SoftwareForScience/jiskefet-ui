/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Log, LogCreate } from '../interfaces/Log';
import State from './State';
import SuccesModel from './Success';
import { HttpError } from '../interfaces/HttpError';
import { request } from '../request';

/**
 * Stores the state around Log entities.
 */
const LogModel = {
    isFetchingLogs: false as boolean,
    isFetchingLog: false as boolean,
    list: [] as Log[],
    current: {} as Log,
    createLog: {} as LogCreate, // log being created
    async fetch(query?: string) {
        LogModel.isFetchingLogs = true;
        return request({
            method: 'GET',
            url: `${process.env.API_URL}logs${query ? `?${query}` : ''}`
        }).then((result: Log[]) => {
            LogModel.isFetchingLogs = false;
            LogModel.list = result;
        }).catch((error: HttpError) => {
            LogModel.isFetchingLogs = false;
            State.HttpErrorModel.add(error);
        });
    },
    async fetchOne(id: number) {
        LogModel.isFetchingLog = true;
        return request({
            method: 'GET',
            url: `${process.env.API_URL}logs/${id}`,
            withCredentials: false
        }).then((result: Log) => {
            LogModel.isFetchingLog = false;
            LogModel.current = result;
        }).catch((error: HttpError) => {
            LogModel.isFetchingLog = false;
            State.HttpErrorModel.add(error);
        });
    },
    async save() {
        LogModel.createLog.origin = 'human';
        return request({
            method: 'POST',
            url: `${process.env.API_URL}logs`,
            data: LogModel.createLog,
            withCredentials: false
        }).then(() => {
            SuccesModel.add('Successfully saved log.');
        }).catch((error: HttpError) => {
            State.HttpErrorModel.add(error);
        });
    }
};

type LogModel = typeof LogModel;
export default LogModel;
