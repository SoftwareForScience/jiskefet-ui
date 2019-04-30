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
            cell: (row: Run): string => (row.O2StartTime ? format(row.O2StartTime, 'HH:mm:ss DD/MM/YYYY') : 'Unkown')
        },
        {
            header: 'Time O\xB2 end',
            accessor: 'o2EndTime',
            cell: (row: Run): string =>
                (row.O2EndTime ? format(row.O2EndTime, 'HH:mm:ss DD/MM/YYYY') : 'Run In Progress')
        },
        {
            header: 'Time trg start',
            accessor: 'trgStartTime',
            cell: (row: Run): string => (row.TrgStartTime ? format(row.TrgStartTime, 'HH:mm:ss DD/MM/YYYY') : 'Unkown')
        },
        {
            header: 'Time trg end',
            accessor: 'trgEndTime',
            cell: (row: Run): string =>
                (row.TrgEndTime ? format(row.TrgEndTime, 'HH:mm:ss DD/MM/YYYY') : 'Run In Progress')
        }
    ];

type LinkRunToLogColumns = typeof LinkRunToLogColumns;
export default LinkRunToLogColumns;
