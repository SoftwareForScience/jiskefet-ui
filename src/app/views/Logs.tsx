/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import Spinner from '../components/Spinner';
import Table from '../components/Table';
import Fetchable from '../interfaces/Fetchable';
import QuillViewer from '../components/QuillViewer';
import Filter from '../components/Filter';
import SuccessMessage from '../components/SuccessMessage';
import HttpErrorAlert from '../components/HttpErrorAlert';
import { Log } from '../interfaces/Log';
import State from '../models/State';
import LogColumns from '../util/LogUtil';

const inputFields = [
    {
        name: 'logId',
        type: 'number',
        label: 'Log id'
    },
    {
        name: 'searchterm',
        type: 'text',
        label: 'Title'
    }
];

export default class Logs implements m.Component, Fetchable<Log> {
    private previewContent: boolean;
    private columns: any[];

    constructor() {
        this.previewContent = false;
        this.columns = LogColumns;
    }

    /**
     * Fetch logs with the query param given.
     */
    fetch = (queryParam: string = ''): void => {
        State.LogModel.fetch(queryParam);
    }

    oninit() {
        this.fetch();
    }

    /**
     * When previewContent is true, adds a column to this.columns
     * that shows a preview of the contents of a Log.
     */
    togglePreview = (): void => {
        this.previewContent = !this.previewContent;
        if (this.previewContent) {
            this.columns = [
                ...LogColumns,
                {
                    header: 'Preview of text',
                    accessor: 'text',
                    cell: row => (
                        <div class="d-block" style="max-width: 200px;">
                            <QuillViewer id={row.logId} content={row.text} plaintext={true} plaintextLimit={100} />
                        </div>
                    )
                }
            ];
        } else {
            this.columns = LogColumns;
        }
        m.redraw();
    }

    view() {
        return (
            <div className="container-fluid">
                <Spinner isLoading={State.LogModel.isFetchingLogs}>
                    <HttpErrorAlert>
                        <SuccessMessage />
                        <div className="row">
                            <div className="col-md-12">
                                <button class="btn btn-light border mb-2 float-right" onclick={this.togglePreview}>
                                    {this.previewContent ? 'Hide content' : 'Preview content'}
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 mt-2">
                                <Filter
                                    inputFields={inputFields}
                                    fetch={this.fetch}
                                    route="logs"
                                />
                            </div>
                            <div className="col-md-9 mt-2">
                                <Table
                                    data={State.LogModel.list}
                                    columns={this.columns}
                                />
                            </div>
                        </div>
                    </HttpErrorAlert>
                </Spinner>
            </div>
        );
    }
}
