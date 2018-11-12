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
import TabContent from '../components/TabContent';
import TabHeader from '../components/TabHeader';
import RunTabs from '../constants/RunTabs';

interface Attrs {
    id: number;
}

type Vnode = m.Vnode<Attrs, Run>;

export default class Run extends MithrilTsxComponent<Attrs> {
    constructor(vnode: Vnode) {
        super();
        State.RunModel.fetchById(vnode.attrs.id).then(() => {
            this.formatDateFields();
        });
    }

    formatDateFields = () => {
        State.RunModel.current.timeO2Start = format(State.RunModel.current.timeO2Start, 'HH:mm:ss DD/MM/YYYY');
        State.RunModel.current.timeO2End = format(State.RunModel.current.timeO2End, 'HH:mm:ss DD/MM/YYYY');
        State.RunModel.current.timeTrgStart = format(State.RunModel.current.timeTrgStart, 'HH:mm:ss DD/MM/YYYY');
        State.RunModel.current.timeTrgEnd = format(State.RunModel.current.timeTrgEnd, 'HH:mm:ss DD/MM/YYYY');
    }

    view(vnode: Vnode) {
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
                                                <button class="btn btn-light border mb-2 float-right" onclick={() => m.route.set(`/logs/create/runs/${vnode.attrs.id}`)}>
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
                                        <TabHeader
                                            tabs={RunTabs}
                                        />
                                    </div>
                                    <div class="card-body">
                                        <Spinner isLoading={State.RunModel.isFetchingRun}>
                                            <TabContent
                                                tabs={RunTabs}
                                                entity={State.RunModel.current}
                                            />
                                        </Spinner>
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
