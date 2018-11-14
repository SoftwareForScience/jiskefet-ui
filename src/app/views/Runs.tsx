/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import Spinner from '../components/Spinner';
import HttpErrorAlert from '../components/HttpErrorAlert';
import Table from '../components/Table';
import Filter from '../components/Filter';
import State from '../models/State';
import RunColumns from '../constants/RunColumns';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import Fetchable from '../interfaces/Fetchable';
import { Run } from '../interfaces/Run';

const inputFields = [
    {
        name: 'runNumber',
        type: 'number',
        event: 'onchange'
    },
    {
        name: 'timeO2Start',
        type: 'datetime-local',
        event: 'onblur'
    },
    {
        name: 'timeO2End',
        type: 'datetime-local',
        event: 'onblur'
    },
    {
        name: 'timeTrgStart',
        type: 'datetime-local',
        event: 'onblur'
    },
    {
        name: 'timeTrgEnd',
        type: 'datetime-local',
        event: 'onblur'
    },
];

export default class Runs extends MithrilTsxComponent<{}> implements Fetchable<Run> {
    fetch = (queryParam?: string) => {
        State.RunModel.fetch(queryParam);
    }

    oninit() {
        this.fetch();
    }

    view() {
        return (
            <div className="container-fluid">
                <Spinner isLoading={State.RunModel.isFetchingRuns}>
                    <HttpErrorAlert>
                        <div className="row">
                            <div className="col-md-3 mt-2">
                                <Filter
                                    inputFields={inputFields}
                                    fetch={this.fetch}
                                    route="runs"
                                />
                            </div>
                            <div className="col-md-9 mt-2">
                                <Table
                                    data={State.RunModel.list}
                                    columns={RunColumns}
                                    className="font-sm"
                                />
                            </div>
                        </div>
                    </HttpErrorAlert>
                </Spinner>
            </div>
        );
    }
}
