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
import { Log } from '../interfaces/Log';
import { GithubProfileDto } from '../interfaces/GitHubProfile';

/**
 * Stores the state around Run entities and contains api calls to change that state.
 */
const UserModel = {
    isFetchingUser: false as boolean,
    isFetchingLogs: false as boolean,
    current: {} as User,
    currentGitHubInfo: {} as GithubProfileDto,
    count: 0 as number, // number of total rows available.
    logs: [] as Log[],
    async fetchById(id: number) {
        UserModel.isFetchingUser = true;
        return request({
            method: 'GET',
            url: `${process.env.API_URL}users/${id}`,
        }).then((result: User) => {
            UserModel.isFetchingUser = false;
            UserModel.current = result;
        }).catch((error: HttpError) => {
            UserModel.isFetchingUser = false;
            State.HttpErrorModel.add(error);
        });
    },
    async fetchLogs(id: number, query?: string) {
        UserModel.isFetchingLogs = true;
        console.log('fetching..');
        console.log(`${process.env.API_URL}users/${id}/logs${query ? `?${query}` : ''}`);
        return request({
            method: 'GET',
            url: `${process.env.API_URL}users/${id}/logs${query ? `?${query}` : ''}`,
        }).then((result: { logs: Log[], count: number }) => {
            console.log(`fetching logs from id: ${id}`);
            UserModel.isFetchingLogs = false;
            console.log('------------ retrieved results are -------------');
            console.log(result);
            UserModel.logs = result.logs;
            UserModel.count = result.count;
            console.log(UserModel.logs);
        }).catch((error: HttpError) => {
            UserModel.isFetchingLogs = false;
            State.HttpErrorModel.add(error);
        });
    },
};

type UserModel = typeof UserModel;
export default UserModel;
