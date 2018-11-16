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
import { Tabs } from '../interfaces/Tabs';
import MarkdownViewer from '../components/MarkdownViewer';
import RunColumns from './RunColumns';
import Table from '../components/Table';
import { Log } from '../interfaces/Log';
import State from '../models/State';
import Modal from '../components/Modal';
import { Attachment } from '../interfaces/Attachment';
import AttachmentComponent from '../components/Attachment';

const ATTACHMENT_MODAL_ID = 'attachment-modal-id';

/**
 * The tab information used by the TabHeader and TabContent of the Log detail page.
 */
const LogTabs: Tabs[] = [
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
                ? (
                    <Table
                        data={log.runs}
                        columns={RunColumns}
                        className="font-sm"
                    />
                )
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
        content: (log: Log): JSX.Element | string => (
            (
                <div>
                    <ul>
                        {State.AttachmentModel.list.map((attachment: Attachment) =>
                            <li key={attachment.fileId}>
                                <a
                                    id={attachment.fileId}
                                    download={attachment.title}
                                    href={State.AttachmentModel.download(attachment)}
                                >
                                    {attachment.title}
                                </a>
                            </li>
                        )}
                    </ul>
                    <hr />
                    <button
                        type="button"
                        class="btn btn-primary btn-lg"
                        style="margin-bottom:1rem;"
                        data-toggle="modal"
                        data-target={`#${ATTACHMENT_MODAL_ID}`}
                    >Add new file
                    </button>
                    <Modal id={ATTACHMENT_MODAL_ID} title="Add attachment">
                        <div>
                            <form id="addAttachment">
                                <AttachmentComponent
                                    attachTo="Log"
                                    isExistingItem={true}
                                />
                            </form>
                        </div>
                    </Modal>
                </div>
            )
        )
    }
];

type LogTabs = typeof LogTabs;
export default LogTabs;
