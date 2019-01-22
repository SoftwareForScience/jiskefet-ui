/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import Spinner from '../atoms/Spinner';
import HttpErrorAlert from '../atoms/HttpErrorAlert';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import RunTabs from '../constants/RunTabs';
import Tabs from '../atoms/TabContainer';
import Modal from '../atoms/Modal';
import LinkLogToRun from '../atoms/LinkLogToRun';
import SuccessMessage from '../atoms/SuccessMessage';
import { store } from '../redux/configureStore';
import { fetchRun } from '../redux/ducks/run/operations';
import { selectIsFetchingRun, selectIsPatchingLinkLogToRun, selectCurrentRun } from '../redux/ducks/run/selectors';
import Card from '../atoms/Card';
import DescriptionList from '../atoms/DescriptionList';
import RunDescription from '../constants/RunDescription';

interface Attrs {
    runNumber: number;
}

type Vnode = m.Vnode<Attrs, Run>;
type VnodeDOM = m.VnodeDOM<Attrs, Run>;

export default class Run extends MithrilTsxComponent<Attrs> {
    oninit(vnode: VnodeDOM) {
        store.dispatch(fetchRun(vnode.attrs.runNumber));
    }

    linkingButton(addExistingRunId: string, runNumber: number) {
        return (
            <div class="row justify-content-end">
                <button
                    type="button"
                    class="btn btn-success btn-sm mr-1"
                    onclick={() => m.route.set(
                        `/logs/create/runs/${runNumber}`
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
        );
    }

    view(vnode: Vnode) {
        const addExistingRunId = 'add-existing-run';
        const state = store.getState();
        const currentRun = selectCurrentRun(state);
        const isFetchingRun = selectIsFetchingRun(state);
        const isPatchingLinkLogToRun = selectIsPatchingLinkLogToRun(state);
        return (
            <div class="container-fluid">
                <Spinner
                    isLoading={isFetchingRun || isPatchingLinkLogToRun}
                >
                    <SuccessMessage />
                    <HttpErrorAlert>
                        <div class="row">
                            <div class="col-md-12 mx-auto">
                                <Card
                                    className={'shadow-sm bg-light'}
                                    headerTitle={'Run'}
                                    headerContent={
                                        this.linkingButton(addExistingRunId, vnode.attrs.runNumber)
                                    }
                                    footerContent={(
                                        <Tabs
                                            tabs={RunTabs}
                                            entity={currentRun || undefined}
                                        />
                                    )}
                                >
                                    <DescriptionList
                                        descriptions={RunDescription}
                                        entity={currentRun}
                                        listLength={7}
                                    />
                                </Card>
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
