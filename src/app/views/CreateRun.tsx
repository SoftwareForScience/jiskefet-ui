import * as m from 'mithril';
import RunModel from '../models/Run';

export default class CreateRun implements m.Component {

    addToRunCreate = (event) => {
        RunModel.createRun[event.target.id] = event.target.value;
    }

    saveRun() {
        RunModel.save();
    }

    view() {
        return (
            <form
                onsubmit={e => {
                    e.preventDefault();
                    this.saveRun();
                }}
            >
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-8 mx-auto bg-light rounded p-4 shadow-sm">
                            <div><h3>Create a new run</h3></div>
                            <div class="form-group">
                                <label for="activity_id">Activity ID:</label>
                                <div class="field">
                                    <input
                                        id="activityId"
                                        type="text"
                                        class="form-control"
                                        placeholder="Activity ID"
                                        name="activityId"
                                        maxlength="16"
                                        required
                                        oninput={this.addToRunCreate}
                                    />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="run_type">Select run type:</label>
                                <div class="field">
                                    <select id="runType" class="form-control" name="runType" required onclick={this.addToRunCreate}>
                                        <option value="test">-Choose one-</option>
                                        <option value="test">test</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="run_quality">Select run quality:</label>
                                <div class="field">
                                    <select id="runQuality" class="form-control" name="runQuality" required onclick={this.addToRunCreate}>
                                        <option value="test">-Choose one-</option>
                                        <option value="test">test</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="n_detectors">Number of detectors:</label>
                                <div class="field">
                                    <input
                                        id="nDetectors"
                                        type="number"
                                        class="form-control"
                                        placeholder="Number of detectors"
                                        name="nDetectors"
                                        required
                                        oninput={this.addToRunCreate}
                                    />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="n_flps">Number of FLPs:</label>
                                <div class="field">
                                    <input
                                        id="nFlps"
                                        type="number"
                                        class="form-control"
                                        placeholder="Number of FLPs"
                                        name="nFlps"
                                        required
                                        oninput={this.addToRunCreate}
                                    />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="n_epns">Number of EPNs:</label>
                                <div class="field">
                                    <input
                                        id="nEpns"
                                        type="number"
                                        class="form-control"
                                        placeholder="Number of EPNs"
                                        name="nEpns"
                                        required
                                        oninput={this.addToRunCreate}
                                    />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="n_timeframes">Number of timeframes:</label>
                                <div class="field">
                                    <input
                                        id="nTimeframes"
                                        type="number"
                                        class="form-control"
                                        placeholder="Number of timeframes"
                                        name="nTimeframes"
                                        required
                                        oninput={this.addToRunCreate}
                                    />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="n_subtimeframes">Number of subtimeframes:</label>
                                <div class="field">
                                    <input
                                        id="nSubtimeframes"
                                        type="number"
                                        class="form-control"
                                        placeholder="Number of subtimeframes"
                                        name="nSubtimeframes"
                                        required
                                        oninput={this.addToRunCreate}
                                    />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="bytes_read_out">Bytes read out:</label>
                                <div class="field">
                                    <input
                                        id="bytesReadOut"
                                        type="number"
                                        class="form-control"
                                        placeholder="Bytes read out"
                                        name="bytesReadOut"
                                        required
                                        oninput={this.addToRunCreate}
                                    />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="bytes_timeframe_builder">Bytes timeframe builder:</label>
                                <div class="field">
                                    <input
                                        id="bytesTimeframeBuilder"
                                        type="number"
                                        class="form-control"
                                        placeholder="Bytes timeframe builder"
                                        name="bytesTimeframeBuilder"
                                        required
                                        oninput={this.addToRunCreate}
                                    />
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}
