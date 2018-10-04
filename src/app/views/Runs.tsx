import * as m from 'mithril';
import RunModel, { Run } from '../models/Run';
import Spinner from '../components/Spinner';
import Table from '../components/Table';
import { format } from 'date-fns';

const columns = [
    {
        header: 'Run id',
        accessor: 'runNumber',
        cell: row => (
            <a href={`/runs/${row.runNumber}`} oncreate={m.route.link}>
                {row.runNumber}
            </a>
        )
    },
    {
        header: 'Time 02 start',
        accessor: 'timeO2Start',
        cell: (row: Run) => (row.timeO2Start ? format(row.timeO2Start, 'HH:MM:SS DD/MM/YYYY') : 'Unkown')
    },
    {
        header: 'Time 02 end',
        accessor: 'timeO2End',
        cell: (row: Run) => (row.timeO2End ? format(row.timeO2End, 'HH:MM:SS DD/MM/YYYY') : 'Unkown')
    },
    {
        header: 'Time trg start',
        accessor: 'timeTrgStart',
        cell: (row: Run) => (row.timeTrgStart ? format(row.timeTrgStart, 'HH:MM:SS DD/MM/YYYY') : 'Unkown')
    },
    {
        header: 'Time trg end',
        accessor: 'timeTrgEnd',
        cell: (row: Run) => (row.timeTrgEnd ? format(row.timeTrgEnd, 'HH:MM:SS DD/MM/YYYY') : 'Unkown')
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
        header: 'no. of detectors',
        accessor: 'nDetectors'
    },
    {
        header: 'no. of FLPs',
        accessor: 'nFlps'
    },
    {
        header: 'no. of EPNs',
        accessor: 'nEpns'
    },
    {
        header: 'no. of timeframes',
        accessor: 'nTimeframes'
    },
    {
        header: 'no. of sub-timeframes',
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
