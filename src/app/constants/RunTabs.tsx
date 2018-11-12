/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 *
 * The tabs used by the Run details page.
 */

import * as m from 'mithril';
import { Tab } from '../interfaces/Tab';
import { Run } from '../interfaces/Run';
import Table from '../components/Table';
import LogColumns from './LogColumns';

/**
 * The tab information used by the TabHeader and TabContent of the Run detail page.
 */
const RunTabs: Tab[] = [
    {
        name: 'Logs',
        id: 'logs',
        active: true,
        content: (run: Run): JSX.Element | string => (
            run.logs && run.logs.length > 0
            ? <Table data={run.logs} columns={LogColumns} />
            : 'This run has no logs'
        )
    },
    {
        name: 'Detectors',
        id: 'detectors',
        content: (): string => (
            'Not yet implemented'
        )
    },
    {
        name: 'Users',
        id: 'users',
        content: (): string => (
            'Not yet implemented'
        )
    },
    {
        name: 'Others...',
        id: 'others',
        content: (): string => (
            'Not yet implemented'
        )
    }
];

type RunTabs = typeof RunTabs;
export default RunTabs;
