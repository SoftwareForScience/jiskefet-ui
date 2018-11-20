/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import State from './State';
import { HttpError } from '../interfaces/HttpError';
import { SubSystem } from '../interfaces/SubSystem';

const SubSystemModel = {
    isFetchingRuns: false as boolean,
    list: [] as SubSystem[],
    async fetch(query?: string) {
        SubSystemModel.isFetchingRuns = true;
        return m.request({
            method: 'GET',
            url: `${process.env.API_URL}tokens${query ? `?${query}` : ''}`,
            withCredentials: false
        }).then((result: { subSystem: SubSystem[] }) => {
            SubSystemModel.isFetchingRuns = false;
            SubSystemModel.list = result.subSystem;
        }).catch((error: HttpError) => {
            SubSystemModel.isFetchingRuns = false;
            State.HttpErrorModel.add(error);
        });
    },
};

type SubSystemModel = typeof SubSystemModel;
export default SubSystemModel;
