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
import LogColumns from '../util/LogUtil';

export default class Run implements m.Component {
    private id: number;

    constructor(vnode: any) {
        this.id = vnode.attrs.id;
        State.RunModel.fetchById(this.id).then(() => {
            this.formatDateFields();
        });
    }

    formatDateFields = () => {
        State.RunModel.current.timeO2Start = format(State.RunModel.current.timeO2Start, 'HH:mm:ss DD/MM/YYYY');
        State.RunModel.current.timeO2End = format(State.RunModel.current.timeO2End, 'HH:mm:ss DD/MM/YYYY');
        State.RunModel.current.timeTrgStart = format(State.RunModel.current.timeTrgStart, 'HH:mm:ss DD/MM/YYYY');
        State.RunModel.current.timeTrgEnd = format(State.RunModel.current.timeTrgEnd, 'HH:mm:ss DD/MM/YYYY');
    }

    routeToCreateLog = () => {
        m.route.set(`/logs/create/runs/${this.id}`);
    }

    view() {
        return (
            <div class="container-fluid">
                <Spinner isLoading={State.RunModel.isFetchingRun}>
                    <HttpErrorAlert>
                        <div class="row">
                            <div class="col-md-12 mx-auto">
                                <div class="card shadow-sm bg-light">
                                    <div class="card-header">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <h3>Run</h3>
                                            </div>
                                            <div class="col-md-6 float-right">
                                                <button class="btn btn-light border mb-2 float-right" onclick={this.routeToCreateLog}>
                                                    Create log
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <dl class="row">
                                                    <dt class="col-sm-6">Run id</dt>
                                                    <dd class="col-sm-6">{State.RunModel.current.runNumber}</dd>
                                                    <dt class="col-sm-6">Time O2 start</dt>
                                                    <dd class="col-sm-6">{State.RunModel.current.timeO2Start}</dd>
                                                    <dt class="col-sm-6">Time O2 end</dt>
                                                    <dd class="col-sm-6">{State.RunModel.current.timeO2End}</dd>
                                                    <dt class="col-sm-6">Time TRG start</dt>
                                                    <dd class="col-sm-6">{State.RunModel.current.timeTrgStart}</dd>
                                                    <dt class="col-sm-6">Time TRG end</dt>
                                                    <dd class="col-sm-6">{State.RunModel.current.timeTrgEnd}</dd>
                                                    <dt class="col-sm-6">Run type</dt>
                                                    <dd class="col-sm-6">
                                                        {State.RunModel.current.runType}
                                                    </dd>
                                                    <dt class="col-sm-6">Run quality</dt>
                                                    <dd class="col-sm-6">
                                                        <span class="badge badge-warning">{State.RunModel.current.runQuality}</span>
                                                    </dd>
                                                </dl>
                                            </div>
                                            <div class="col-md-6">
                                                <dl class="row">
                                                    <dt class="col-sm-6">Number of detectors</dt>
                                                    <dd class="col-sm-6">{State.RunModel.current.nDetectors}</dd>
                                                    <dt class="col-sm-6">Number of FLP's</dt>
                                                    <dd class="col-sm-6">{State.RunModel.current.nFlps}</dd>
                                                    <dt class="col-sm-6">Number of EPN's</dt>
                                                    <dd class="col-sm-6">{State.RunModel.current.nEpns}</dd>
                                                    <dt class="col-sm-6">Number of timeframes</dt>
                                                    <dd class="col-sm-6">{State.RunModel.current.nTimeframes}</dd>
                                                    <dt class="col-sm-6">Number of sub-timeframes</dt>
                                                    <dd class="col-sm-6">{State.RunModel.current.nSubtimeframes}</dd>
                                                    <dt class="col-sm-6">Bytes read out</dt>
                                                    <dd class="col-sm-6">{State.RunModel.current.bytesReadOut}</dd>
                                                    <dt class="col-sm-6">Bytes timeframe builder</dt>
                                                    <dd class="col-sm-6">{State.RunModel.current.bytesTimeframeBuilder}</dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-header">
                                        <div class="col-md-12 mx-auto">
                                            <ul class="nav nav-tabs card-header-tabs pull-xs-left flex-column flex-sm-row" role="tablist">
                                                <li class="nav-item">
                                                    <a class="nav-link active" href="#runs" role="tab" data-toggle="tab">Logs</a>
                                                </li>
                                                <li class="nav-item">
                                                    <a class="nav-link" href="#subsystems" role="tab" data-toggle="tab">Detectors</a>
                                                </li>
                                                <li class="nav-item">
                                                    <a class="nav-link" href="#users" role="tab" data-toggle="tab">Others...</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="tab-content">
                                            <div role="tabpanel" class="tab-pane active" id="runs" aria-labelledby="runs-tab">
                                                {State.RunModel.current.logs && State.RunModel.current.logs.length > 0 ?
                                                    <Table
                                                        data={State.RunModel.current.logs}
                                                        columns={LogColumns}
                                                    />
                                                    : 'This run has no logs'
                                                }
                                            </div>
                                            <div role="tabpanel" class="tab-pane" id="subsystems" aria-labelledby="subsystems-tab">
                                                Not yet implemented
                                            </div>
                                            <div role="tabpanel" class="tab-pane" id="users" aria-labelledby="users-tab">
                                                Not yet implemented
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </HttpErrorAlert >
                </Spinner >
            </div >
        );
    }
}
