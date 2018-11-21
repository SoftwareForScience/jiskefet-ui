/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import State from '../models/State';
import SubsystemOverviewColumns from '../constants/SubsystemOverviewColumns';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import HttpErrorAlert from '../components/HttpErrorAlert';
import SuccessMessage from '../components/SuccessMessage';
import Table from '../components/Table';

export default class SubsystemsOverview extends MithrilTsxComponent<{}> {

    oninit() {
        State.SubsystemOverviewModel.fetch();
    }

    view() {
        return (
            <div>
                <HttpErrorAlert>
                    <SuccessMessage />
                    <div class="row">
                        <div class="col-md-9">
                            <Table
                                data={State.SubsystemOverviewModel.list}
                                columns={SubsystemOverviewColumns}
                            />
                        </div>
                    </div>
                </HttpErrorAlert>
            </div>
        );
    }
}
