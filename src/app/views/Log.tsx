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
import Table from '../components/Table';
import RunColumns from '../constants/RunColumns';
import MarkdownViewer from '../components/MarkdownViewer';
import { MithrilTsxComponent } from 'mithril-tsx-component';

interface Attrs {
    id: number;
}

type Vnode = m.Vnode<Attrs, Log>;

export default class Log extends MithrilTsxComponent<Attrs> {

    constructor(vnode: Vnode) {
        super();
        State.LogModel.fetchOne(vnode.attrs.id);
    }

    view() {
        return (
            <div>
                <Spinner isLoading={State.LogModel.isFetchingLog}>
                    <HttpErrorAlert>
                        <div class="row">
                            <div class="col-md-12 mx-auto">
                                <div class="card shadow-sm bg-light">
                                    <div class="card-header">
                                    <h3>Log</h3>
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
                                                            <span class="badge badge-warning">{State.LogModel.current.subtype}</span>
                                                            : State.LogModel.current.subtype}
                                                    </dd>

                                                    <dt class="col-sm-6">Origin:</dt>
                                                    <dd class="col-sm-6">
                                                        {State.LogModel.current.origin === 'human' ?
                                                            <span class="badge badge-success">{State.LogModel.current.origin}</span>
                                                            : State.LogModel.current.origin}
                                                    </dd>

                                                    <dt class="col-sm-6">Creation time:</dt>
                                                    <dd class="col-sm-6">{format(State.LogModel.current.creationTime, 'HH:mm:ss DD/MM/YYYY')}</dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                    <a class="btn btn-link" data-toggle="collapse" href="#collapseFooter" role="button" aria-expanded="false" aria-controls="collapseFooter">&darr; Open text</a>
                                    <div class="collapse" id="collapseFooter">
                                        <div class="card-footer jf-log-footer">
                                            <MarkdownViewer content={State.LogModel.current.text} />
                                        </div>
                                    </div>
                                    <div class="card-header">
                                        <div class="col-md-12 mx-auto">
                                            <ul class="nav nav-tabs card-header-tabs pull-xs-left flex-column flex-sm-row" role="tablist">
                                                <li class="nav-item">
                                                    <a class="nav-link active" href="#runs" role="tab" data-toggle="tab">Runs</a>
                                                </li>
                                                <li class="nav-item">
                                                    <a class="nav-link" href="#subsystems" role="tab" data-toggle="tab">Subsystems</a>
                                                </li>
                                                <li class="nav-item">
                                                    <a class="nav-link" href="#users" role="tab" data-toggle="tab">Users</a>
                                                </li>
                                                <li class="nav-item">
                                                    <a class="nav-link" href="#files" role="tab" data-toggle="tab">Files</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="tab-content">
                                            <div role="tabpanel" class="tab-pane active" id="runs" aria-labelledby="runs-tab">
                                                {State.LogModel.current.runs && State.LogModel.current.runs.length > 0 ?
                                                    <Table
                                                        data={State.LogModel.current.runs}
                                                        columns={RunColumns}
                                                        onHeaderClick={() => ('remove this')}
                                                    />
                                                    : 'This log has no runs'
                                                }
                                            </div>
                                            <div role="tabpanel" class="tab-pane" id="subsystems" aria-labelledby="subsystems-tab">
                                                Not yet implemented
                                                </div>
                                            <div role="tabpanel" class="tab-pane" id="users" aria-labelledby="users-tab">
                                                Not yet implemented
                                                </div>
                                            <div role="tabpanel" class="tab-pane" id="files" aria-labelledby="files-tab">
                                                Not yet implemented
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </HttpErrorAlert>
                </Spinner>
            </div >
        );
    }
}
