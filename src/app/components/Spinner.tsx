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
    isLoading: boolean;
    component?: JSX.Element;
}

type Vnode = m.Vnode<Attrs, Spinner>;

export default class Spinner extends MithrilTsxComponent<Attrs> {

    spinner = () => {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="jf-loader text-center" />
                </div>
            </div>
        );
    }

    component = (component: JSX.Element) => {
        return component;
    }

    view(vnode: Vnode) {
        const { isLoading, component } = vnode.attrs;
        return (
            <div>
                {(isLoading && !component)
                    ? this.spinner()
                    : (isLoading && component)
                        ? this.component(component)
                        : vnode.children
                }
            </div>
        );
    }
}
