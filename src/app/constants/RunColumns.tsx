/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { IRun } from '../interfaces/Run';
import { formatDateField } from '../utility/DateUtil';

/**
 * The columns used by the Table that holds Run entities.
 */
const RunColumns = [
    {
        header: 'Run number',
        accessor: 'runNumber',
        cell: (row: IRun): JSX.Element => (
            <a href={`/runs/${row.runNumber}`} oncreate={m.route.link}>
                {row.runNumber}
            </a>
        )
    },
    {
        header: 'Time O\xB2 start',
        accessor: 'o2StartTime',
        cell: (row: IRun): string => (row.O2StartTime ? formatDateField(row.O2StartTime) : 'Unkown')
    },
    {
        header: `Time O\xB2 end`,
        accessor: 'o2EndTime',
        cell: (row: IRun): string => (row.O2EndTime ? formatDateField(row.O2EndTime) : 'Run In Progress')
    },
    {
        header: 'Time trg start',
        accessor: 'trgStartTime',
        cell: (row: IRun): string => (row.TrgStartTime ? formatDateField(row.TrgStartTime) : 'Unkown')
    },
    {
        header: 'Time trg end',
        accessor: 'trgEndTime',
        cell: (row: IRun): string =>
            (row.TrgEndTime ? formatDateField(row.TrgEndTime) : 'Run In Progress')
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
        header: 'Detectors',
        accessor: 'nDetectors'
    },
    {
        header: 'FLPs',
        accessor: 'nFlps'
    },
    {
        header: 'EPNs',
        accessor: 'nEpns'
    },
    {
        header: 'Timeframes',
        accessor: 'nTimeframes'
    },
    {
        header: 'Sub-timeframes',
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
