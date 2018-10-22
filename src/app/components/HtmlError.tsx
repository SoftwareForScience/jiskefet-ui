/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';

export default class HtmlError implements m.Component {
    errorMessage: string;

    constructor(vnode: any) {
        this.errorMessage = vnode.attrs.errorMessage;
    }

    view(vnode: any) {
        return (
            <div>
            {this.errorMessage ?
                <div className="row">
                    <div className="col-md-12">
                        <div className="loader text-center">
                            {this.errorMessage}
                        </div>
                    </div>
                </div>
                : vnode.children
            }
        </div>
        );
    }
}
