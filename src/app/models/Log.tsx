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
    list: [] as any[],
    current: {} as Log,
    createLog: {} as Log, // log being created
    async fetch(query?: string) {
        return m.request({
            method: 'GET',
            url: `${API_URL}logs${query ? `?${query}` : ''}`,
            withCredentials: false
        }).then((result: any) => {
            this.list = result;
        });
    },
    async fetchOne(id: number) {
        return m.request({
            method: 'GET',
            url: `${API_URL}logs/${id}`,
            withCredentials: false
        }).then((result: any) => {
            this.current = result;
        });
    },
    save() {
        LogModel.createLog.creationTime = new Date().toString();
        LogModel.createLog.origin = 'human';
        return m.request<Log>({
            method: 'POST',
            url: `${API_URL}logs`,
            data: LogModel.createLog,
            withCredentials: false
        });
    }
};

type LogModel = typeof LogModel;
export default LogModel;
