/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import State from '../models/State';
import { Event } from '../interfaces/Event';

interface Attrs {
    /**
     * String that contains the id of the collapsable item.
     */
    id: string;
    /**
     * Optional header that contains element for the collapse
     * button. Example: <span class="fas fa-bars" />
     */
    icon?: JSX.Element;
    /**
     * Optional title for the collapsable item.
     */
    title?: string;
}

type Vnode = m.Vnode<Attrs, Collapse>;
type VnodeDOM = m.VnodeDOM<Attrs, Collapse>;

/**
 * Wraps children with a collapsable div, collapses when clicking on the header/title of the component.
 */
export default class Collapse extends MithrilTsxComponent<Attrs> {
    constructor(vnode: VnodeDOM) {
        super();
        State.AppState.isCollapsed[vnode.attrs.id] = true;
    }

    /**
     * Toggles the collapsed state of the component.
     * @param event
     */
    toggleCollapse(event: Event) {
        const id = event.target.id;
        State.AppState.isCollapsed[id] = !State.AppState.isCollapsed[id];
    }

    view(vnode: Vnode) {
        const { icon, title, id } = vnode.attrs;
        return (
            <div>
                <div class="row">
                    <div class="col-md-12">
                        <div
                            id={`${id}`}
                            class="jf-collapse-toggle"
                            aria-expanded={State.AppState.isCollapsed[id] ? 'true' : 'false'}
                            data-fa-transform="grow-10"
                            onclick={this.toggleCollapse}
                        >
                            {icon}
                            &nbsp;{title}
                        </div>
                        <div class={State.AppState.isCollapsed[id] ? '' : 'jf-collapse-in'} id={id}>
                            {vnode.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
