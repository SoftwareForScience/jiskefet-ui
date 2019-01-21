/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import Spinner from '../components/Spinner';
import { format } from 'date-fns';
import HttpErrorAlert from '../components/HttpErrorAlert';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import LogTabs from '../constants/LogTabs';
import Tabs from '../components/Tab';
import Modal from '../components/Modal';
import LinkRunToLog from '../components/LinkRunToLog';
import SuccessMessage from '../components/SuccessMessage';
import { store } from '../redux/configureStore';
import { fetchAttachmentsByLog } from '../redux/ducks/attachment/operations';
import { fetchLog } from '../redux/ducks/log/operations';
import { selectCurrentLog, selectIsFetchingLog, selectIsPatchingLinkRunToLog } from '../redux/ducks/log/selectors';

interface Attrs {
    logId: number;
}

type Vnode = m.Vnode<Attrs, Log>;

export default class Log extends MithrilTsxComponent<Attrs> {

    constructor(vnode: Vnode) {
        super();
        // State.LogModel.fetchOne(vnode.attrs.logId);
        store.dispatch(fetchLog(vnode.attrs.logId));
        store.dispatch(fetchAttachmentsByLog(vnode.attrs.logId));
        // State.AttachmentModel.fetchForLog(vnode.attrs.logId);
    }

    view(vnode: Vnode) {
        const addExistingRunId = 'add-existing-run';
        const state = store.getState();
        const currentLog = selectCurrentLog(state);
        const isFetchingLog = selectIsFetchingLog(state);
        const isPatchingLinkRunToLog = selectIsPatchingLinkRunToLog(state);
        return (
            <div class="container-fluid">
                <Spinner isLoading={isFetchingLog || isPatchingLinkRunToLog}>
                    <SuccessMessage />
                    <HttpErrorAlert>
                        <SuccessMessage />
                        <div class="row">
                            <div class="col-md-12 mx-auto">
                                <div class="card shadow-sm bg-light">
                                    <div class="card-header">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <h3>Log</h3>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="row justify-content-end">
                                                    <button
                                                        type="button"
                                                        class="btn btn-primary btn-sm mr-1"
                                                        data-toggle="modal"
                                                        data-target={`#${addExistingRunId}`}
                                                    >
                                                        Link existing run
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <h5 class="card-title">{currentLog ? currentLog.title : ''}</h5>
                                            </div>
                                            <div class="col-md-6">
                                                <dl class="row">
                                                    <dt class="col-sm-6">Log id</dt>
                                                    <dd class="col-sm-6">{currentLog ? currentLog.logId : ''}</dd>

                                                    <dt class="col-sm-6">Subtype:</dt>
                                                    <dd class="col-sm-6">
                                                        {currentLog ?
                                                            currentLog.subtype === 'run'
                                                                ?
                                                                <span class="badge badge-warning">
                                                                    {currentLog.subtype}
                                                                </span>
                                                                :
                                                                currentLog.subtype
                                                            : ''
                                                        }
                                                    </dd>

                                                    <dt class="col-sm-6">Origin:</dt>
                                                    <dd class="col-sm-6">
                                                        {currentLog ? currentLog.origin === 'human'
                                                            ?
                                                            <span class="badge badge-success">
                                                                {currentLog.origin}
                                                            </span>
                                                            : currentLog.origin === 'process' ?
                                                                <span class="badge badge-primary">
                                                                    {currentLog.origin}
                                                                </span>
                                                                : currentLog.origin
                                                            : ''
                                                        }
                                                    </dd>

                                                    <dt class="col-sm-6">Creation time:</dt>
                                                    <dd class="col-sm-6">
                                                        {format(
                                                            currentLog ? currentLog.creationTime : '',
                                                            'HH:mm:ss DD/MM/YYYY'
                                                        )}
                                                    </dd>
                                                    <dt class="col-sm-6">Author:</dt>
                                                    <dd class="col-sm-6">
                                                        {currentLog
                                                            ? currentLog.user && currentLog.user.userId
                                                            : ''}
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                    <Tabs
                                        tabs={LogTabs}
                                        entity={currentLog || undefined}
                                    />
                                </div>
                            </div>
                        </div>
                    </HttpErrorAlert>
                </Spinner>
                <Modal id={addExistingRunId} title="Link existing log">
                    <LinkRunToLog logId={vnode.attrs.logId} />
                </Modal>
            </div >
        );
    }
}
