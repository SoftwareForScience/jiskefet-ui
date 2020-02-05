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
import CreateLog from '../organisms/CreateLog';

interface Attrs {
    runNumber?: number;
    logNumber?: number;
}

type Vnode = m.Vnode<Attrs, CreateLogPage>;

export default class CreateLogPage extends MithrilTsxComponent<Attrs> {
    view(vnode: Vnode) {
        const { runNumber, logNumber } = vnode.attrs;
        return (
            <Layout>
                <CreateLog runNumber={runNumber} logNumber={logNumber} />
            </Layout>
        );
    }
}
