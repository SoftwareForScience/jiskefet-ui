/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { Run as IRun } from '../interfaces/Run';
import Spinner from '../components/Spinner';
import Card from '../components/Card';
import { format } from 'date-fns';
import HttpErrorAlert from '../components/HttpErrorAlert';
import State from '../models/State';
import Table from '../components/Table';
import LogColumns from '../util/LogUtil';

export default class Run implements m.Component {
    private id: number;
    private run: IRun;

    constructor(vnode: any) {
        this.id = vnode.attrs.id;
    }

    oninit() {
        State.RunModel.fetchById(this.id).then(() => {
            this.run = State.RunModel.current;
            this.formatDateFields();
        });
    }

    formatDateFields = () => {
        this.run.timeO2Start = format(this.run.timeO2Start, 'HH:mm:ss DD/MM/YYYY');
        this.run.timeO2End = format(this.run.timeO2End, 'HH:mm:ss DD/MM/YYYY');
        this.run.timeTrgStart = format(this.run.timeTrgStart, 'HH:mm:ss DD/MM/YYYY');
        this.run.timeTrgEnd = format(this.run.timeTrgEnd, 'HH:mm:ss DD/MM/YYYY');
    }

    view() {
        return (
            <div className="container-fluid">
                <Spinner isLoading={State.LogModel.isFetchingLogs}>
                    <HttpErrorAlert>
                        <div className="col-md-12 mx-auto">
                            {this.run &&
                                <div className="row">
                                    <div className="col-md-12">
                                        <Card data={this.run} title={'Run'} />
                                    </div>
                                </div>
                            }
                            <br />
                            <div class="row">
                                <div class="col-md-12 mx-auto">
                                    <ul class="nav nav-pills flex-column flex-sm-row" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link active" href="#runs" role="tab" data-toggle="tab">Logs</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#subsystems" role="tab" data-toggle="tab">Detectors</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#users" role="tab" data-toggle="tab">Sessions</a>
                                        </li>
                                    </ul>
                                    <br />
                                    <div class="tab-content">
                                        <div role="tabpanel" class="tab-pane active" id="logs" aria-labelledby="logs-tab">
                                            <Table
                                                data={State.RunModel.current.logs}
                                                columns={LogColumns}
                                            />
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
                    </HttpErrorAlert>
                </Spinner>
            </div >
        );
    }
}
