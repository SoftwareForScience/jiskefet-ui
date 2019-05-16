/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import NavBar from '../molecules/NavBar';
import Content from '../atoms/Content';
import { MithrilTsxComponent } from 'mithril-tsx-component';

type Vnode = m.Vnode<{}, Layout>;

export default class Layout extends MithrilTsxComponent<{}> {
    view(vnode: Vnode) {
        return (
            <div>
                <NavBar />
                <div class="jf-wrapper">
                    <Content>
                        {vnode.children}
                    </Content>
                </div>
            </div>
        );
    }
}
