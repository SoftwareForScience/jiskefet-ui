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

/**
 * The columns for the Log table in LinklogToRun.
 */
const LinkRunToLogColumns = (
    logId: number,
    linkAction: (runNumber: number, logId: number) => void
): any[] => [
    {
        header: 'Action',
        accessor: null,
        cell: (row: Run): JSX.Element => (
            <button
                type="button"
                class="btn btn-primary btn-sm btn-block"
                onclick={() => linkAction(row.runNumber, logId)}
                data-dismiss="modal"
            >
                Link
            </button>
        )
    },
    {
        header: 'Run id',
        accessor: 'runNumber'
    },
    {
        header: 'Time O\xB2 start',
        accessor: 'timeO2Start',
        cell: (row: Run): string => (row.timeO2Start ? format(row.timeO2Start, 'HH:mm:ss DD/MM/YYYY') : 'Unkown')
    },
    {
        header: 'Time O\xB2 end',
        accessor: 'timeO2End',
        cell: (row: Run): string => (row.timeO2End ? format(row.timeO2End, 'HH:mm:ss DD/MM/YYYY') : 'Unkown')
    },
    {
        header: 'Time trg start',
        accessor: 'timeTrgStart',
        cell: (row: Run): string => (row.timeTrgStart ? format(row.timeTrgStart, 'HH:mm:ss DD/MM/YYYY') : 'Unkown')
    },
    {
        header: 'Time trg end',
        accessor: 'timeTrgEnd',
        cell: (row: Run): string => (row.timeTrgEnd ? format(row.timeTrgEnd, 'HH:mm:ss DD/MM/YYYY') : 'Unkown')
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
    }
];

type LinkRunToLogColumns = typeof LinkRunToLogColumns;
export default LinkRunToLogColumns;
