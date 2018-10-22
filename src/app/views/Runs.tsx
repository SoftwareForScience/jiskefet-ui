/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import RunModel, { Run } from '../models/Run';
import Spinner from '../components/Spinner';
import HtmlError from '../components/HtmlError';
import Table from '../components/Table';
import Filter from '../components/Filter';
import { format } from 'date-fns';
import Fetchable from '../interfaces/Fetchable';

const columns = [
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

const inputFields = [
    {
        name: 'runNumber',
        type: 'number'
    },
    {
        name: 'timeO2Start',
        type: 'datetime-local'
    },
    {
        name: 'timeO2End',
        type: 'datetime-local'
    },
    {
        name: 'timeTrgStart',
        type: 'datetime-local'
    },
    {
        name: 'timeTrgEnd',
        type: 'datetime-local'
    },
];

export default class Runs implements m.Component, Fetchable<Run> {
    private isLoading: boolean;

    constructor() {
        this.isLoading = true;
    }

    fetch = (queryParam?: string) => {
        RunModel.list.fetch(queryParam).then(() => {
            this.isLoading = false;
        });
    }

    oninit() {
        RunModel.list.fetch().then(() => {
            this.isLoading = false;
        });
    }

    view() {
        return (
            <div className="container-fluid">
                <Spinner isLoading={this.isLoading}>
                    <HtmlError errorMessage={RunModel.list.error}>
                        <div className="row">
                            <div className="col-md-3">
                                <Filter
                                    inputFields={inputFields}
                                    fetch={this.fetch}
                                    route="runs"
                                />
                            </div>
                            <div className="col-md-9">
                                <Table
                                    data={RunModel.list.runs}
                                    columns={columns}
                                    class="font-sm"
                                />
                            </div>
                        </div>
                    </HtmlError>
                </Spinner>
            </div>
        );
    }
}
