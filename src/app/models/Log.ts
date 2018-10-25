/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { Log, LogCreate } from '../interfaces/Log';
import State from './State';

/**
 * Stores the state around Log entities.
 */
const LogModel = {
    isFetchingLogs: false as boolean,
    isFetchingLog: false as boolean,
    list: [] as any[],
    current: {} as Log,
    createLog: {} as LogCreate, // log being created
    async fetch(query?: string) {
        LogModel.isFetchingLogs = true;
        return m.request({
            method: 'GET',
            url: `${process.env.API_URL}logs${query ? `?${query}` : ''}`,
            withCredentials: false
        }).then((result: any) => {
            LogModel.isFetchingLogs = false;
            this.list = result;
        }).catch((e: any) => {
            LogModel.isFetchingLogs = false;
            State.HttpErrorModel.add(e);
        });
    },
    async fetchOne(id: number) {
        LogModel.isFetchingLog = true;
        return m.request({
            method: 'GET',
            url: `${process.env.API_URL}logs/${id}`,
            withCredentials: false
        }).then((result: any) => {
            LogModel.isFetchingLog = false;
            this.current = result;
        }).catch((e: any) => {
            LogModel.isFetchingLog = false;
            State.HttpErrorModel.add(e);
        });
    },
    async save() {
        LogModel.createLog.origin = 'human';
        return m.request<Log>({
            method: 'POST',
            url: `${process.env.API_URL}logs`,
            data: LogModel.createLog,
            withCredentials: false
        }).catch((e: any) => {
            State.HttpErrorModel.add(e);
        });
    }
};

type LogModel = typeof LogModel;
export default LogModel;
