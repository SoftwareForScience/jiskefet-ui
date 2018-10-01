import * as m from 'mithril';
import RunModel from '../models/Run';

export class RunsTable implements m.Component {
    oninit() {
        RunModel.fetch();
    }

    view() {
        return (
            <div class="table-responsive">
                <table class="table table-sm table-hover table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Run id</th>
                            <th scope="col">Time 02 start</th>
                            <th scope="col">Time trg start</th>
                            <th scope="col">Time trg end</th>
                            <th scope="col">Time 02 end</th>
                            <th scope="col">Activity id</th>
                            <th scope="col">Run type</th>
                            <th scope="col">Run quality</th>
                            <th scope="col">N detectors</th>
                            <th scope="col">N flps</th>
                            <th scope="col">N epns</th>
                            <th scope="col">N timeframes</th>
                            <th scope="col">N subtimeframes</th>
                            <th scope="col">Bytes read out</th>
                            <th scope="col">bytes timeframe builder</th>
                        </tr>
                    </thead>
                    <tbody>
                        {RunModel.list.map((runs) => {
                            return (
                                <tr>
                                    <td>{runs.run_number}</td>
                                    <td>{runs.time_o2_start}</td>
                                    <td>{runs.time_trg_start}</td>
                                    <td>{runs.time_trg_end}</td>
                                    <td>{runs.time_o2_end}</td>
                                    <td>{runs.activity_id}</td>
                                    <td>{runs.run_type}</td>
                                    <td>{runs.run_quality}</td>
                                    <td>{runs.n_detectors}</td>
                                    <td>{runs.n_flps}</td>
                                    <td>{runs.n_epns}</td>
                                    <td>{runs.n_timeframes}</td>
                                    <td>{runs.n_subtimeframes}</td>
                                    <td>{runs.bytes_read_out}</td>
                                    <td>{runs.bytes_timeframe_builder}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}