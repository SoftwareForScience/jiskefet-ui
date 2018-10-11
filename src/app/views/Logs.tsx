/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import LogModel, { Log } from '../models/Log';
import Spinner from '../components/Spinner';
import Table from '../components/Table';
import { format } from 'date-fns';
import Filter from '../components/Filter';
import Fetchable from '../interfaces/Fetchable';

const columns = [
    {
        header: 'Log id',
        accessor: 'logId'
    },
    {
        header: 'Title',
        accessor: 'title',
        cell: (row: Log) => (
            <a href={`/logs/${row.logId}`} oncreate={m.route.link}>
                {row.title}
            </a>
        )
    },
    {
        header: 'Sub-type',
        accessor: 'subtype',
        cell: (row: Log) => (
            row.subtype === 'run' ?
                (
                    <div class="text-center">
                        <span class="badge badge-warning">{row.subtype}</span>
                    </div>
                )
                : row.subtype
        )
    },
    {
        header: 'Origin',
        accessor: 'origin',
        cell: (row: Log) => (
            row.origin === 'human' ?
                (
                    <div class="text-center">
                        <span class="badge badge-success">{row.origin}</span>
                    </div>
                )
                : row.origin
        )
    }, {
        header: 'Creation time',
        accessor: 'creationTime',
        cell: (row: Log) => (row.creationTime ? format(row.creationTime, 'HH:mm:ss DD/MM/YYYY') : 'Unkown')
    },
    {
        header: 'Text',
        accessor: 'text',
        cell: row => (
            <div class="d-block text-truncate" style="max-width: 200px;">
                {row.text}
            </div>
        )
    },
];

const inputFields = [
    {
        name: 'title',
        type: 'text'
    },
];

export class Logs implements m.Component, Fetchable<Log> {
    private isLoading: boolean;

    constructor() {
        this.isLoading = true;
    }

    fetch = (queryParam: string) => {
        console.log('Fetching logs with searchParams ' + queryParam);
        // LogModel.fetchByQuery(queryParam);
        return [];
    }

    oninit() {
        LogModel.fetch().then(() => this.isLoading = false);
    }

    view() {
        return (
            <div className="container-fluid">
                <Spinner isLoading={this.isLoading}>
                    <div className="row">
                        <div className="col-md-3">
                            <Filter
                                inputFields={inputFields}
                                fetch={this.fetch}
                                route="logs"
                            />
                        </div>
                        <div className="col-md-9">
                            <Table
                                data={LogModel.list}
                                columns={columns}
                            />
                        </div>
                    </div>
                </Spinner>
            </div>
        );
    }
}
