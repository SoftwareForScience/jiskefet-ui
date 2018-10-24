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
            SuccesModel.list.push('Succesfully fetched logs');
        }).catch(() => {
            const result = dummyLogList;
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
            SuccesModel.list.push('Succesfully fetched log');
        }).catch(() => {
            const result = dummyLogList[0];
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
        }).then(() => {
            SuccesModel.list.push('Succesfully saved log');
        });
    }
};

type LogModel = typeof LogModel;
export default LogModel;

const dummyLogList = [
    {
        logId: 1,
        subtype: 'run',
        userId: 10,
        origin: 'human',
        creationTime: '2018-10-10 14:33:23',
        title: 'Magic happened',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        runs: [
            {
                run_number: 1
            },
            {
                run_number: 2
            }
        ]
    },
    {
        logId: 1,
        subtype: 'run',
        userId: 10,
        origin: 'human',
        creationTime: '2018-10-10 14:33:10',
        title: 'Magic happened',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        runs: [
            {
                run_number: 1
            },
            {
                run_number: 2
            }
        ]
    },
    {
        logId: 1,
        subtype: 'run',
        userId: 10,
        origin: 'human',
        creationTime: '2018-10-10 14:33:21',
        title: 'Magic happened',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        runs: [
            {
                run_number: 1
            },
            {
                run_number: 2
            }
        ]
    },
];
