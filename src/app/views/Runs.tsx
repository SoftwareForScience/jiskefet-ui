import * as m from 'mithril';
import RunModel from '../models/Run';
import Spinner from '../components/Spinner';
import Table from '../components/Table';

const columns = [
    {
        header: 'Run id',
        accessor: 'runNumber'
    },
    {
        header: 'Time 02 start',
        accessor: 'timeO2Start'
    },
    {
        header: 'Time trg start',
        accessor: 'timeTrgStart'
    },
    {
        header: 'Time trg end',
        accessor: 'timeTrgEnd'
    },
    {
        header: 'Time 02 end',
        accessor: 'timeO2End'
    },
    {
        header: 'Activity id',
        accessor: 'activityId'
    },
    {
        header: 'Run type',
        accessor: 'runType'
    },
    {
        header: 'Run quality',
        accessor: 'runQuality'
    },
    {
        header: 'N detectors',
        accessor: 'nDetectors'
    },
    {
        header: 'N flps',
        accessor: 'nFlps'
    },
    {
        header: 'N epns',
        accessor: 'nEpns'
    },
    {
        header: 'N timeframes',
        accessor: 'nTimeframes'
    },
    {
        header: 'N subtimeframes',
        accessor: 'nSubtimeframes'
    },
    {
        header: 'B read out',
        accessor: 'bytesReadOut'
    },
    {
        header: 'B timeframe builder',
        accessor: 'bytesTimeframeBuilder'
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
                            <Table
                                data={RunModel.list}
                                columns={columns}
                                class="font-sm"
                            />
                        </div>
                    </div>
                </Spinner>
            </div>
        );
    }
}
