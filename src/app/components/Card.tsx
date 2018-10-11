/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';

export default class Card implements m.Component {
    data: any[];
    title: string;

    constructor(vnode: any) {
        this.data = vnode.attrs.data;
        this.title = vnode.attrs.title;
    }

    view() {
        return (
            <div className="card shadow-sm">
                <div class="card-header">
                    {this.title}
                </div>
                <div className="card-body">
                    <p className="card-text">
                        {Object.keys(this.data).map((key) =>
                            (<dl class="row mb-1" key={this.data[key]}>
                                <dt class="col-sm-6 text-muted">{key}:</dt>
                                <dd class="col-sm-6">{this.data[key]}</dd>
                            </dl>)
                        )}
                    </p>
                </div>
            </div>
        );
    }
}
