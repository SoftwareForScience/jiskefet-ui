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
     * Optional header that contains element for the collapse
     * button. Example: <span class="fas fa-bars" />
     */
    icon?: JSX.Element;
    /**
     * String that contains the title of the collapseble item.
     */
    title?: string;
    /**
     * String that contains the id of the collapseble item.
     */
    id: string;
}

type Vnode = m.Vnode<Attrs, Collapse>;
type VnodeDOM = m.VnodeDOM<Attrs, Collapse>;

export default class Collapse extends MithrilTsxComponent<Attrs> {

    constructor(vnode: VnodeDOM) {
        super();
        State.AppState.showFilter[`id${vnode.attrs.id}`] = true;
    }

    changeCollapseState(event: Event) {
        if (State.AppState.showFilter[event.target.id]) {
            State.AppState.showFilter[event.target.id] = false;
            console.log(State.AppState.showFilter);
        } else {
            State.AppState.showFilter[event.target.id] = true;
            console.log(State.AppState.showFilter);
        }
    }

    view(vnode: Vnode) {
        const { icon, title, id } = vnode.attrs;
        return (
            <div>
                <div class="row">
                    <div class="col-sm-10">
                        <button
                            type="button"
                            id={`${id}`}
                            class="btn jf-hamburger-button button-background"
                            aria-expanded={State.AppState.showFilter[id] ? 'true' : 'false'}
                            data-fa-transform="grow-10"
                            onclick={this.changeCollapseState}
                        >
                            {icon}
                            &nbsp;{title}
                        </button>
                    </div>
                </div>
                <div class={State.AppState.showFilter[id] ? 'collapseIn' : ''} id={id}>
                    {vnode.children}
                </div>
            </div >
        );
    }
}
