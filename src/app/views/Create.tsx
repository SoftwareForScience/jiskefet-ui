import * as m from 'mithril';
import RunModel, { IRun } from '../models/Run';

export class Create implements m.Component {
    constructor() {
    }

    addToRunCreate = (event) => {
        RunModel.current[event.target.id] = event.target.value;
    }

    saveRun() {
        RunModel.save();
    }

    view() {
        return (
            <form onsubmit={(e) => {
                e.preventDefault();
                this.saveRun();
            }}>
                <div className="container-fluid">
                    <div class="container">
                        <div className="col-md-8 mx-auto">
                            <div><h3>Create a new Run</h3></div>
                            <div class="form-group">
                                <label for="activity_id">Activity ID:</label>
                                <div class="field">
                                    <input id="activity_id" type="text" class="form-control" placeholder="Activity ID" name="activity_id"
                                        maxlength="16" required oninput={this.addToRunCreate} />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="run_type">Select run type:</label>
                                <div class="field">
                                    <select id="run_type" class="form-control" name="run_type" required onclick={this.addToRunCreate}>
                                        <option value="test">-Choose one-</option>
                                        <option value="test">test</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="run_quality">Select run quality:</label>
                                <div class="field">
                                    <select id="run_quality" class="form-control" name="run_quality" required onclick={this.addToRunCreate}>
                                        <option value="test">-Choose one-</option>
                                        <option value="test">test</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="n_detectors">N detectors:</label>
                                <div class="field">
                                    <input id="n_detectors" type="number" class="form-control" placeholder="N detectors" name="n_detectors"
                                        required oninput={this.addToRunCreate} />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="n_flps">N flps:</label>
                                <div class="field">
                                    <input id="n_flps" type="number" class="form-control" placeholder="N flps" name="n_fpls"
                                        required oninput={this.addToRunCreate} />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="n_epns">N epns:</label>
                                <div class="field">
                                    <input id="n_epns" type="number" class="form-control" placeholder="N epns" name="n_epns"
                                        required oninput={this.addToRunCreate} />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="n_timeframes">N timeframes:</label>
                                <div class="field">
                                    <input id="n_timeframes" type="number" class="form-control" placeholder="N timeframes" name="n_timeframes"
                                        required oninput={this.addToRunCreate} />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="n_subtimeframes">N subtimeframes:</label>
                                <div class="field">
                                    <input id="n_subtimeframes" type="number" class="form-control" placeholder="N subtimeframes" name="n_subtimeframes"
                                        required oninput={this.addToRunCreate} />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="bytes_read_out">Bytes read out:</label>
                                <div class="field">
                                    <input id="bytes_read_out" type="number" class="form-control" placeholder="Bytes read out" name="bytes_read_out"
                                        required oninput={this.addToRunCreate} />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="bytes_timeframe_builder">Byte timeframe builder:</label>
                                <div class="field">
                                    <input id="bytes_timeframe_builder" type="number" class="form-control" placeholder="Bytes timeframe builder"
                                        name="bytes_timeframe_builder" required oninput={this.addToRunCreate} />
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">Sumbit</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}