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

/**
 * Stores the state around Run entities.
 */
const RunModel = {
    isFetchingRuns: false as boolean,
    isFetchingRun: false as boolean,
    list: [] as Run[],
    current: {} as Run,
    async fetch(query?: string) {
        RunModel.isFetchingRuns = true;
        return m.request({
            method: 'GET',
            url: `${process.env.API_URL}runs${query ? `?${query}` : ''}`,
            withCredentials: false
        }).then((result: any) => {
            RunModel.isFetchingRuns = false;
            this.list = result;
        }).catch((e: HttpError) => {
            RunModel.isFetchingRuns = false;
            State.HttpErrorModel.add(e);
        });
    },
    async fetchById(id: number) {
        RunModel.isFetchingRun = true;
        return m.request<Run>({
            method: 'GET',
            url: `${process.env.API_URL}runs/${id}`,
            withCredentials: false
        }).then((result: any) => {
            RunModel.isFetchingRun = false;
            RunModel.current = result;
            }).catch((e: HttpError) => {
            RunModel.isFetchingRun = false;
            State.HttpErrorModel.add(e);
        });
    },
};

type RunModel = typeof RunModel;
export default RunModel;
