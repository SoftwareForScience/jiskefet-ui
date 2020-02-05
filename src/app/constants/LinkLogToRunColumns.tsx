/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { ILog } from '../interfaces/Log';
import { formatDateField } from '../utility/DateUtil';

/**
 * The columns for the Log table in LinklogToRun.
 */
const LinkLogToRunColumns = (
    runNumber: number,
    linkAction: (logId: number, runNumber: number) => void
): any[] => [
        {
            header: 'Action',
            accessor: null,
            cell: (row: ILog): JSX.Element => (
                <button
                    type="button"
                    class="btn btn-primary btn-sm btn-block"
                    onclick={() => linkAction(row.logId, runNumber)}
                    data-dismiss="modal"
                >
                    Link
                </button>
            )
        },
        {
            header: 'Log id',
            accessor: 'logId'
        },
        {
            header: 'Title',
            accessor: 'title'
        },
        {
            header: 'Sub-type',
            accessor: 'subtype',
            cell: (row: ILog): JSX.Element | string => (
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
            cell: (row: ILog): JSX.Element | string => (
                row.origin === 'human' ?
                    (
                        <div class="text-center">
                            <span class="badge badge-success">{row.origin}</span>
                        </div>
                    )
                    : row.origin
            )
        },
        {
            header: 'Creation time',
            accessor: 'creationTime',
            cell: (row: ILog): string => (row.creationTime ? formatDateField(row.creationTime) : 'Unkown')
        }
    ];

type LinkLogToRunColumns = typeof LinkLogToRunColumns;
export default LinkLogToRunColumns;
