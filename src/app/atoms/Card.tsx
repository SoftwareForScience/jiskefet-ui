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
    className?: string;
    headerTitle: string;
    headerContent?: JSX.Element;
    footerContent?: JSX.Element;
}

type Vnode = m.Vnode<Attrs, Card>;

export default class Card extends MithrilTsxComponent<Attrs> {
    view(vnode: Vnode) {
        const { className, headerTitle, headerContent, footerContent } = vnode.attrs;
        return (
            <div className={`card ${className ? className : ''}`}>
                <div class="card-header">
                    {headerContent ?
                        (
                            <div class="row">
                                <div class="col-md-6">
                                    <h3>{headerTitle}</h3>
                                </div>
                                <div class="col-md-6">
                                    {headerContent}
                                </div>
                            </div>
                        ) :
                        <h3>{headerTitle}</h3>}
                </div>
                <div className="card-body">
                    {vnode.children}
                </div>
                {footerContent && footerContent}
            </div>
        );
    }
}
