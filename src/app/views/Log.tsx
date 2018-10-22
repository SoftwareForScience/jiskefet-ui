/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import LogModel from '../models/Log';
import Spinner from '../components/Spinner';
import QuillViewer from '../components/QuillViewer';
import { format } from 'date-fns';
import HtmlError from '../components/HtmlError';

export default class Log implements m.Component {
    private id: number;
    private isLoading: boolean;

    constructor(vnode: any) {
        this.id = vnode.attrs.id;
        this.isLoading = true;
        LogModel.current.fetchOne(this.id).then(() => this.isLoading = false);
    }

    view() {
        return (
            <div className="container">
                <Spinner isLoading={this.isLoading}>
                    <HtmlError errorMessage={LogModel.current.error}>
                        <div class="row">
                            <div class="col-md-12 mx-auto">
                                <div class="card shadow-sm bg-light">
                                    <div class="card-header">
                                        Log
                                </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <h5 class="card-title">{LogModel.current.log.title}</h5>
                                            </div>
                                            <div class="col-md-6">
                                                <dl class="row">
                                                    <dt class="col-sm-6">Log id</dt>
                                                    <dd class="col-sm-6">{LogModel.current.log.logId}</dd>

                                                    <dt class="col-sm-6">Subtype:</dt>
                                                    <dd class="col-sm-6">
                                                        {LogModel.current.log.subtype === 'run' ?
                                                            <span class="badge badge-warning">{LogModel.current.log.subtype}</span>
                                                            : LogModel.current.log.subtype}
                                                    </dd>

                                                    <dt class="col-sm-6">Origin:</dt>
                                                    <dd class="col-sm-6">
                                                        {LogModel.current.log.origin === 'human' ?
                                                            <span class="badge badge-success">{LogModel.current.log.origin}</span>
                                                            : LogModel.current.log.origin}
                                                    </dd>

                                                    <dt class="col-sm-6">Creation time:</dt>
                                                    <dd class="col-sm-6">{format(LogModel.current.log.creationTime, 'HH:mm:ss DD/MM/YYYY')}</dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-footer log-footer">
                                        <QuillViewer id={LogModel.current.log.logId} content={LogModel.current.log.text} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </HtmlError>
                </Spinner>
            </div>
        );
    }
}
