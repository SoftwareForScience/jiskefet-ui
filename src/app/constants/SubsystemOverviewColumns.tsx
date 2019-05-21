/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { ISubsystemOverview } from '../interfaces/SubsystemOverview';
import * as m from 'mithril';

/**
 * The columns used by the Table that holds SubsystemOverview entities.
 */
const SubsystemOverviewColumns: any[] = [
    {
        header: 'Subsystem',
        accessor: 'subsystemName'
    },
    {
        header: '# of Log entries',
        accessor: 'logs'
    },
    {
        header: 'Last Log Entry',
        accessor: 'lastLog',
        cell: (row: ISubsystemOverview): JSX.Element => (
            <a href={`/logs/${row.logId}`} oncreate={m.route.link}>
                {row.lastLog}
            </a>
        )
    },
    {
        header: 'Author',
        accessor: 'userId'
    },
];

type SubsystemOverviewColumns = typeof SubsystemOverviewColumns;
export default SubsystemOverviewColumns;
