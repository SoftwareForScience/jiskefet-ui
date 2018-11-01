/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import QuillEditor from '../components/QuillEditor';
import State from '../models/State';

export default class CreateLog implements m.Component {
    addToCreateLog = (event) => {
        State.LogModel.createLog[event.target.id] = event.target.value;
    }

    addDescription = (content: string) => {
        State.LogModel.createLog.text = content;
    }

    saveLog() {
        State.LogModel.save();
    }

    convertFileToAttachmentModel(e) {
        var files = e.target.files;
        State.AttachmentModel.createAttachmentModel(files);
    }

    saveAttachment() {
        State.AttachmentModel.save();
    }

    view() {
        return (
            <form
                onsubmit={e => {
                    e.preventDefault();
                    this.saveLog();
                    this.saveAttachment();
                    m.route.set('/Logs');
                }}
            >
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-8 mx-auto bg-light rounded p-4 shadow-sm">
                            <div><h3>Create a new Log</h3></div>
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
                                    <select id="subtype" class="form-control" name="subtype" required onclick={this.addToCreateLog}>
                                        <option value="run">run</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="description">Add a Description:</label>
                                <input name="description" type="hidden" />
                                <QuillEditor postContent={this.addDescription} />
                            </div>
                            <div class="form-group">
                                <label for="fileUpload">Attach file(s) to Log:</label>
                                <input type="file" class="form-control-file" id="fileUpload" name="fileUpload" multiple
                                    data-show-caption="true" onchange={this.convertFileToAttachmentModel} />
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}
