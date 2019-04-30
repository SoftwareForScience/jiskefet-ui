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
import AttachmentComponent from '../molecules/Attachment';
import { selectProfile } from '../redux/ducks/auth/selectors';
import { store } from '../redux/configureStore';
import { LogCreate } from '../interfaces/Log';
import { createLog } from '../redux/ducks/log/operations';
import { selectLogToBeCreated } from '../redux/ducks/log/selectors';
import { clearLogToBeCreated, setLogToBeCreated } from '../redux/ducks/log/actions';
import MarkdownEditor from '../atoms/MarkdownEditor';
import TabContainer from '../molecules/TabContainer';
import Input, { InputSize } from '../atoms/Input';
import Label from '../atoms/Label';
import Select from '../atoms/Select';
import FormGroup from '../molecules/FormGroup';
import Button, { ButtonType, ButtonClass } from '../atoms/Button';
import HttpErrorAlert from '../atoms/HttpErrorAlert';

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
        if (logToBeCreated) {
            store.dispatch(setLogToBeCreated(logToBeCreated as LogCreate));
        }
    }

    addToCreateLog = (event: Event) => {
        this.setValueForLogToBeCreated(event.target.id, event.target.value);
    }

    addDescription = (content: string) => {
        this.setValueForLogToBeCreated('body', content);
    }

    async saveLog(runNumber: number | string | undefined) {
        if (runNumber) {
            console.log(`Before casting ${typeof runNumber}`);
            console.log(runNumber);
            runNumber = +runNumber;
            console.log(`After casting ${typeof runNumber}`);
            console.log(runNumber);
            this.setValueForLogToBeCreated('runs', runNumber);
        }
        const profile = selectProfile(store.getState());
        if (profile) {
            this.setValueForLogToBeCreated('user', profile.userData.userId);
            console.log('store getstate');
            console.log(store.getState());

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
            <HttpErrorAlert>
                <form
                    onsubmit={(event: Event) => {
                        event.preventDefault();
                        console.log(`Vnode runnumber ${ vnode.attrs.runNumber }`);
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
                                <FormGroup
                                    label={(
                                        <Label id="title" text="Add a title:" />
                                    )}
                                    field={(
                                        <Input
                                            id="title"
                                            inputType="text"
                                            className="form-control"
                                            inputSize={InputSize.MEDIUM}
                                            placeholder="Title"
                                            required={true}
                                            oninput={this.addToCreateLog}
                                        />
                                    )}
                                />
                                <FormGroup
                                    label={(
                                        <Label id="subtype" text="Select a subtype:" />
                                    )}
                                    field={(
                                        <Select
                                            id="subtype"
                                            className="form-control"
                                            inputSize={InputSize.MEDIUM}
                                            name="subtype"
                                            required={true}
                                            oninput={this.addToCreateLog}
                                            options={['run']}
                                        />
                                    )}
                                />
                                <FormGroup
                                    label={(
                                        <Label id="runs" text="Run number:" />
                                    )}
                                    field={(
                                        <Input
                                            id="runs"
                                            inputType="number"
                                            className="form-control"
                                            inputSize={InputSize.MEDIUM}
                                            placeholder="Run number"
                                            required={false}
                                            oninput={this.addToCreateLog}
                                            value={vnode.attrs.runNumber && vnode.attrs.runNumber}
                                        />
                                    )}
                                />
                                <FormGroup
                                    field={(
                                        <div class="card shadow-sm bg-light">
                                            <TabContainer titles={['Editor', 'Preview']} >
                                                <MarkdownEditor
                                                    postContent={(content: string) => this.addDescription(content)}
                                                />
                                                <MarkdownViewer
                                                    id={'MarkdownPreview'}
                                                    content={logToBeCreated && logToBeCreated.body || ''}
                                                />
                                            </TabContainer>
                                        </div>
                                    )}
                                />
                                <AttachmentComponent
                                    attachTo="Log"
                                    hideImagePreview={true}
                                    isExistingItem={false}
                                />
                                <br />
                                <div class="row">
                                    <div class="col-md-6">
                                        <Button
                                            buttonType={ButtonType.SUBMIT}
                                            buttonClass={ButtonClass.DEFAULT}
                                            text="Submit"
                                        />
                                    </div>
                                    <div class="col-md-6">
                                        <Modal
                                            id="MarkdownHelpText"
                                            title="Markdown help"
                                            buttonClass="btn btn-info mb-"
                                        >
                                            <MarkdownViewer id={'MarkdownHelpTextViewer'} content={MarkdownHelpText} />
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </HttpErrorAlert>
        );
    }
}
