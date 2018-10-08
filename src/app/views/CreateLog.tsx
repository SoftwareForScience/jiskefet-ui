import * as m from 'mithril';
import LogModel from '../models/Log';

export class CreateLog implements m.Component {
    addToCreateLog = (event) => {
        LogModel.createLog[event.target.id] = event.target.value;
    }

    saveLog() {
        LogModel.save();
    }

    view() {
        return (
            <form
                onsubmit={e => {
                    e.preventDefault();
                    this.saveLog();
                }}
            >
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-8 mx-auto bg-light rounded p-4 shadow-sm">
                            <div><h3>Create a new log</h3></div>
                            <div class="form-group">
                                <label for="title">Title:</label>
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
                                <label for="subtype">Select subtype:</label>
                                <div class="field">
                                    <select id="subtype" class="form-control" name="subtype" required onclick={this.addToCreateLog}>
                                        <option value="run">run</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="text">Description:</label>
                                <textarea
                                    id="text"
                                    class="form-control"
                                    placeholder="Description"
                                    required
                                    oninput={this.addToCreateLog}
                                    rows="5"
                                />
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}
