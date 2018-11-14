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
import LogTabs from '../constants/LogTabs';
import Tabs from '../components/Tab';

interface Attrs {
    id: number;
}

type Vnode = m.Vnode<Attrs, Log>;

export default class Log extends MithrilTsxComponent<Attrs> {

    constructor(vnode: Vnode) {
        super();
        State.LogModel.fetchOne(vnode.attrs.id);
        State.AttachmentModel.fetch(vnode.attrs.id);
    }

    saveAttachmentModels(event: any) {
        const files = event.target.files;
        State.AttachmentModel.read(files[0], true);
    }

    async postAttachments() {
        if (State.AttachmentModel.createAttachment && State.AttachmentModel.hasChosenAttachment) {
            await State.AttachmentModel.save();
        } else {
            State.AttachmentModel.hasChosenAttachment = false;
        }
    }

    view() {
        return (
            <div class="container-fluid">
                <Spinner isLoading={State.LogModel.isFetchingLog}>
                    <HttpErrorAlert>
                        <div class="row">
                            <div class="col-md-12 mx-auto">
                                <div class="card shadow-sm bg-light">
                                    <div class="card-header">
                                        <h3>Log</h3>
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <h5 class="card-title">{State.LogModel.current.title}</h5>
                                                <label for="fileUpload">Attach new file to Log:</label>
                                                <input
                                                    type="file"
                                                    class="form-control-file"
                                                    id="fileUpload"
                                                    name="fileUpload"
                                                    data-show-caption="true"
                                                    onchange={this.saveAttachmentModels}
                                                />
                                                <br />
                                                <button
                                                    id="save"
                                                    class="btn btn-primary"
                                                    onclick={this.postAttachments}
                                                >Save Attachment
                                                </button>
                                                <br />
                                                <label
                                                    for="save"
                                                    hidden={State.AttachmentModel.hasChosenAttachment}
                                                >Select an attachment before saving.
                                                </label>
                                            </div>
                                            <div class="col-md-6">
                                                <dl class="row">
                                                    <dt class="col-sm-6">Log id</dt>
                                                    <dd class="col-sm-6">{State.LogModel.current.logId}</dd>

                                                    <dt class="col-sm-6">Subtype:</dt>
                                                    <dd class="col-sm-6">
                                                        {State.LogModel.current.subtype === 'run' ?
                                                            <span class="badge badge-warning">
                                                                {State.LogModel.current.subtype}
                                                            </span>
                                                            : State.LogModel.current.subtype}
                                                    </dd>

                                                    <dt class="col-sm-6">Origin:</dt>
                                                    <dd class="col-sm-6">
                                                        {State.LogModel.current.origin === 'human' ?
                                                            <span class="badge badge-success">
                                                                {State.LogModel.current.origin}
                                                            </span>
                                                            : State.LogModel.current.origin}
                                                    </dd>

                                                    <dt class="col-sm-6">Creation time:</dt>
                                                    <dd class="col-sm-6">
                                                        {format(
                                                            State.LogModel.current.creationTime,
                                                            'HH:mm:ss DD/MM/YYYY'
                                                        )}
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                    <Tabs
                                        tabs={LogTabs}
                                        entity={State.LogModel.current}
                                    />
                                </div>
                            </div>
                        </div>
                    </HttpErrorAlert>
                </Spinner>
            </div >
        );
    }
}
