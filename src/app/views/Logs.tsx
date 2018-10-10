import * as m from 'mithril';
import LogModel, { Log } from '../models/Log';
import Spinner from '../components/Spinner';
import Table from '../components/Table';
import { format } from 'date-fns';
import QuillViewer from '../components/QuillViewer';

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
    }
];

export default class Logs implements m.Component {
    private isLoading: boolean;
    private previewContent: boolean;
    private columns: any[];

    constructor() {
        this.isLoading = true;
        this.previewContent = false;
        this.columns = columns;
    }

    oninit() {
        LogModel.fetch().then(() => this.isLoading = false);
    }

    togglePreview = () => {
        this.previewContent = !this.previewContent;
        if (this.previewContent) {
            this.columns = [
                ...columns,
                {
                    header: 'Preview of text',
                    accessor: 'text',
                    cell: row => (
                        <div class="d-block" style="max-width: 200px;">
                            <QuillViewer id={row.logId} content={row.text} plaintext={true} />
                        </div>
                    )
                }
            ];
        } else {
            this.columns = columns;
        }
    }

    view(vnode: any) {
        return (
            <div className="container-fluid">
                <Spinner isLoading={this.isLoading}>
                    <div className="row">
                        <div className="col-md-12">
                            <button class="btn btn-light border mb-2 float-right" onclick={this.togglePreview}>
                                {this.previewContent ? 'Hide content' : 'Preview content'}
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Table
                                data={LogModel.list}
                                columns={this.columns}
                            />
                        </div>
                    </div>
                </Spinner>
            </div>
        );
    }
}
