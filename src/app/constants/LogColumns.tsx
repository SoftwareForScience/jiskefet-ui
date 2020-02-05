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
        cell: (row: ILog): JSX.Element => (
            <a href={`/logs/${row.logId}`} oncreate={m.route.link}>
                {row.title}
            </a>
        )
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
                : (
                    <div class="text-center">
                        <span class="badge badge-primary">{row.subtype}</span>
                    </div>
                )
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
                : row.origin === 'process' ?
                    (
                        <div class="text-center">
                            <span class="badge badge-primary">{row.origin}</span>
                        </div>
                    ) : row.origin
        )
    },
    {
        header: 'Creation time',
        accessor: 'creationTime',
        cell: (row: ILog): string => (row.creationTime ? formatDateField(row.creationTime) : 'Unkown')
    },
    {
        header: 'Author',
        accessor: 'user',
        cell: (row: ILog): string => (row.user ? row.user.name : 'Unknown')
    }
];

type LogColumns = typeof LogColumns;
export default LogColumns;
