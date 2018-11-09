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
import Filter from '../components/Filter';
import SuccessMessage from '../components/SuccessMessage';
import HttpErrorAlert from '../components/HttpErrorAlert';
import State from '../models/State';
import LogColumns from '../constants/LogColumns';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import Fetchable from '../interfaces/Fetchable';
import { Log } from '../interfaces/Log';

const inputFields = [
    {
        name: 'logId',
        type: 'number',
        label: 'Log id',
        event: 'onchange'
    },
    {
        name: 'searchterm',
        type: 'text',
        label: 'Title',
        event: 'onchange'
    }
];

export default class Logs extends MithrilTsxComponent<{}> implements Fetchable<Log> {
    private columns: any[];

    constructor() {
        super();
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

    view() {
        return (
            <div className="container-fluid">
                <Spinner isLoading={State.LogModel.isFetchingLogs}>
                    <HttpErrorAlert>
                        <SuccessMessage />
                        {/* <div className="row">
                            <div className="col-md-12">
                                <button class="btn btn-light border mb-2 float-right" onclick={this.togglePreview}>
                                    {this.previewContent ? 'Hide content' : 'Preview content'}
                                </button>
                            </div>
                        </div> */}
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
