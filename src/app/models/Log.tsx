/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { API_URL } from '../constants';
import SuccesModel from './Succes';
import HttpErrorModel from './HttpError';

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
    async fetch(query?: string) {
        return m.request({
            method: 'GET',
            url: `${API_URL}logs${query ? `?${query}` : ''}`,
            withCredentials: false
        }).then((result: any) => {
            LogModel.list = result;
        }).catch((e: any) => {
            HttpErrorModel.errorList.push(e);
        });
    },
    current: {} as Log,
    async fetchOne(id: number) {
        return m.request({
            method: 'GET',
            url: `${API_URL}logs/${id}`,
            withCredentials: false
        }).then((result: any) => {
            LogModel.current = result;
        }).catch((e: any) => {
            HttpErrorModel.errorList.push(e);
        });
    },
    createLog: {} as Log,
    async save() {
        LogModel.createLog.creationTime = new Date().toString();
        LogModel.createLog.origin = 'human';
        return m.request<Log>({
            method: 'POST',
            url: `${API_URL}logs`,
            data: LogModel.createLog,
            withCredentials: false
        }).then(() => {
            SuccesModel.list.push('Successfully saved log');
        }).catch((e: any) => {
            HttpErrorModel.errorList.push(e);
        });
    }
};

type LogModel = typeof LogModel;
export default LogModel;
