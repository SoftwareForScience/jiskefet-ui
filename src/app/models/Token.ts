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
    createToken: {} as TokenCreate,
    async save() {
        return m.request<TokenCreate>({
            method: 'POST',
            url: `${process.env.API_URL}users/1/tokens/new`,
            data: TokenModel.createToken,
            withCredentials: false
        }).then(() => {
            SuccesModel.add('Successfully saved the token.');
        }).catch((error: HttpError) => {
            State.HttpErrorModel.add(error);
        });
    },
};

type TokenModel = typeof TokenModel;
export default TokenModel;
