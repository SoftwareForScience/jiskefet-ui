/**
 * TODO:
 * - Fix timestamps from Run
 * - Discuss visualisations
 * - Use no mocup date 
 * - Make components of bordered columns
 */

import * as m from 'mithril';
import RunModel from '../models/Run';
import Spinner from '../components/Spinner';

export class RunDetails implements m.Component {
    private isLoading: boolean;

    constructor(vnode) {
        this.isLoading = true;
    }

    oninit() {
        //RunModel.fetchById(vnode.attrs.runId).then(() => this.isLoading = false);
        RunModel.fetchById(1);
        console.log(RunModel.current)
        this.isLoading = false
    }

    view() {
        return (
            <div className="container-fluid">
                <Spinner isLoading={this.isLoading}>
                    {RunModel.current &&
                        <div className="col-md-10 mx-auto">
                            <div className="row">
                                <div className="col-md-4 border rounded border-dark">
                                    <h4>Run</h4>
                                    {Object.keys(RunModel.current).map((key) =>
                                        (<p key={RunModel.current[key]}>
                                            {key}: {RunModel.current[key]}
                                        </p>)
                                    )}
                                </div>
                                <div className="col-md-7 offset-md-1">
                                    <div className="row">
                                        <div className="col-md-5 border rounded border-dark">
                                            <h4>Detectors</h4>
                                            {
                                                //Fetch detectors from runs
                                            }
                                        </div>
                                        <div className="col-md-5 offset-md-2 border rounded border-dark">
                                            <h4>EPN Role Sessions</h4>
                                            {
                                                //Fetch epn role from runs
                                            }
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col-md-5 border rounded border-dark">
                                            <h4>FLP Roles</h4>
                                            {
                                                //Fetch flp roles from runs
                                            }
                                        </div>
                                        <div className="col-md-5 offset-md-2 border rounded border-dark">
                                            <h4>Run Quality history</h4>
                                            {
                                                //Fetch run quality history from runs
                                            }
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
