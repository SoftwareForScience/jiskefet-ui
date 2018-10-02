import * as m from 'mithril';
import RunModel from '../models/Run';
import Spinner from '../components/Spinner';
import Table from '../components/Table';

const columns = [
    'Run id',
    'Time 02 start',
    'Time trg start',
    'Time trg end',
    'Time 02 end',
    'Activity id',
    'Run type',
    'Run quality',
    'N detectors',
    'N flps',
    'N epns',
    'N timeframes',
    'N subtimeframes',
    'B read out',
    'B timeframe builder',
];

export class Runs implements m.Component {
    private isLoading: boolean;

    constructor() {
        this.isLoading = true;
    }

    oninit() {
        RunModel.fetch().then(() => this.isLoading = false);
    }

    view() {
        return (
            <div className="container-fluid">
                <Spinner isLoading={this.isLoading}>
                    <div className="row">
                        <div className="col-md-12">
                            <Table data={RunModel.list} columns={columns} />
                        </div>
                    </div>
                </Spinner>
            </div>
        );
    }
}
