/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import { IEvent } from '../interfaces/Event';
import { store } from '../redux/configureStore';
import { toggleCollapse, addCollapse } from '../redux/ducks/ui/actions';
import { selectCollapsableItem } from '../redux/ducks/ui/selectors';

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
    /**
     * Whether the component is initially collapsed.
     */
    isInitiallyCollapsed?: boolean;
    style?: object;
}

type Vnode = m.Vnode<Attrs, Collapse>;
type VnodeDOM = m.VnodeDOM<Attrs, Collapse>;

/**
 * Wraps children with a collapsable div, collapses when clicking on the header/title of the component.
 */
export default class Collapse extends MithrilTsxComponent<Attrs> {
    constructor(vnode: VnodeDOM) {
        super();
        store.dispatch(addCollapse(vnode.attrs.id, vnode.attrs.isInitiallyCollapsed || false));
    }

    /**
     * Toggles the collapsed state of the component.
     * @param event
     */
    toggleCollapse(event: IEvent) {
        const id = event.target.id;
        store.dispatch(toggleCollapse(id));
    }

    view(vnode: Vnode) {
        const { icon, title, id, style } = vnode.attrs;
        const collapsableItem = selectCollapsableItem(store.getState(), id);
        return (
            <div>
                <div class="row">
                    <div class="col-md-12">
                        <div
                            id={`${id}`}
                            class="jf-collapse-toggle"
                            aria-expanded={collapsableItem && collapsableItem.isCollapsed ? 'false' : 'true'}
                            data-fa-transform="grow-10"
                            onclick={this.toggleCollapse}
                            style={style}
                        >
                            {icon}
                            {title}
                        </div>
                        <div class={collapsableItem && collapsableItem.isCollapsed ? 'jf-collapse-in' : ''} id={id}>
                            {vnode.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
