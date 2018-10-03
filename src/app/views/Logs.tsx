import * as m from 'mithril';
import LogModel from '../models/Log';
import Spinner from '../components/Spinner';
import Table from '../components/Table';

const columns = [
    {
        header: 'Log id',
        accessor: 'logId'
    },
    {
        header: 'Title',
        accessor: 'title',
        cell: row => (
            <a href={`/logs/${row.logId}`} oncreate={m.route.link}>
                {row.title}
            </a>
        )
    },
    {
        header: 'Subtype',
        accessor: 'subtype',
        cell: row => (
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
        cell: row => (
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
        accessor: 'creationTime'
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

export class Logs implements m.Component {
    private isLoading: boolean;

    constructor() {
        this.isLoading = true;
    }

    oninit() {
        LogModel.fetch().then(() => this.isLoading = false);
    }

    view() {
        return (
            <div className="container-fluid">
                <Spinner isLoading={this.isLoading}>
                    <div className="row">
                        <div className="col-md-12">
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
