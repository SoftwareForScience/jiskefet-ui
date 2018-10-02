import * as m from 'mithril';
import LogModel from '../models/Log';
import Spinner from '../components/Spinner';
import Table from '../components/Table';

const columns = [
    {
        header: 'Log id',
        accessor: 'log_id'
    },
    {
        header: 'Title',
        accessor: 'title',
        cell: row => (
            <a href={`/logs/${row.log_id}`} className="nav-link" oncreate={m.route.link}>
                {row.title}
            </a>
        )
    },
    {
        header: 'Subtype',
        accessor: 'subtype'
    },
    {
        header: 'Origin',
        accessor: 'origin'
    }, {
        header: 'Creation time',
        accessor: 'creation_time'
    },
    {
        header: 'Text',
        accessor: 'text'
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
