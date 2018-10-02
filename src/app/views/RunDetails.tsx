import * as m from 'mithril';
import RunModel from '../models/Run';
import Spinner from '../components/Spinner';

export class RunDetails implements m.Component {
    private isLoading: boolean;

    constructor() {
        this.isLoading = true;
    }

    oninit() {
        //RunModel.fetch().then(() => this.isLoading = false);
        RunModel.fetchById(1);
        this.isLoading = false
    }

    view() {
        return (
            <div className="container-fluid">
                <Spinner isLoading={this.isLoading}>
                    {RunModel.current &&
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-4 border rounded border-dark">
                                    <h4>Run</h4>
                                    <p>Run number: {RunModel.current.run_number}</p>
                                    <p>timestamp</p>
                                    <p>timestamp</p>
                                    <p>timestamp</p>
                                    <p>timestamp</p>
                                    <p>Run quality: {RunModel.current.run_quality}</p>
                                    <p>Run type: {RunModel.current.run_type}</p>
                                    <p>Activity id: {RunModel.current.activity_id}</p>
                                    <p>Number of detectors: {RunModel.current.n_detectors}</p>
                                    <p>Number of EPNS: {RunModel.current.n_epns}</p>
                                    <p>Number of FLPS: {RunModel.current.n_flps}</p>
                                    <p>Number of timeframes: {RunModel.current.n_timeframes}</p>
                                    <p>Number of subtimeframes: {RunModel.current.n_subtimeframes}</p>
                                </div>
                                <br/>
                                <div className="col-md-7 offset-md-1">
                                    <div className="row">
                                        <div className="col-md-6 border rounded border-dark">
                                            <h4>Detectors</h4>
                                            
                                        </div>
                                        <div className="col-md-6 border rounded border-dark">
                                            <h4>EPN Role Sessions</h4>
                                            
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="row">
                                        <div className="col-md-6 border rounded border-dark">
                                            <h4>FLP Roles</h4>
                                            
                                        </div>
                                        <div className="col-md-6 border rounded border-dark">
                                            <h4>Run Quality history</h4>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </Spinner>
            </div>
        );
    }
}
