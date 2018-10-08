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

const filterParams = [
    {
        name: 'timeO2Start',
        type: 'datetime-local'
    },
    {
        name: 'timeO2End',
        type: 'datetime-local'
    },
    {
        name: 'timeTrgStart',
        type: 'datetime-local'
    },
    {
        name: 'timeTrgEnd',
        type: 'datetime-local'
    },
];

interface Filters {
    timeO2Start?: Date;
    timeO2End?: Date;
    timeTrgStart?: Date;
    timeTrgEnd?: Date;
}

export class Runs implements m.Component {
    private isLoading: boolean;
    private filters: Filters = {};

    constructor() {
        this.isLoading = true;
    }

    updateFilters = (key, value) => {
        value ? this.filters[key] = value : delete this.filters[key];
        return this.filters;
    }

    fetchRuns = (queryParam: string) => {
        console.log('fetching runs with searchParams ' + queryParam);
        // RunModel.fetchByParams(queryParam);
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
                            <Filter filterParams={filterParams} fetchEntity={this.fetchRuns} updateFilters={this.updateFilters}/>
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
