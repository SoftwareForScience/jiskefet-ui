import * as m from 'mithril';
import LogModel, { Log } from '../models/Log';
import Spinner from '../components/Spinner';
import Table from '../components/Table';
import { format } from 'date-fns';
import Filter from '../components/Filter';
import Fetchable from '../interfaces/Fetchable';

const columns = [
    {
        header: 'Log id',
        accessor: 'logId'
    },
    {
        header: 'Title',
        accessor: 'title',
        cell: (row: Log) => (
            <a href={`/logs/${row.logId}`} oncreate={m.route.link}>
                {row.title}
            </a>
        )
    },
    {
        header: 'Sub-type',
        accessor: 'subtype',
        cell: (row: Log) => (
            row.subtype === 'run' ?
                (
                    <div class="text-center">
                        <span class="badge badge-warning">{row.subtype}</span>
                    </div>
                )
                : row.subtype
        )
    },
    {
        header: 'Origin',
        accessor: 'origin',
        cell: (row: Log) => (
            row.origin === 'human' ?
                (
                    <div class="text-center">
                        <span class="badge badge-success">{row.origin}</span>
                    </div>
                )
                : row.origin
        )
    }, {
        header: 'Creation time',
        accessor: 'creationTime',
        cell: (row: Log) => (format(row.creationTime, 'HH:MM:SS DD/MM/YYYY'))
    },
    {
        header: 'Text',
        accessor: 'text',
        cell: row => (
            <div class="d-block text-truncate" style="max-width: 200px;">
                {row.text}
            </div>
        )
    },
];

const inputFields = [
    {
        name: 'title',
        type: 'text'
    },
];

export class Logs implements m.Component, Fetchable<Log> {
    private isLoading: boolean;

    constructor() {
        this.isLoading = true;
    }

    fetch = (queryParam: string) => {
        console.log('Fetching runs with searchParams ' + queryParam);
        // RunModel.fetchByParams(queryParam);
        return [];
    }

    oninit() {
        LogModel.fetch().then(() => this.isLoading = false);
    }

    view() {
        return (
            <div className="container-fluid">
                <Spinner isLoading={this.isLoading}>
                    <div className="row">
                        <div className="col-md-3">
                            <Filter
                                inputFields={inputFields}
                                fetch={this.fetch}
                                route="logs"
                            />
                        </div>
                        <div className="col-md-9">
                            <Table
                                data={LogModel.list}
                                columns={columns}
                            />
                        </div>
                    </div>
                </Spinner>
            </div>
        );
    }
}
