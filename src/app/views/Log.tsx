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
import State from '../models/State';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import LogTabs from '../constants/LogTabs';
import Tabs from '../components/Tab';
import Modal from '../components/Modal';
import LinkRunToLog from '../components/LinkRunToLog';
import SuccessMessage from '../components/SuccessMessage';

interface Attrs {
    logId: number;
}

type Vnode = m.Vnode<Attrs, Log>;

export default class Log extends MithrilTsxComponent<Attrs> {

    constructor(vnode: Vnode) {
        super();
        State.LogModel.fetchOne(vnode.attrs.logId);
        State.AttachmentModel.fetchForLog(vnode.attrs.logId);
    }

    view(vnode: Vnode) {
        const addExistingRunId = 'add-existing-run';
        return (
            <div class="container-fluid">
                <Spinner isLoading={State.LogModel.isFetchingLog || State.LogModel.isPatchingLinkRunToLog}>
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
                                                <h5 class="card-title">{State.LogModel.current.title}</h5>
                                            </div>
                                            <div class="col-md-6">
                                                <dl class="row">
                                                    <dt class="col-sm-6">Log id</dt>
                                                    <dd class="col-sm-6">{State.LogModel.current.logId}</dd>

                                                    <dt class="col-sm-6">Subtype:</dt>
                                                    <dd class="col-sm-6">
                                                        {State.LogModel.current.subtype === 'run' ?
                                                            <span class="badge badge-warning">
                                                                {State.LogModel.current.subtype}
                                                            </span>
                                                            : State.LogModel.current.subtype}
                                                    </dd>

                                                    <dt class="col-sm-6">Origin:</dt>
                                                    <dd class="col-sm-6">
                                                        {State.LogModel.current.origin === 'human' ?
                                                            <span class="badge badge-success">
                                                                {State.LogModel.current.origin}
                                                            </span>
                                                            : State.LogModel.current.origin}
                                                    </dd>

                                                    <dt class="col-sm-6">Creation time:</dt>
                                                    <dd class="col-sm-6">
                                                        {format(
                                                            State.LogModel.current.creationTime,
                                                            'HH:mm:ss DD/MM/YYYY'
                                                        )}
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                    <Tabs
                                        tabs={LogTabs}
                                        entity={State.LogModel.current}
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
