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
import Profile from '../organisms/Profile';

interface Attrs {
    userId: number;
}

type Vnode = m.Vnode<Attrs, ProfilePage>;

export default class ProfilePage extends MithrilTsxComponent<Attrs> {
    view(vnode: Vnode) {
        const { userId } = vnode.attrs;
        return (
            <Layout>
                <Profile userId={userId} />
            </Layout>
        );
    }
}
