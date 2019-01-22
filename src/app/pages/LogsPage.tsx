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
import Logs from '../organisms/Logs';

export default class LogsPage extends MithrilTsxComponent<{}> {
    view() {
        return (
            <Layout>
                <Logs />
            </Layout>
        );
    }
}
