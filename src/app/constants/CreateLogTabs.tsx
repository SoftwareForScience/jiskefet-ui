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
import { ITab } from '../interfaces/Tab';
import MarkdownViewer from '../atoms/MarkdownViewer';
import { ILog } from '../interfaces/Log';
import MarkdownEditor from '../atoms/MarkdownEditor';

/**
 * The tab information used by the TabHeader and TabContent of the Log detail page.
 */
const CreateLogTabs: ITab[] = [
    {
        name: 'Edit',
        id: 'description',
        active: true,
        content: (addDescription: () => void): JSX.Element => (
            <MarkdownEditor postContent={addDescription} />
        )
    },
    {
        name: 'Preview',
        id: 'preview',
        content: (log: ILog): JSX.Element => (
            <MarkdownViewer id={'MarkdownPreview'} content={log.body} />
        )
    }
];

type CreateLogTabs = typeof CreateLogTabs;
export default CreateLogTabs;
