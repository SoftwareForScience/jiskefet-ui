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
import QuillViewer from '../components/QuillViewer';
import Filter from '../components/Filter';
import Fetchable from '../interfaces/Fetchable';
import HttpError from '../components/HttpError';

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
    }
];

const inputFields = [
    {
        name: 'logId',
        type: 'number',
        label: 'Log id'
    },
    {
        name: 'searchterm',
        type: 'text',
        label: 'Title'
    }
];

export default class Logs implements m.Component, Fetchable<Log> {
    private isLoading: boolean;
    private previewContent: boolean;
    private columns: any[];

    constructor() {
        this.isLoading = true;
        this.previewContent = false;
        this.columns = columns;
    }

    fetch = (queryParam: string) => {
        LogModel.fetch(queryParam).then(() => {
            this.isLoading = false;
        });
    }

    oninit() {
        LogModel.fetch().then(() => this.isLoading = false);
    }

    togglePreview = () => {
        this.previewContent = !this.previewContent;
        if (this.previewContent) {
            this.columns = [
                ...columns,
                {
                    header: 'Preview of text',
                    accessor: 'text',
                    cell: row => (
                        <div class="d-block" style="max-width: 200px;">
                            <QuillViewer id={row.logId} content={row.text} plaintext={true} plaintextLimit={100} />
                        </div>
                    )
                }
            ];
        } else {
            this.columns = columns;
        }
        m.redraw();
    }

    view(vnode: any) {
        return (
            <div className="container-fluid">
                <Spinner isLoading={this.isLoading}>
                    <HttpError>
                        <div className="row">
                            <div className="col-md-12">
                                <button class="btn btn-light border mb-2 float-right" onclick={this.togglePreview}>
                                    {this.previewContent ? 'Hide content' : 'Preview content'}
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 mt-2">
                                <Filter
                                    inputFields={inputFields}
                                    fetch={this.fetch}
                                    route="logs"
                                />
                            </div>
                            <div className="col-md-9 mt-2">
                                <Table
                                    data={LogModel.list}
                                    columns={this.columns}
                                />
                            </div>
                        </div>
                    </HttpError>
                </Spinner>
            </div>
        );
    }
}
