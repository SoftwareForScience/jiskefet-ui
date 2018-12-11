/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import Spinner from '../components/Spinner';
import HttpErrorAlert from '../components/HttpErrorAlert';
import State from '../models/State';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import RunTabs from '../constants/RunTabs';
import Tabs from '../components/Tab';
import Modal from '../components/Modal';
import LinkLogToRun from '../components/LinkLogToRun';
import SuccessMessage from '../components/SuccessMessage';
import { formatDateField } from '../utility/DateUtil';

interface Attrs {
    runNumber: number;
}

type Vnode = m.Vnode<Attrs, Run>;
type VnodeDOM = m.VnodeDOM<Attrs, Run>;

export default class Run extends MithrilTsxComponent<Attrs> {
    oninit(vnode: VnodeDOM) {
        State.RunModel.fetchById(vnode.attrs.runNumber);
    }

    view(vnode: Vnode) {
        const addExistingRunId = 'add-existing-run';
        return (
            <div class="container-fluid">
                <Spinner isLoading={State.RunModel.isFetchingRun || State.RunModel.isPatchingLinkLogToRun}>
                    <SuccessMessage />
                    <HttpErrorAlert>
                        <div class="row">
                            <div class="col-md-12 mx-auto">
                                <div class="card shadow-sm bg-light">
                                    <div class="card-header">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <h3>Run</h3>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="row justify-content-end">
                                                    <button
                                                        type="button"
                                                        class="btn btn-success btn-sm mr-1"
                                                        onclick={() => m.route.set(
                                                            `/logs/create/runs/${vnode.attrs.runNumber}`
                                                        )}
                                                    >
                                                        Add new log to run
                                                    </button>
                                                    <button
                                                        type="button"
                                                        class="btn btn-primary btn-sm mr-1"
                                                        data-toggle="modal"
                                                        data-target={`#${addExistingRunId}`}
                                                    >
                                                        Link existing log
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <dl class="row">
                                                    <dt class="col-sm-6">Run id</dt>
                                                    <dd class="col-sm-6">
                                                        {State.RunModel.current.runNumber}
                                                    </dd>
                                                    <dt class="col-sm-6">Time O&sup2; start</dt>
                                                    <dd class="col-sm-6">
                                                        {formatDateField(State.RunModel.current.timeO2Start)}
                                                    </dd>
                                                    <dt class="col-sm-6">Time O&sup2; end</dt>
                                                    <dd class="col-sm-6">
                                                        {formatDateField(State.RunModel.current.timeO2End)}
                                                    </dd>
                                                    <dt class="col-sm-6">Time TRG start</dt>
                                                    <dd class="col-sm-6">
                                                        {formatDateField(State.RunModel.current.timeTrgStart)}
                                                    </dd>
                                                    <dt class="col-sm-6">Time TRG end</dt>
                                                    <dd class="col-sm-6">
                                                        {formatDateField(State.RunModel.current.timeTrgEnd)}
                                                    </dd>
                                                    <dt class="col-sm-6">Run type</dt>
                                                    <dd class="col-sm-6">
                                                        {State.RunModel.current.runType}
                                                    </dd>
                                                    <dt class="col-sm-6">Run quality</dt>
                                                    <dd class="col-sm-6">
                                                        <span class="badge badge-warning">
                                                            {State.RunModel.current.runQuality}
                                                        </span>
                                                    </dd>
                                                </dl>
                                            </div>
                                            <div class="col-md-6">
                                                <dl class="row">
                                                    <dt class="col-sm-6">Number of detectors</dt>
                                                    <dd class="col-sm-6">
                                                        {State.RunModel.current.nDetectors}
                                                    </dd>
                                                    <dt class="col-sm-6">Number of FLP's</dt>
                                                    <dd class="col-sm-6">
                                                        {State.RunModel.current.nFlps}
                                                    </dd>
                                                    <dt class="col-sm-6">Number of EPN's</dt>
                                                    <dd class="col-sm-6">
                                                        {State.RunModel.current.nEpns}
                                                    </dd>
                                                    <dt class="col-sm-6">Number of timeframes</dt>
                                                    <dd class="col-sm-6">
                                                        {State.RunModel.current.nTimeframes}
                                                    </dd>
                                                    <dt class="col-sm-6">Number of sub-timeframes</dt>
                                                    <dd class="col-sm-6">
                                                        {State.RunModel.current.nSubtimeframes}
                                                    </dd>
                                                    <dt class="col-sm-6">Bytes read out</dt>
                                                    <dd class="col-sm-6">
                                                        {State.RunModel.current.bytesReadOut}
                                                    </dd>
                                                    <dt class="col-sm-6">Bytes timeframe builder</dt>
                                                    <dd class="col-sm-6">
                                                        {State.RunModel.current.bytesTimeframeBuilder}
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                    <Tabs
                                        tabs={RunTabs}
                                        entity={State.RunModel.current}
                                    />
                                </div>
                            </div>
                        </div>
                    </HttpErrorAlert >
                </Spinner >
                <Modal id={addExistingRunId} title="Link existing log">
                    <LinkLogToRun runNumber={vnode.attrs.runNumber} />
                </Modal>
            </div >
        );
    }
}
