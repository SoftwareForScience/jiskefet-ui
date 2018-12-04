/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';

interface Attrs {
    data: object[];
    title: string;
}

type Vnode = m.Vnode<Attrs, Card>;

export default class Card extends MithrilTsxComponent<Attrs> {
    view(vnode: Vnode) {
        const { data, title } = vnode.attrs;
        return (
            <div className="card shadow-sm">
                <div class="card-header">
                    {title}
                </div>
                <div className="card-body">
                    <p className="card-text">
                        {Object.keys(data).map((key: string) =>
                            (<dl class="row mb-1">
                                <dt class="col-sm-6 text-muted">{key}:</dt>
                                {/* <dd class="col-sm-6">{data[key]}</dd> */}
                            </dl>)
                        )}
                    </p>
                </div>
            </div>
        );
    }
}
