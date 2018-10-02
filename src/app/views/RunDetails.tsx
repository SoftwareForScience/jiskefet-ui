/**
 * TODO:
 * - Fix timestamps from Run
 * - Discuss visualisations
 * - Use no mocup date
 */

import * as m from 'mithril';
import RunModel from '../models/Run';
import Spinner from '../components/Spinner';
import CardBody from '../components/CardBody';

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
                                <div className="col-md-4">
                                    <div className="card">
                                        <h4 className="card-header">Run</h4>
                                        <CardBody run={RunModel.current} />
                                    </div>
                                </div>
                                <div className="col-md-7 offset-md-1">
                                    <div className="row">
                                        <div className="col-md-5">
                                            <div className="card">
                                                <h4 className="card-header">Detectors</h4>
                                                <CardBody run={"test"} />
                                            </div>
                                        </div>
                                        <div className="col-md-5 offset-md-2">
                                            <div className="card">
                                                <h4 className="card-header">EPN Role Sessions</h4>
                                                <CardBody run={"test"} />
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col-md-5">
                                            <div className="card">
                                                <h4 className="card-header">EPN Role Sessions</h4>
                                                <CardBody run={"test"} />
                                            </div>
                                        </div>
                                        <div className="col-md-5 offset-md-2">
                                            <div className="card">
                                                <h4 className="card-header">Run Quality history</h4>
                                                <CardBody run={"test"} />
                                            </div>
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
