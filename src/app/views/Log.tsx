import * as m from 'mithril';
import LogModel from '../models/Log';
import Spinner from '../components/Spinner';
import { format } from 'date-fns';

export class Log implements m.Component {
    private id: number;
    private isLoading: boolean;

    constructor(vnode: any) {
        this.id = vnode.attrs.id;
        this.isLoading = true;
        LogModel.fetchOne(this.id).then(() => this.isLoading = false);

    }

    view() {        
        return (
            <div className="container">
                <Spinner isLoading={this.isLoading}>
                    <div class="row">
                        <div class="col-md-6 mx-auto">
                            <div class="card shadow-sm bg-light">
                                <div class="card-header">
                                    Log
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">{LogModel.current.title}</h5>
                                    <dl class="row">
                                        <div class="col-sm-12 mt-2"><p>{LogModel.current.text}</p></div>

                                        <dt class="col-sm-6">Log id</dt>
                                        <dd class="col-sm-6">{LogModel.current.logId}</dd>

                                        <dt class="col-sm-6">Subtype:</dt>
                                        <dd class="col-sm-6">
                                            { LogModel.current.subtype === 'run' ?
                                            <span class="badge badge-warning">{LogModel.current.subtype}</span>
                                            : LogModel.current.subtype}
                                        </dd>

                                        <dt class="col-sm-6">Origin:</dt>
                                        <dd class="col-sm-6">
                                            {LogModel.current.origin === 'human' ?
                                                <span class="badge badge-success">{LogModel.current.origin}</span>
                                                : LogModel.current.origin}
                                        </dd>

                                        <dt class="col-sm-6">Creation time:</dt>
                                        <dd class="col-sm-6">{format(LogModel.current.creationTime, 'HH:mm:ss DD/MM/YYYY')}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </Spinner>
            </div>
        );
    }
}
