/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { HttpError } from '../interfaces/HttpError';
import { Run } from '../interfaces/Run';
import State from './State';
import SuccessModel from './Success';

/**
 * Stores the state around Run entities and contains api calls to change that state.
 */
const RunModel = {
    isFetchingRuns: false as boolean,
    isFetchingRun: false as boolean,
    isPatchingLinkLogToRun: false as boolean,
    list: [] as Run[],
    current: {} as Run,
    async fetch(query?: string) {
        RunModel.isFetchingRuns = true;
        return m.request({
            method: 'GET',
            url: `${process.env.API_URL}runs${query ? `?${query}` : ''}`,
            withCredentials: false
        }).then((result: Run[]) => {
            RunModel.isFetchingRuns = false;
            RunModel.list = result;
        }).catch((error: HttpError) => {
            RunModel.isFetchingRuns = false;
            State.HttpErrorModel.add(error);
        });
    },
    async fetchById(id: string | number) {
        RunModel.isFetchingRun = true;
        return m.request<Run>({
            method: 'GET',
            url: `${process.env.API_URL}runs/${id}`,
            withCredentials: false
        }).then((result: Run) => {
            RunModel.isFetchingRun = false;
            RunModel.current = result;
            }).catch((error: HttpError) => {
            RunModel.isFetchingRun = false;
            State.HttpErrorModel.add(error);
        });
    },
    async linkLogToRun(logId: number, runNumber: number) {
        RunModel.isPatchingLinkLogToRun = true;
        return m.request<Run>({
            method: 'PATCH',
            url: `${process.env.API_URL}runs/${runNumber}/logs`,
            data: { logId: logId as number },
            withCredentials: false
        }).then(() => {
            RunModel.isPatchingLinkLogToRun = false;
            SuccessModel.add(`Successfully linked log ${logId} to run ${runNumber}.`);
        }).catch((error: HttpError) => {
            RunModel.isPatchingLinkLogToRun = false;
            State.HttpErrorModel.add(error);
        });
    }
};

type RunModel = typeof RunModel;
export default RunModel;
