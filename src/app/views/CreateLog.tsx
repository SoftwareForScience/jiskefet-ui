/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import { Event } from '../interfaces/Event';
import Tabs from '../components/Tab';
import CreateLogTabs from '../constants/CreateLogTabs';
import Modal from '../components/Modal';
import MarkdownViewer from '../components/MarkdownViewer';
import MarkdownHelpText from '../constants/MarkdownHelpText';
import AttachmentComponent from '../components/Attachment';
import { selectProfile } from '../redux/ducks/auth/selectors';
import { store } from '../redux/configureStore';
import { selectLogToBeCreated } from '../redux/ducks/log/selectors';
import { LogCreate } from '../interfaces/Log';
import { fetchRun } from '../redux/ducks/run/operations';
import { selectCurrentRun } from '../redux/ducks/run/selectors';
import { fetchUser } from '../redux/ducks/user/operations';
import { selectCurrentUser } from '../redux/ducks/user/selectors';
import { User } from '../interfaces/User';
import { createLog } from '../redux/ducks/log/operations';

interface Attrs {
    runNumber?: number;
}

type Vnode = m.Vnode<Attrs, CreateLog>;

export default class CreateLog extends MithrilTsxComponent<Attrs> {

    private logToBeCreated: LogCreate;

    constructor() {
        super();
        this.logToBeCreated = selectLogToBeCreated(store.getState()) as LogCreate;
    }

    addToCreateLog = (event: Event) => {
        this.logToBeCreated[event.target.id] = event.target.value;
    }

    addRunsToCreateLog = (event: Event) => {
        store.dispatch(fetchRun(event.target.value)).then(() => {
            this.logToBeCreated.runs = new Array();
            this.logToBeCreated.runs.push(selectCurrentRun(store.getState()));
        });
    }

    addDescription = (content: string) => {
        this.logToBeCreated.text = content;
    }

    saveLog(runNumber: number | undefined) {
        if (runNumber) {
            this.logToBeCreated.runs = new Array();
            this.logToBeCreated.runs.push(selectCurrentRun(store.getState()));
        }
        const profile = selectProfile(store.getState());
        if (profile) {
            store.dispatch(fetchUser(profile.userData.userId)).then(() => {
                this.logToBeCreated.user = selectCurrentUser(store.getState()) as User;
                store.dispatch(createLog(this.logToBeCreated)).then(() => {
                    m.route.set('/Logs');
                });
            });
        }
    }

    view(vnode: Vnode) {
        return (
            <form
                onsubmit={(event: Event) => {
                    event.preventDefault();
                    this.saveLog(vnode.attrs.runNumber);
                }}
            >
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-12 mx-auto bg-light rounded p-4 shadow-sm">
                            <div>
                                <h3>
                                    {`Create a new log ${vnode.attrs.runNumber ?
                                        `for run number ${vnode.attrs.runNumber}` :
                                        ''}`}
                                </h3>
                            </div>
                            <div class="form-group">
                                <label for="title">Add a Title:</label>
                                <div class="field">
                                    <input
                                        id="title"
                                        type="text"
                                        class="form-control"
                                        placeholder="Title"
                                        required
                                        oninput={this.addToCreateLog}
                                    />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="subtype">Select Subtype:</label>
                                <div class="field">
                                    <select
                                        id="subtype"
                                        class="form-control"
                                        name="subtype"
                                        required
                                        onclick={this.addToCreateLog}
                                    >
                                        <option value="run">run</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="subtype">Run number:</label>
                                <div class="field">
                                    <input
                                        id="runs"
                                        type="number"
                                        class="form-control"
                                        placeholder="Run number"
                                        value={vnode.attrs.runNumber && vnode.attrs.runNumber}
                                        required
                                        oninput={this.addRunsToCreateLog}
                                    />
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="card shadow-sm bg-light">
                                    <Tabs
                                        tabs={CreateLogTabs}
                                        entity={this.logToBeCreated}
                                        func={(content: string) => this.addDescription(content)}
                                        caller={'description'}
                                    />
                                </div>
                            </div>
                            <AttachmentComponent
                                attachTo="Log"
                                hideImagePreview={true}
                                isExistingItem={false}
                            />
                            <br />
                            <button type="submit" class="btn btn-primary">Submit</button>
                            <button
                                type="button"
                                class="btn btn-info float-right"
                                data-toggle="modal"
                                data-target="#MarkdownHelpText"
                            >
                                Formatting help
                            </button>
                            <Modal id="MarkdownHelpText" title="Markdown help">
                                <MarkdownViewer id={'MarkdownHelpTextViewer'} content={MarkdownHelpText} />
                            </Modal>
                        </div>
                    </div>
                </div>
            </form >
        );
    }
}
