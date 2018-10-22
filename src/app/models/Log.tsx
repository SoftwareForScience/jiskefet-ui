/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { API_URL } from '../constants';

export interface Log {
    logId?: number;
    subtype: string;
    userId?: number;
    origin: string;
    creationTime: string;
    title: string;
    text: string;
    runs?: any[];
}

const LogModel = {
    list: {
        error: '',
        logs: [] as any[],
        async fetch(query?: string) {
            return m.request({
                method: 'GET',
                url: `${API_URL}logs${query ? `?${query}` : ''}`,
                withCredentials: false
            }).then((result: any) => {
                LogModel.list.logs = result;
            }).catch((e: any) => {
                LogModel.list.error = e.message;
            });
        }
    },
    current: {
        error: '',
        log: {} as Log,
        async fetchOne(id: number) {
            return m.request({
                method: 'GET',
                url: `${API_URL}logs/${id}`,
                withCredentials: false
            }).then((result: any) => {
                LogModel.current.log = result;
            }).catch((e: any) => {
                LogModel.current.error = e.message;
            });
        }
    },
    createLog: {
        error: '',
        log: {} as Log,
        async save() {
            LogModel.createLog.log.creationTime = new Date().toString();
            LogModel.createLog.log.origin = 'human';
            return m.request<Log>({
                method: 'POST',
                url: `${API_URL}logs`,
                data: LogModel.createLog.log,
                withCredentials: false
            }).catch((e: any) => {
                LogModel.createLog.error = e.message;
            });
        }
    }
};

type LogModel = typeof LogModel;
export default LogModel;
