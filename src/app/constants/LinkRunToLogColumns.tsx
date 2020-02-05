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
 * The columns for the Log table in LinklogToRun.
 */
const LinkRunToLogColumns = (
    logId: number,
    linkAction: (runNumber: number, logId: number) => void
): any[] => [
        {
            header: 'Action',
            accessor: null,
            cell: (row: IRun): JSX.Element => (
                <button
                    type="button"
                    class="btn btn-primary btn-sm btn-block"
                    onclick={() => linkAction(row.runNumber, logId)}
                    data-dismiss="modal"
                >
                    Link Run
                </button>
            )
        },
        {
            header: 'Run id',
            accessor: 'runNumber'
        },
        {
            header: 'Time O\xB2 start',
            accessor: 'o2StartTime',
            cell: (row: IRun): string => (row.O2StartTime ? formatDateField(row.O2StartTime) : 'Unkown')
        },
        {
            header: 'Time O\xB2 end',
            accessor: 'o2EndTime',
            cell: (row: IRun): string =>
                (row.O2EndTime ? formatDateField(row.O2EndTime) : 'Run In Progress')
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
        }
    ];

type LinkRunToLogColumns = typeof LinkRunToLogColumns;
export default LinkRunToLogColumns;
