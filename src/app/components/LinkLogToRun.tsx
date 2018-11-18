/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import Table from './Table';
import State from '../models/State';
import * as _ from 'lodash';
import LinkLogToRunColumns from '../constants/LinkLogToRunColumns';

interface Attrs {
    /**
     * The run number of the run to be linked to a log.
     */
    runNumber: number;
}

type Vnode = m.Vnode<Attrs, LinkLogToRun>;

/**
 * Component enables linking logs to runs.
 */
export default class LinkLogToRun extends MithrilTsxComponent<Attrs> {
    oninit() {
        State.LogModel.fetch();
    }

    /**
     * Link a log to a run by calling a PATCH api call.
     * Fetch the updated run afterwards.
     */
    linkLogToRun = (logId: number, runNumber: number) => {
        State.RunModel.linkLogToRun(logId, runNumber).then(() =>
            State.RunModel.fetchById(runNumber).then(() =>
                m.redraw()
            )
        );
    }

    view(vnode: Vnode) {
        return (
            <div>
                <Table
                    data={State.LogModel.list}
                    columns={LinkLogToRunColumns(vnode.attrs.runNumber, this.linkLogToRun)}
                />
            </div>
        );
    }
}
