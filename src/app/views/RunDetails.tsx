import * as m from 'mithril';
import RunModel from '../models/Run';
import Spinner from '../components/Spinner';
import Card from '../components/Card';

export class RunDetails implements m.Component {
    private isLoading: boolean;

    constructor() {
        this.isLoading = true;
    }

    oninit() {
        RunModel.fetchById(Number(m.route.param('id'))).then(() => this.isLoading = false);
    }

    view() {
        return (
            <div className="container-fluid">
                <Spinner isLoading={this.isLoading}>
                    {RunModel.current &&
                        <div className="col-md-10 mx-auto">
                            <div className="row">
                                <div className="col-md-4">
                                    <Card run={RunModel.current} title={'Run'} />
                                </div>
                                <div className="col-md-8">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Card run={'test'} title={'Detectors'} />
                                        </div>
                                        <div className="col-md-6">
                                            <Card run={'test'} title={'EPN Role Sessions'} />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Card run={'test'} title={'FLP Role Sessions'} />
                                        </div>
                                        <div className="col-md-6">
                                            <Card run={'test'} title={'Run Quality history'} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </Spinner>
            </div >
        );
    }
}
