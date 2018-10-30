/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { format } from 'date-fns';
import { Run } from '../interfaces/Run';

const RunColumns = [
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

type RunColumns = typeof RunColumns;
export default RunColumns;
