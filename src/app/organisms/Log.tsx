/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import Spinner from '../atoms/Spinner';
import HttpErrorAlert from '../atoms/HttpErrorAlert';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import Modal from '../atoms/Modal';
import LinkRunToLog from '../atoms/LinkRunToLog';
import SuccessMessage from '../atoms/SuccessMessage';
import { store } from '../redux/configureStore';
import { fetchAttachmentsByLog } from '../redux/ducks/attachment/operations';
import { fetchLog } from '../redux/ducks/log/operations';
import { selectCurrentLog, selectIsFetchingLog, selectIsPatchingLinkRunToLog } from '../redux/ducks/log/selectors';
import Card from '../atoms/Card';
import DescriptionList from '../atoms/DescriptionList';
import LogDescription from '../constants/LogDescription';
import TabContainer from '../molecules/TabContainer';
import MarkdownViewer from '../atoms/MarkdownViewer';
import Table from '../molecules/Table';
import RunColumns from '../constants/RunColumns';
import { selectAttachments } from '../redux/ducks/attachment/selectors';
import { Attachment } from '../interfaces/Attachment';
import { download } from '../utility/FileUtil';
import AttachmentComponent from '../molecules/Attachment';

interface Attrs {
    logId: number;
}

type Vnode = m.Vnode<Attrs, Log>;

export default class Log extends MithrilTsxComponent<Attrs> {

    constructor(vnode: Vnode) {
        super();
        store.dispatch(fetchLog(vnode.attrs.logId));
        store.dispatch(fetchAttachmentsByLog(vnode.attrs.logId));
    }

    view(vnode: Vnode) {
        const addExistingRunId = 'add-existing-run';
        const state = store.getState();
        const currentLog = selectCurrentLog(state);
        const isFetchingLog = selectIsFetchingLog(state);
        const isPatchingLinkRunToLog = selectIsPatchingLinkRunToLog(state);
        const attachments = selectAttachments(store.getState());
        const ATTACHMENT_MODAL_ID = 'attachment-modal-id';

        return (
            <div class="container-fluid">
                <Spinner isLoading={isFetchingLog || isPatchingLinkRunToLog}>
                    <SuccessMessage />
                    <HttpErrorAlert>
                        <SuccessMessage />
                        <div class="row">
                            <div class="col-md-12 mx-auto">
                                <Card
                                    className={'shadow-sm bg-light'}
                                    headerTitle={'Log'}
                                    headerContent={
                                        <Modal
                                            id={addExistingRunId}
                                            title="Link to run"
                                            buttonClass="btn btn-primary"
                                        >
                                            <LinkRunToLog logId={vnode.attrs.logId} />
                                        </Modal>}
                                    footerContent={(
                                        <TabContainer titles={['Content', 'Runs', 'Files', 'Others...']} >
                                            {
                                                currentLog && currentLog.body
                                                    ? <MarkdownViewer
                                                        id={'CreateLogMarkdown'}
                                                        content={currentLog.body}
                                                    />
                                                    : 'This log has no text'
                                            }
                                            {
                                                currentLog && currentLog.runs && currentLog.runs.length > 0
                                                    ? (
                                                        <Table
                                                            data={currentLog.runs}
                                                            columns={RunColumns}
                                                            className="font-sm"
                                                        />
                                                    )
                                                    : 'This log has no runs'
                                            }
                                            {
                                                <div>
                                                    <ul>
                                                        {attachments && attachments.map((attachment: Attachment) =>
                                                            <li key={attachment.fileId}>
                                                                <a
                                                                    id={attachment.fileId}
                                                                    download={attachment.title}
                                                                    href={download(attachment)}
                                                                >
                                                                    {attachment.title}
                                                                </a>
                                                            </li>
                                                        )}
                                                    </ul>
                                                    <hr />
                                                    <Modal
                                                        id={ATTACHMENT_MODAL_ID}
                                                        title="Add attachment"
                                                        buttonClass="btn btn-primary btn-lg"
                                                    >
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
                                            }
                                            {
                                                'Not yet implemented'
                                            }
                                        </TabContainer>
                                    )}
                                >
                                    <DescriptionList
                                        title={currentLog && currentLog.title}
                                        descriptions={LogDescription}
                                        entity={currentLog}
                                    />
                                </Card>
                            </div>
                        </div>
                    </HttpErrorAlert>
                </Spinner>
            </div >
        );
    }
}
