/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 *
 * The tabs used by the Log details page.
 */

import * as m from 'mithril';
import { Tab } from '../interfaces/Tab';
import MarkdownViewer from '../components/MarkdownViewer';
import RunColumns from './RunColumns';
import Table from '../components/Table';
import { Log } from '../interfaces/Log';

/**
 * The tab information used by the TabHeader and TabContent of the Log detail page.
 */
const LogTabs: Tab[] = [
    {
        name: 'Content',
        id: 'content',
        active: true,
        content: (log: Log): JSX.Element | string => (
            log.text
            ? <MarkdownViewer key={'CreateLogMarkdown'} content={log.text} />
            : 'This log has no text'
        )
    },
    {
        name: 'Runs',
        id: 'runs',
        content: (log: Log): JSX.Element | string => (
            log.runs && log.runs.length > 0
            ? <Table data={log.runs} columns={RunColumns} />
            : 'This log has no runs'
        )
    },
    {
        name: 'Subsystems',
        id: 'subsystems',
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
        name: 'Files',
        id: 'files',
        content: (): string => (
            'Not yet implemented'
        )
    }
];

type LogTabs = typeof LogTabs;
export default LogTabs;
