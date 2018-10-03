import * as m from 'mithril';
import RunModel from '../models/Run';
import Spinner from '../components/Spinner';
import Table from '../components/Table';
import Filter from '../components/Filter';

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

const filters = [
    {
        name: 'Time 02 start',
        type: 'datetime-local'
    },
    {
        name: 'Time 02 end',
        type: 'datetime-local'
    },
    {
        name: 'Time trg start',
        type: 'datetime-local'
    },
    {
        name: 'Time trg end',
        type: 'datetime-local'
    },
];

export class Runs implements m.Component {
    private isLoading: boolean;

    constructor() {
        this.isLoading = true;
    }

    fetchRuns = (queryParam: string) => {
        RunModel.fetchByParams(queryParam);
    }

    oninit() {
        RunModel.fetch().then(() => this.isLoading = false);
    }

    view() {
        return (
            <div className="container-fluid">
                <Spinner isLoading={this.isLoading}>
                    <div className="row">
                        <div className="col-md-3">
                            <Filter filters={filters} fetchEntity={this.fetchRuns}/>
                        </div>
                        <div className="col-md-9">
                            <Table data={RunModel.list} columns={columns} />
                        </div>
                    </div>
                </Spinner>
            </div>
        );
    }
}
