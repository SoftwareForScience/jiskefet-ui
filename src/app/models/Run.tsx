/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { API_URL } from '../constants';

export interface Run {
    runNumber: number;
    timeO2Start: Date | string;
    timeTrgStart: Date | string;
    timeTrgEnd: Date | string;
    timeO2End: Date | string;
    runType: string[];
    runQuality: string[];
    activityId: string;
    nDetectors: number;
    nFlps: number;
    nEpns: number;
    nTimeframes: number;
    nSubtimeframes: number;
    bytesReadOut: number;
    bytesTimeframeBuilder: number;
}

const RunModel = {
    list: [] as Run[],
    current: {} as Run,
    createRun: {} as Run,
    async fetch(query?: string) {
        return m.request({
            method: 'GET',
            url: `${API_URL}runs${query ? `?${query}` : ''}`,
            withCredentials: false
        }).then((result: any) => {
            this.list = result;
        });
    },
    save() {
        return m.request<Run>({
            method: 'POST',
            url: `${API_URL}runs`,
            data: RunModel.createRun,
            withCredentials: false
        });
    },
    fetchById(id: number) {
        return m.request<Run>({
            method: 'GET',
            url: `${API_URL}runs/${id}`,
            withCredentials: false
        }).then((result: any) => {
            this.current = result;
        });
    },
};

type RunModel = typeof RunModel;
export default RunModel;
