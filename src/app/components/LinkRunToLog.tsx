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
import LinkRunToLogColumns from '../constants/LinkRunToLogColumns';

interface Attrs {
    /**
     * The log id of the log to be linked to a run.
     */
    logId: number;
}

type Vnode = m.Vnode<Attrs, LinkRunToLog>;

/**
 * Component enables linking runs to logs.
 */
export default class LinkRunToLog extends MithrilTsxComponent<Attrs> {
    oninit() {
        State.RunModel.fetch();
    }

     /*
     * Link a run to a log by calling a PATCH api call.
     * Fetch the updated log afterwards.
     */
    linkRunToLog = (runNumber: number, logId: number) => {
        State.LogModel.linkRunToLog(runNumber, logId).then(() =>
            State.LogModel.fetchOne(logId).then(() =>
                m.redraw()
            )
        );
    }

    view(vnode: Vnode) {
        return (
            <div>
                <Table
                    data={State.RunModel.list}
                    columns={LinkRunToLogColumns(vnode.attrs.logId, this.linkRunToLog)}
                    className="font-sm"
                />
            </div>
        );
    }
}
