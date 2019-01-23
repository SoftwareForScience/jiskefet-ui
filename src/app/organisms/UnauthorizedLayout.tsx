/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import NavBar from '../molecules/NavBar';
import { MithrilTsxComponent } from 'mithril-tsx-component';

type Vnode = m.Vnode<{}, UnauthorizedLayout>;

export default class UnauthorizedLayout extends MithrilTsxComponent<{}> {
    view(vnode: Vnode) {
        return (
            <div>
                <NavBar />
                <div class="jf-wrapper">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-12 px-0 text-center">
                                {vnode.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
