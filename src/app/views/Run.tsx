import * as m from 'mithril';
import RunModel from '../models/Run';
import Spinner from '../components/Spinner';
import Card from '../components/Card';

export class Run implements m.Component {
    private isLoading: boolean;
    private id: number;

    constructor(vnode: any) {
        this.isLoading = true;
        this.id = vnode.attrs.id;
    }

    oninit() {
        RunModel.fetchById(this.id).then(() => this.isLoading = false);
    }

    view() {
        return (
            <div className="container-fluid">
                <Spinner isLoading={this.isLoading}>
                    {RunModel.current &&
                        <div className="col-md-12 mx-auto">
                            <div className="row">
                                <div className="col-md-4">
                                    <Card run={RunModel.current} title={'Run'} />
                                </div>
                                <div className="col-md-8">
                                    <div className="row">
                                        <div className="col-md-6">
                                        <Card run={{lorum: 'ipsum'}} title={'Detectors'} />
                                        </div>
                                        <div className="col-md-6">
                                        <Card run={{ lorum: 'ipsum' }} title={'EPN Role Sessions'} />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col-md-6">
                                        <Card run={{ lorum: 'ipsum' }} title={'FLP Role Sessions'} />
                                        </div>
                                        <div className="col-md-6">
                                        <Card run={{ lorum: 'ipsum' }} title={'Run Quality history'} />
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
