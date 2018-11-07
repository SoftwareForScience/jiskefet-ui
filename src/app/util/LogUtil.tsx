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

const LogColumns = [
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

type LogColumns = typeof LogColumns;
export default LogColumns;
