/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import Layout from '../organisms/Layout';
import Log from '../organisms/Log';

interface Attrs {
    logId: number;
}

type Vnode = m.Vnode<Attrs, LogPage>;

export default class LogPage extends MithrilTsxComponent<Attrs> {
    view(vnode: Vnode) {
        const { logId } = vnode.attrs;
        return (
            <Layout>
                <Log logId={logId} />
            </Layout>
        );
    }
}
