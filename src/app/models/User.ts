// /*
//  * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
//  *
//  * This software is distributed under the terms of the
//  * GNU General Public Licence version 3 (GPL) version 3,
//  * copied verbatim in the file "LICENSE"
//  */

// import { HttpError } from '../interfaces/HttpError';
// import State from './State';
// import { request } from '../request';
// import { User } from '../interfaces/User';
// import { Log } from '../interfaces/Log';
// import { UserProfile } from '../interfaces/UserProfile';

// /**
//  * Stores the state around Run entities and contains api calls to change that state.
//  */
// const UserModel = {
//     isFetchingUser: false as boolean,
//     isFetchingLogs: false as boolean,
//     current: {} as User,
//     currentUserInfo: {} as UserProfile,
//     logCount: 0 as number, // number of total rows of logs.
//     logs: [] as Log[],
//     async fetchById(userId: number) {
//         UserModel.isFetchingUser = true;
//         return request({
//             method: 'GET',
//             url: `${process.env.API_URL}users/${userId}`,
//         }).then((result: User) => {
//             UserModel.isFetchingUser = false;
//             UserModel.current = result;
//         }).catch((error: HttpError) => {
//             UserModel.isFetchingUser = false;
//             State.HttpErrorModel.add(error);
//         });
//     },
//     async fetchLogs(id: number, query?: string) {
//         UserModel.isFetchingLogs = true;
//         return request({
//             method: 'GET',
//             url: `${process.env.API_URL}users/${id}/logs${query ? `?${query}` : ''}`,
//         }).then((result: { data: Log[], count: number }) => {
//             UserModel.isFetchingLogs = false;
//             UserModel.logs = result.data;
//             UserModel.logCount = result.count;
//         }).catch((error: HttpError) => {
//             UserModel.isFetchingLogs = false;
//             State.HttpErrorModel.add(error);
//         });
//     },
// };

// type UserModel = typeof UserModel;
// export default UserModel;
