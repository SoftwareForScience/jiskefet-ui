/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';

export default class Layout implements m.Component {
    view(vnode: any) {
        return (
            <div>

                <NavBar />
                <div id="wrapper" class="">
                        <SideBar />
                        <div id="page-content-wrapper">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-12 col-md-12 py-3">
                                        <main>
                                            {vnode.children}
                                        </main>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}
