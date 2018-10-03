import * as m from 'mithril';
import RunModel from '../models/Run';
import Spinner from '../components/Spinner';
import Table from '../components/Table';

const columns = [
    {
        header: 'Run id',
        accessor: 'run_number'
    },
    {
        header: 'Time 02 start',
        accessor: 'time_o2_start'
    },
    {
        header: 'Time trg start',
        accessor: 'time_trg_start'
    },
    {
        header: 'Time trg end',
        accessor: 'time_trg_end'
    },
    {
        header: 'Time 02 end',
        accessor: 'time_o2_end'
    },
    {
        header: 'Activity id',
        accessor: 'activity_id'
    },
    {
        header: 'Run type',
        accessor: 'run_type'
    },
    {
        header: 'Run quality',
        accessor: 'run_quality'
    },
    {
        header: 'N detectors',
        accessor: 'n_detectors'
    },
    {
        header: 'N flps',
        accessor: 'n_flps'
    },
    {
        header: 'N epns',
        accessor: 'n_epns'
    },
    {
        header: 'N timeframes',
        accessor: 'n_timeframes'
    },
    {
        header: 'N subtimeframes',
        accessor: 'n_subtimeframes'
    },
    {
        header: 'B read out',
        accessor: 'b_read_out'
    },
    {
        header: 'B timeframe builder',
        accessor: 'b_timeframe_builder'
    },
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
