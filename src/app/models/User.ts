/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { HttpError } from '../interfaces/HttpError';
import State from './State';
import { request } from '../request';
import { User } from '../interfaces/User';

/**
 * Stores the state around Run entities and contains api calls to change that state.
 */
const UserModel = {
    isFetchingUser: false as boolean,
    current: {} as User,
    async fetchById(id: number) {
        UserModel.isFetchingUser = true;
        return request({
            method: 'GET',
            url: `${process.env.API_URL}users/${id}`,
            withCredentials: false
        }).then((result: User) => {
            UserModel.isFetchingUser = false;
            UserModel.current = result;
        }).catch((error: HttpError) => {
            UserModel.isFetchingUser = false;
            State.HttpErrorModel.add(error);
        });
    }
};

type UserModel = typeof UserModel;
export default UserModel;
