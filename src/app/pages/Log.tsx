/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import Spinner from '../atoms/Spinner';
import { format } from 'date-fns';
import HttpErrorAlert from '../atoms/HttpErrorAlert';
import State from '../models/State';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import LogTabs from '../constants/LogTabs';
import Tabs from '../molecules/Tab';
import Modal from '../atoms/Modal';
import LinkRunToLog from '../atoms/LinkRunToLog';
import SuccessMessage from '../atoms/SuccessMessage';
import Card from '../atoms/Card';

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
                                <Card
                                    className={'shadow-sm bg-light'}
                                    headerTitle={'Log'}
                                    headerContent={(
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
                                    )}
                                    footerContent={(
                                        <Tabs
                                            tabs={LogTabs}
                                            entity={State.LogModel.current}
                                        />
                                    )}
                                >
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
                                                        : State.LogModel.current.origin === 'process' ?
                                                            <span class="badge badge-primary">
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
                                                <dt class="col-sm-6">Author:</dt>
                                                <dd class="col-sm-6">
                                                    {State.LogModel.current.user &&
                                                        State.LogModel.current.user.userId}
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </Card>
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
