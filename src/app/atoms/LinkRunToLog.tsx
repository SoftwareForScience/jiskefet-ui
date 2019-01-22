/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import * as _ from 'lodash';
import LinkRunToLogColumns from '../constants/LinkRunToLogColumns';
import { fetchRuns } from '../redux/ducks/run/operations';
import { linkRunToLog, fetchLog } from '../redux/ducks/log/operations';
import { store } from '../redux/configureStore';
import { selectRuns } from '../redux/ducks/run/selectors';
import Table from '../molecules/Table';

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
        store.dispatch(fetchRuns());
    }

    /*
    * Link a run to a log by calling a PATCH api call.
    * Fetch the updated log afterwards.
    */
    linkRunToLog = (runNumber: number, logId: number) => {
        store.dispatch(linkRunToLog(logId, runNumber)).then(() =>
            store.dispatch(fetchLog(logId)).then(() =>
                m.redraw()
            )
        );
    }

    view(vnode: Vnode) {
        return (
            <div>
                <Table
                    data={selectRuns(store.getState())}
                    columns={LinkRunToLogColumns(vnode.attrs.logId, this.linkRunToLog)}
                    className="font-sm"
                />
            </div>
        );
    }
}
