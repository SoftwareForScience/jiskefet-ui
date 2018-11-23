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
import { SubsystemPermissionCreate, SubsystemPermission } from '../interfaces/SubsystemPermission';

/**
 * Stores the state around Token entities.
 * Still need a place to save it.
 */
const SubsystemPermissionModel = {
    createToken: {} as SubsystemPermissionCreate,
    list: [{}] as SubsystemPermission[],
    async save(id: number) {
        return m.request({
            method: 'POST',
            url: `${process.env.API_URL}users/${id}/tokens/new`,
            data: SubsystemPermissionModel.createToken,
            withCredentials: false
        }).then(() => {
            SuccesModel.add('Successfully saved the token.');
        }).catch((error: HttpError) => {
            State.HttpErrorModel.add(error);
        });
    },
    async fetch(id: number) {
        return m.request<SubsystemPermission[]>({
            method: 'GET',
            url: `${process.env.API_URL}users/${id}/tokens`,
            withCredentials: false
        }).then((result: SubsystemPermission[]) => {
            SubsystemPermissionModel.list = result;
        }).catch((error: HttpError) => {
            State.HttpErrorModel.add(error);
        });
    },
};

type SubsystemPermissionModel = typeof SubsystemPermissionModel;
export default SubsystemPermissionModel;
