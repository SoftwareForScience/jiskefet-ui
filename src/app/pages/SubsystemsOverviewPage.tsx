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
import SubsystemsOverview from '../organisms/SubsystemsOverview';

export default class SubsystemsOverviewPage extends MithrilTsxComponent<{}> {
    view() {
        return (
            <Layout>
                <SubsystemsOverview />
            </Layout>
        );
    }
}
