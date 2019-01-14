// /*
//  * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
//  *
//  * This software is distributed under the terms of the
//  * GNU General Public Licence version 3 (GPL) version 3,
//  * copied verbatim in the file "LICENSE"
//  */

// import { SubsystemOverview } from '../interfaces/SubsystemOverview';
// import State from './State';
// import { HttpError } from '../interfaces/HttpError';
// import { request } from '../request';

// /**
//  * Stores the state around SubsystemOverview entities and contains api calls to change that state.
//  */
// const SubsystemOverviewModel = {
//     isFetchingSubsystemOverviews: false as boolean,
//     list: [] as SubsystemOverview[],
//     async fetch(query?: string) {
//         this.isFetchingSubsystemOverviews = true;
//         return request({
//             method: 'GET',
//             url: `${process.env.API_URL}overview${query ? `?${query}` : ''}`,
//             withCredentials: false
//         }).then((result: SubsystemOverview[]) => {
//             this.isFetchingSubsystemOverviews = false;
//             this.list = result;
//         }).catch((e: HttpError) => {
//             this.isFetchingSubsystemOverviews = false;
//             State.HttpErrorModel.add(e);
//         });
//     },
// };

// type SubsystemOverviewModel = typeof SubsystemOverviewModel;
// export default SubsystemOverviewModel;
