/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';

class Spinner implements m.Component {
    isLoading: boolean;

    constructor(vnode: any) {
        this.isLoading = vnode.attrs.isLoading;
    }

    view(vnode: any) {
        return (
            <div>
                {vnode.attrs.isLoading ?
                    <div className="row">
                        <div className="col-md-12">
                            <div className="loader text-center" />
                        </div>
                    </div>
                    : vnode.children
                }
            </div>
        );
    }
}

export default Spinner;
