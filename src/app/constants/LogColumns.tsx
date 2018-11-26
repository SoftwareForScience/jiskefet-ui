/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { Log } from '../interfaces/Log';
import { format } from 'date-fns';

/**
 * The columns used by the Table that holds Log entities.
 */
const LogColumns: any[] = [
    {
        header: 'Log id',
        accessor: 'logId'
    },
    {
        header: 'Title',
        accessor: 'title',
        cell: (row: Log): JSX.Element => (
            <a href={`/logs/${row.logId}`} oncreate={m.route.link}>
                {row.title}
            </a>
        )
    },
    {
        header: 'Sub-type',
        accessor: 'subtype',
        cell: (row: Log): JSX.Element | string => (
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
        cell: (row: Log): JSX.Element | string => (
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
        cell: (row: Log): string => (row.creationTime ? format(row.creationTime, 'HH:mm:ss DD/MM/YYYY') : 'Unkown')
    },
    {
        header: 'Author',
        accessor: 'user',
        secondAccessor: 'externalUserId'
    }
];

type LogColumns = typeof LogColumns;
export default LogColumns;
