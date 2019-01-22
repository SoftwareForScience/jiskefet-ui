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
import Modal from '../atoms/Modal';
import MarkdownViewer from '../atoms/MarkdownViewer';
import MarkdownHelpText from '../constants/MarkdownHelpText';
import AttachmentComponent from '../atoms/Attachment';
import { selectProfile } from '../redux/ducks/auth/selectors';
import { store } from '../redux/configureStore';
import { LogCreate } from '../interfaces/Log';
import { createLog } from '../redux/ducks/log/operations';
import { selectLogToBeCreated } from '../redux/ducks/log/selectors';
import { clearLogToBeCreated, setLogToBeCreated } from '../redux/ducks/log/actions';
import MarkdownEditor from '../atoms/MarkdownEditor';
import NewTabContainer from '../atoms/NewTabContainer';
import Input, { InputSize } from '../atoms/Input';
import Label from '../atoms/Label';
import Select from '../atoms/Select';
import { selectCurrentRun } from '../redux/ducks/run/selectors';
import { fetchRun } from '../redux/ducks/run/operations';

interface Attrs {
    runNumber?: number | undefined;
}

type Vnode = m.Vnode<Attrs, CreateLog>;

export default class CreateLog extends MithrilTsxComponent<Attrs> {

    oninit() {
        store.dispatch(clearLogToBeCreated());
    }

    setValueForLogToBeCreated = (key: string, value: any) => {
        let logToBeCreated = selectLogToBeCreated(store.getState()) as LogCreate | {};
        if (!logToBeCreated) {
            logToBeCreated = {};
        }
        logToBeCreated = { ...logToBeCreated, [key]: value };
        if (logToBeCreated) {
            store.dispatch(setLogToBeCreated(logToBeCreated as LogCreate));
        }
    }

    addToCreateLog = (event: Event) => {
        this.setValueForLogToBeCreated(event.target.id, event.target.value);
    }

    addDescription = (content: string) => {
        this.setValueForLogToBeCreated('text', content);
    }

    async saveLog(runNumber: number | undefined) {
        if (runNumber) {
            store.dispatch(fetchRun(runNumber));
            const state = store.getState();
            const currentRun = selectCurrentRun(state);
            this.setValueForLogToBeCreated('runs', currentRun);
        }
        const profile = selectProfile(store.getState());
        if (profile) {
            this.setValueForLogToBeCreated('user', profile.userData.userId);

            const logToBeCreated = selectLogToBeCreated(store.getState());
            if (logToBeCreated) {
                await store.dispatch(createLog(logToBeCreated));
                store.dispatch(clearLogToBeCreated());
            }
            m.route.set('/Logs');
        }
    }

    view(vnode: Vnode) {
        const logToBeCreated = selectLogToBeCreated(store.getState());
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
                                <Label id="title" text="Add a title:" />
                                <div class="field">
                                    <Input
                                        id="title"
                                        inputType="text"
                                        className="form-control"
                                        inputSize={InputSize.MEDIUM}
                                        placeholder="Title"
                                        required={true}
                                        oninput={this.addToCreateLog}
                                    />
                                </div>
                            </div>
                            <div class="form-group">
                                <Label id="subtype" text="Select a subtype:" />
                                <div class="field">
                                    <Select
                                        id="subtype"
                                        className="form-control"
                                        inputSize={InputSize.SMALL}
                                        name="subtype"
                                        required={true}
                                        oninput={this.addToCreateLog}
                                        options={['run']}
                                    />
                                </div>
                            </div>
                            <div class="form-group">
                                <Label id="subtype" text="Run number:" />
                                <div class="field">
                                    <Input
                                        id="runs"
                                        inputType="number"
                                        className="form-control"
                                        inputSize={InputSize.SMALL}
                                        placeholder="Run number"
                                        required={true}
                                        oninput={this.addToCreateLog}
                                        value={vnode.attrs.runNumber && vnode.attrs.runNumber}
                                    />
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="card shadow-sm bg-light">
                                    <NewTabContainer titles={['Editor', 'Preview']} >
                                        <MarkdownEditor
                                            postContent={(content: string) => this.addDescription(content)}
                                        />
                                        <MarkdownViewer
                                            id={'MarkdownPreview'}
                                            content={logToBeCreated && logToBeCreated.text || ''}
                                        />
                                    </NewTabContainer>
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
            </form>
        );
    }
}
