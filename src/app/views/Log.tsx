/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import Spinner from '../components/Spinner';
import QuillViewer from '../components/QuillViewer';
import { format } from 'date-fns';
import HttpErrorAlert from '../components/HttpErrorAlert';
import State from '../models/State';
import Table from '../components/Table';
import { Run } from '../interfaces/Run';

const runColumns = [
    {
        header: 'Run id',
        accessor: 'runNumber',
        cell: row => (
            <a href={`/runs/${row.runNumber}`} oncreate={m.route.link}>
                {row.runNumber}
            </a>
        )
    },
    {
        header: 'Time 02 start',
        accessor: 'timeO2Start',
        cell: (row: Run) => (row.timeO2Start ? format(row.timeO2Start, 'HH:mm:ss DD/MM/YYYY') : 'Unkown')
    },
    {
        header: 'Time 02 end',
        accessor: 'timeO2End',
        cell: (row: Run) => (row.timeO2End ? format(row.timeO2End, 'HH:mm:ss DD/MM/YYYY') : 'Unkown')
    },
    {
        header: 'Time trg start',
        accessor: 'timeTrgStart',
        cell: (row: Run) => (row.timeTrgStart ? format(row.timeTrgStart, 'HH:mm:ss DD/MM/YYYY') : 'Unkown')
    },
    {
        header: 'Time trg end',
        accessor: 'timeTrgEnd',
        cell: (row: Run) => (row.timeTrgEnd ? format(row.timeTrgEnd, 'HH:mm:ss DD/MM/YYYY') : 'Unkown')
    },
    {
        header: 'Activity id',
        accessor: 'activityId'
    },
    {
        header: 'Run type',
        accessor: 'runType'
    },
    {
        header: 'Run quality',
        accessor: 'runQuality'
    },
    {
        header: 'no. of detectors',
        accessor: 'nDetectors'
    },
    {
        header: 'no. of FLPs',
        accessor: 'nFlps'
    },
    {
        header: 'no. of EPNs',
        accessor: 'nEpns'
    },
    {
        header: 'no. of timeframes',
        accessor: 'nTimeframes'
    },
    {
        header: 'no. of sub-timeframes',
        accessor: 'nSubtimeframes'
    },
    {
        header: 'B read out',
        accessor: 'bytesReadOut'
    },
    {
        header: 'B timeframe builder',
        accessor: 'bytesTimeframeBuilder'
    },
];

export default class Log implements m.Component {
    private id: number;
    private isLoading: boolean;

    constructor(vnode: any) {
        this.id = vnode.attrs.id;
        this.isLoading = true;
        State.LogModel.fetchOne(this.id).then(() => this.isLoading = false);
    }

    view() {
        return (
            <div className="container">
                <Spinner isLoading={this.isLoading}>
                    <HttpErrorAlert>
                        <div class="row">
                            <div class="col-md-12 mx-auto">
                                <div class="card shadow-sm bg-light">
                                    <div class="card-header">
                                        Log
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <h5 class="card-title">{State.LogModel.current.title}</h5>
                                            </div>
                                            <div class="col-md-6">
                                                <dl class="row">
                                                    <dt class="col-sm-6">Log id</dt>
                                                    <dd class="col-sm-6">{State.LogModel.current.logId}</dd>

                                                    <dt class="col-sm-6">Subtype:</dt>
                                                    <dd class="col-sm-6">
                                                        {State.LogModel.current.subtype === 'run' ?
                                                            <span class="badge badge-warning">{State.LogModel.current.subtype}</span>
                                                            : State.LogModel.current.subtype}
                                                    </dd>

                                                    <dt class="col-sm-6">Origin:</dt>
                                                    <dd class="col-sm-6">
                                                        {State.LogModel.current.origin === 'human' ?
                                                            <span class="badge badge-success">{State.LogModel.current.origin}</span>
                                                            : State.LogModel.current.origin}
                                                    </dd>

                                                    <dt class="col-sm-6">Creation time:</dt>
                                                    <dd class="col-sm-6">{format(State.LogModel.current.creationTime, 'HH:mm:ss DD/MM/YYYY')}</dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                    <a class="btn btn-link" data-toggle="collapse" href="#collapseFooter" role="button" aria-expanded="false" aria-controls="collapseFooter">&darr;</a>
                                    <div class="collapse" id="collapseFooter">
                                        <div class="card-footer log-footer">
                                            <QuillViewer id={State.LogModel.current.logId} content={State.LogModel.current.text} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-md-12 mx-auto">
                                <ul class="nav nav-pills flex-column flex-sm-row" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" href="#runs" role="tab" data-toggle="tab">Runs</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#subsystems" role="tab" data-toggle="tab">Subsystems</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#users" role="tab" data-toggle="tab">Users</a>
                                    </li>
                                </ul>
                                <br />
                                <div class="tab-content">
                                    <div role="tabpanel" class="tab-pane active" id="runs" aria-labelledby="runs-tab">
                                        <Table
                                            data={State.LogModel.current.runs}
                                            columns={runColumns}
                                        />
                                    </div>
                                    <div role="tabpanel" class="tab-pane" id="subsystems" aria-labelledby="subsystems-tab">
                                        Not yet implemented
                                    </div>
                                    <div role="tabpanel" class="tab-pane" id="users" aria-labelledby="users-tab">
                                        Not yet implemented
                                    </div>
                                </div>
                            </div>
                        </div>
                    </HttpErrorAlert>
                </Spinner>
            </div>
        );
    }
}
