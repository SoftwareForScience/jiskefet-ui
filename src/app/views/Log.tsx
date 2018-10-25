/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import Spinner from '../components/Spinner';
import QuillViewer from '../components/QuillViewer';
import { format } from 'date-fns';
import HttpErrorAlert from '../components/HttpErrorAlert';
import State from '../models/State';

export default class Log implements m.Component {
    private id: number;
    private isLoading: boolean;

    constructor(vnode: any) {
        this.id = vnode.attrs.id;
        this.isLoading = true;
        State.LogModel.fetchOne(this.id).then(() => this.isLoading = false);
    }

    view() {
        return (
            <div className="container">
                <Spinner isLoading={this.isLoading}>
                    <HttpErrorAlert>
                        <div class="row">
                            <div class="col-md-12 mx-auto">
                                <div class="card shadow-sm bg-light">
                                    <div class="card-header">
                                        Log
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
                                    <div class="card-footer log-footer">
                                        <QuillViewer id={State.LogModel.current.logId} content={State.LogModel.current.text} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </HttpErrorAlert>
                </Spinner>
            </div>
        );
    }
}
