/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import State from './State';
import SuccesModel from './Success';
import { HttpError } from '../interfaces/HttpError';
import { TokenCreate } from '../interfaces/Token';

/**
 * Stores the state around Token entities.
 * Still need a place to save it.
 */
const TokenModel = {
    // list: [] as SubSystem[],
    // isFetchingRuns: false as boolean,
    createToken: {} as TokenCreate,
    async save() {
        return m.request<TokenCreate>({
            method: 'POST',
            url: `${process.env.API_URL}tokens`,
            data: TokenModel.createToken,
            withCredentials: false
        }).then(() => {
            SuccesModel.add('Successfully saved the token.');
        }).catch((error: HttpError) => {
            State.HttpErrorModel.add(error);
        });
    },
    // async fetchSubSystem(query?: string) {
    //     TokenModel.isFetchingRuns = true;
    //     return m.request({
    //         method: 'GET',
    //         url: `${process.env.API_URL}tokens${query ? `?${query}` : ''}`,
    //         withCredentials: false
    //     }).then((result: { subSystem: SubSystem[] }) => {
    //         TokenModel.isFetchingRuns = false;
    //         TokenModel.list = result.subSystem;
    //     }).catch((error: HttpError) => {
    //         TokenModel.isFetchingRuns = false;
    //         State.HttpErrorModel.add(error);
    //     });
    // },
};

type TokenModel = typeof TokenModel;
export default TokenModel;
