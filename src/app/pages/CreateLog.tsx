/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import State from '../models/State';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import { Event } from '../interfaces/Event';
import Tabs from '../molecules/Tab';
import CreateLogTabs from '../constants/CreateLogTabs';
import Modal from '../atoms/Modal';
import MarkdownViewer from '../atoms/MarkdownViewer';
import MarkdownHelpText from '../constants/MarkdownHelpText';
import AttachmentComponent from '../atoms/Attachment';
import Input from '../atoms/Input';
import Select from '../atoms/Select';
import Label from '../atoms/Label';

interface Attrs {
    runNumber?: number;
}

type Vnode = m.Vnode<Attrs, CreateLog>;

export default class CreateLog extends MithrilTsxComponent<Attrs> {

    addToCreateLog = (event: Event) => {
        State.LogModel.createLog[event.target.id] = event.target.value;
    }

    addRunsToCreateLog = (event: Event) => {
        State.RunModel.fetchById(event.target.value).then(() => {
            State.LogModel.createLog.runs = new Array();
            State.LogModel.createLog.runs.push(State.RunModel.current);
        });
    }

    addDescription = (content: string) => {
        State.LogModel.createLog.text = content;
    }

    saveLog(runNumber: number | undefined) {
        if (runNumber) {
            State.LogModel.createLog.runs = new Array();
            State.LogModel.createLog.runs.push(State.RunModel.current);
        }
        if (State.AuthModel.profile !== null) {
            State.UserModel.fetchById(State.AuthModel.profile.userData.userId).then(() => {
                State.LogModel.createLog.user = State.UserModel.current;
                State.LogModel.save().then(() => {
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
                                <Label id="title" text="Add a title:" />
                                <div class="field">
                                    <Input
                                        id="title"
                                        formType="text"
                                        className="form-control col-md-4"
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
                                        className="form-control col-md-2"
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
                                        formType="number"
                                        className="form-control col-md-2"
                                        placeholder="Run number"
                                        required={true}
                                        oninput={this.addRunsToCreateLog}
                                        value={vnode.attrs.runNumber && vnode.attrs.runNumber}
                                    />
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="card shadow-sm bg-light">
                                    <Tabs
                                        tabs={CreateLogTabs}
                                        entity={State.LogModel.createLog}
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
