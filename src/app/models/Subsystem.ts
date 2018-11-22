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
import { SubSystem } from '../interfaces/SubSytem';

/**
 * Stores the state around Token entities.
 * Still need a place to save it.
 */
const SubsystemModel = {
    list: [] as SubSystem[],
    current: {} as SubSystem,
    async fetch() {
        return m.request({
            method: 'GET',
            url: `${process.env.API_URL}subsystems`,
            withCredentials: false
        }).then((result: SubSystem[]) => {
            SubsystemModel.list = result;
        }).catch((error: HttpError) => {
            State.HttpErrorModel.add(error);
        });
    },
    async fetchById(id: string | number) {
        return m.request({
            method: 'GET',
            url: `${process.env.API_URL}subsystems/${id}`,
            withCredentials: false
        }).then((result: SubSystem) => {
            SubsystemModel.current = result;
        }).catch((error: HttpError) => {
            State.HttpErrorModel.add(error);
        });
    },
};

type SubsystemModel = typeof SubsystemModel;
export default SubsystemModel;
